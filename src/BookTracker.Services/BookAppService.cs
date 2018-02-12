using BookTracker.Models;
using BookTracker.Models.BookScouter;
using BookTracker.Models.Keepa;
using BookTracker.Models.Options;
using BookTracker.Models.System;
using BookTracker.Services.ExternalServices;
using BookTracker.Services.Helpers;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BookTracker.Services
{
    public class BookAppService : IBookAppService
    {
        private readonly IKeepaService _keepaService;
        private readonly IBookScouterService _bookScouterService;
        private readonly KeepaOptions _keepaOptions;
        private readonly SystemOptions _sysOptions;

        private readonly KeepaDomain[] _avaiableDomains = new KeepaDomain[] {
            KeepaDomain.US,
            KeepaDomain.CA,
            KeepaDomain.MX,
            KeepaDomain.IN };

        public BookAppService(IKeepaService keepaService, IBookScouterService bookScouterService, IOptions<KeepaOptions> keepaOptions, IOptionsSnapshot<SystemOptions> sysOptions)
        {
            _keepaService = keepaService;
            _bookScouterService = bookScouterService;
            _keepaOptions = keepaOptions.Value;
            _sysOptions = sysOptions.Value;
        }

        public async Task<Book> GetBook(string isbn)
        {
            if (string.IsNullOrEmpty(isbn))
                throw new ArgumentNullException(nameof(isbn));

            Book book = new Book();
            book.ISBN = isbn;
            book.VerboseData = new List<VerboseData>();

            //us ca mx in jp
            //box, title, image, isbn, sales rank, net payout, offer, ca sales rank, ca net payout
            //1 - us
            //2 - bookscouter
            //3 - ca
            //4 - in
            //5 - mx

            //US
            var usBook = await _keepaService.GetBook(KeepaDomain.US, isbn);
            if (usBook.Products.Length > 0)
            {
                var kBook = usBook.Products[0];

                decimal used = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_USED_INDEX].GetLast());
                decimal price = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_PRICE_INDEX].GetLast());
                decimal @new = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_NEW_INDEX].GetLast());
                int salesRank = kBook.CSV[Constants.CSV_SALES_RANK_INDEX].GetLast();
                decimal currency = _sysOptions.Box1.CurrencyRate;

                book.Title = kBook.Title;
                book.Image = ParseBookImageName(kBook.ImagesCSV);

                book.USSalesRank = salesRank;
                book.USNetPayout = BookDomain.CalculateNetPayout(used, price, kBook.PackageWeight, currency);

                book.VerboseData.Add(new VerboseData(used, price, @new, kBook.PackageWeight, KeepaDomain.US.ToString(), currency));
            }

            //CA
            var caBook = await _keepaService.GetBook(KeepaDomain.CA, isbn);
            if (caBook.Products.Length > 0)
            {
                var kBook = caBook.Products[0];

                decimal used = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_USED_INDEX].GetLast());
                decimal price = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_PRICE_INDEX].GetLast());
                decimal @new = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_NEW_INDEX].GetLast());
                int salesRank = kBook.CSV[Constants.CSV_SALES_RANK_INDEX].GetLast();
                decimal currency = _sysOptions.Box4.CurrencyRate;

                book.CANetPayout = BookDomain.CalculateCANetPayout(used, price, kBook.PackageWeight, currency);
                book.CASalesRank = salesRank;

                book.VerboseData.Add(new VerboseData(used, price, @new, kBook.PackageWeight, KeepaDomain.CA.ToString(), currency));
            }

            //IN
            var inBook = await _keepaService.GetBook(KeepaDomain.IN, isbn);
            if (inBook.Products.Length > 0)
            {
                var kBook = inBook.Products[0];

                decimal used = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_USED_INDEX].GetLast());
                decimal price = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_PRICE_INDEX].GetLast());
                decimal @new = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_NEW_INDEX].GetLast());
                int salesRank = kBook.CSV[Constants.CSV_SALES_RANK_INDEX].GetLast();
                decimal currency = _sysOptions.Box5.CurrencyRate;

                book.INNetPayout = BookDomain.CalculateINNetPayout(used, price, kBook.PackageWeight, currency);
                book.INSalesRank = salesRank;

                book.VerboseData.Add(new VerboseData(used, price, @new, kBook.PackageWeight, KeepaDomain.IN.ToString(), currency));
            }

            //MX
            var mxBook = await _keepaService.GetBook(KeepaDomain.MX, isbn);
            if (mxBook.Products.Length > 0)
            {
                var kBook = mxBook.Products[0];

                decimal used = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_USED_INDEX].GetLast());
                decimal price = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_PRICE_INDEX].GetLast());
                decimal @new = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_NEW_INDEX].GetLast());
                int salesRank = kBook.CSV[Constants.CSV_SALES_RANK_INDEX].GetLast();
                decimal currency = _sysOptions.Box3.CurrencyRate;

                book.MXNetPayout = BookDomain.CalculateMXNetPayout(used, price, kBook.PackageWeight, currency);
                book.MXSalesRank = salesRank;

                book.VerboseData.Add(new VerboseData(used, price, @new, kBook.PackageWeight, KeepaDomain.MX.ToString(), currency));
            }

            //Book Scouter
            var bookScouter = await GetPriceFromScouter(isbn);
            if (bookScouter != null)
            {
                if (bookScouter.Prices != null && bookScouter.Prices.Length > 0)
                    book.Offer = bookScouter.Prices[0].RealPrice;

                if (bookScouter.Book != null)
                {
                    if (string.IsNullOrEmpty(book.Title))
                    {
                        book.Title = bookScouter.Book.Title;
                    }
                    if (string.IsNullOrEmpty(book.Image))
                    {
                        book.Image = ParserBookScouterImage(bookScouter.Book.Image);
                    }
                }
            }

            LoadBookRules(book, out bool meetARule, out string audio, out string color);

            book.MeetsARule = meetARule;
            book.Audio = string.IsNullOrEmpty(audio) ? audio : $"/sounds/{audio}";
            book.Color = color;

            book.DisplayRejected = _sysOptions.DisplayRejected;

            return book;
        }

        private void LoadBookRules(Book book, out bool meetARule, out string sound, out string color)
        {
            meetARule = false;
            sound = string.Empty;
            color = string.Empty;

            //us
            var box1 = _sysOptions.Box1;
            if (box1.Enabled)
            {
                foreach (Rule r in box1.Rules)
                {
                    if (r.MinimumSalesRank < book.USSalesRank && r.MaximumSalesRank > book.USSalesRank && r.MinimumNetPayout < book.USNetPayout)
                    {
                        meetARule = true;
                        sound = box1.SoundPath;
                        color = box1.Color;
                        return;
                    }
                }
            }

            //offer
            var box2 = _sysOptions.Box2;
            if (box2.Enabled)
            {
                if (box2.OfferGreaterThan < book.Offer)
                {
                    meetARule = true;
                    sound = box2.SoundPath;
                    color = box2.Color;
                    return;
                }
            }

            //MX
            var box3 = _sysOptions.Box3;
            if (box3.Enabled)
            {
                foreach (Rule r in box3.Rules)
                {
                    if (r.MinimumSalesRank < book.MXSalesRank && r.MaximumSalesRank > book.MXSalesRank && r.MinimumNetPayout < book.MXNetPayout)
                    {
                        meetARule = true;
                        sound = box3.SoundPath;
                        color = box3.Color;
                        return;
                    }
                }
            }

            //CA
            var box4 = _sysOptions.Box4;
            if (box4.Enabled)
            {
                foreach (Rule r in box4.Rules)
                {
                    if (r.MinimumSalesRank < book.CASalesRank && r.MaximumSalesRank > book.CASalesRank && r.MinimumNetPayout < book.CANetPayout)
                    {
                        meetARule = true;
                        sound = box4.SoundPath;
                        color = box4.Color;
                        return;
                    }
                }
            }

            //IN
            var box5 = _sysOptions.Box5;
            if (box5.Enabled)
            {
                foreach (Rule r in box5.Rules)
                {
                    if (r.MinimumSalesRank < book.INSalesRank && r.MaximumSalesRank > book.INSalesRank && r.MinimumNetPayout < book.INNetPayout)
                    {
                        meetARule = true;
                        sound = box5.SoundPath;
                        color = box5.Color;
                        return;
                    }
                }
            }
        }

        private async Task<BookScouted> GetPriceFromScouter(string isbn)
        {
            var svcBook = await _bookScouterService.GetBook(isbn);
            if (svcBook != null
                && svcBook.Books != null)
                return svcBook.Books;
            else
                return null;
        }

        private string ParseBookImageName(string data)
        {
            if (string.IsNullOrEmpty(data))
                return data;

            string imageName = Regex.Replace(data, @"([\w\d]+.\w{3})[,\w.]*", "$1", RegexOptions.Compiled);
            return string.Concat(_keepaOptions.AmazonImageUri, imageName);
        }

        private string ParserBookScouterImage(string data)
        {
            if (string.IsNullOrEmpty(data))
                return data;

            //https:\/\/images-na.ssl-images-amazon.com\/images\/I\/51SWYi92L3L._SL75_.jpg
            return data.Replace(@"\/", @"/");
        }
    }
}
