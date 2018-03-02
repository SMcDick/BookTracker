using BookTracker.Infra;
using BookTracker.Models;
using BookTracker.Models.BookScouter;
using BookTracker.Models.Keepa;
using BookTracker.Models.Options;
using BookTracker.Models.System;
using BookTracker.Services.Domains;
using BookTracker.Services.ExternalServices;
using BookTracker.Services.Helpers;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace BookTracker.Services
{
    public class BookAppService : IBookAppService
    {
        private readonly IKeepaService _keepaService;
        private readonly IBookScouterService _bookScouterService;
        private readonly KeepaOptions _keepaOptions;
        private readonly BookScouterOptions _scouterOptions;
        private readonly SystemOptions _sysOptions;
        private readonly ICache _cache;
        private readonly TimeSpan _cacheMinutesKeepa;
        private readonly TimeSpan _cacheMinutesScouter;
        private readonly IBookDomain _bookDomain;

        public BookAppService(IKeepaService keepaService,
            IBookScouterService bookScouterService,
            IOptionsSnapshot<KeepaOptions> keepaOptions,
            IOptionsSnapshot<BookScouterOptions> scouterOptions,
            IOptionsSnapshot<SystemOptions> sysOptions,
            IBookDomain bookDomain,
            ICache cache)
        {
            _keepaService = keepaService;
            _bookScouterService = bookScouterService;
            _keepaOptions = keepaOptions.Value;
            _scouterOptions = scouterOptions.Value;
            _sysOptions = sysOptions.Value;
            _cache = cache;
            _bookDomain = bookDomain;

            _cacheMinutesKeepa = TimeSpan.FromMinutes(_keepaOptions.CacheMinutes);
            _cacheMinutesScouter = TimeSpan.FromMinutes(_scouterOptions.CacheMinutes);
        }

        public Book GetBook(string isbn)
        {
            return GetBook(isbn, CancellationToken.None);
        }

        internal Task<KeepaSearchResult> GetBookFromKeepaAsync(KeepaDomain domain, string isbn, CancellationToken cancellationToken)
        {
            //US
            var bookTask = _cache.GetOrCreateAsync(isbn, Constants.CACHE_KEY_KEEPA, (entry) =>
            {
                if (entry != null) { entry.AbsoluteExpirationRelativeToNow = _cacheMinutesKeepa; }
                return _keepaService.GetBook(domain, isbn, cancellationToken);
            });
            return bookTask;
        }

        internal Task<BookScouted> GetBookFromScouterAsync(string isbn, CancellationToken cancellationToken)
        {
            var bookScouterTask = _cache.GetOrCreateAsync(isbn, Constants.CACHE_KEY_SCOUTER, entry =>
            {
                if (entry != null) entry.AbsoluteExpirationRelativeToNow = _cacheMinutesScouter;
                return GetPriceFromScouter(isbn, cancellationToken);
            });
            return bookScouterTask;
        }

        internal void GetBookAttributes(Product product, out decimal used, out decimal price, out decimal @new, out int salesRank)
        {
            used = ConverterHelper.ToDecimalPrice(product.CSV[Constants.CSV_USED_INDEX].GetLast());
            price = ConverterHelper.ToDecimalPrice(product.CSV[Constants.CSV_PRICE_INDEX].GetLast());
            @new = ConverterHelper.ToDecimalPrice(product.CSV[Constants.CSV_NEW_INDEX].GetLast());
            salesRank = product.CSV[Constants.CSV_SALES_RANK_INDEX].GetLast();
            decimal currency = _sysOptions.Box1.CurrencyRate;
        }

        internal void GetBookScouterAttributes(BookScouted bookScouted, out decimal offer, out string title, out string image)
        {
            title = string.Empty;
            image = string.Empty;
            offer = 0m;

            if (bookScouted != null)
            {
                if (bookScouted.Prices != null && bookScouted.Prices.Length > 0)
                    offer = bookScouted.Prices[0].RealPrice;

                if (bookScouted.Book != null)
                {
                    title = bookScouted.Book.Title;
                    image = ParserBookScouterImage(bookScouted.Book.Image);
                }
            }
        }

        private void ParseKeepaResult(KeepaSearchResult keepaResult, string bookTitle, KeepaDomain domain, decimal currentyRate, out int salesRank, out decimal netPayout, out VerboseData verboseData)
        {
            ParseKeepaResult(keepaResult, bookTitle, domain, currentyRate, out string title, out string image, out salesRank, out netPayout, out verboseData);
        }

        private void ParseKeepaResult(KeepaSearchResult keepaResult, string bookTitle, KeepaDomain domain, decimal currentyRate, out string title, out string image, out int salesRank, out decimal netPayout, out VerboseData verboseData)
        {
            title = string.Empty;
            image = string.Empty;
            salesRank = 0;
            netPayout = 0;
            verboseData = default(VerboseData);

            var kBook = keepaResult.Products.FirstOrDefault(b => string.Compare(b.Title, bookTitle, true) == 0);
            if (kBook != null)
            {
                GetBookAttributes(kBook, out decimal used, out decimal price, out decimal @new, out salesRank);
                decimal currency = currentyRate;

                title = kBook.Title;
                image = ParseBookImageName(kBook.ImagesCSV);

                switch (domain)
                {
                    case KeepaDomain.US:
                        netPayout = _bookDomain.GetUSNetPayout(used, price, kBook.PackageWeight, currency);
                        break;
                    case KeepaDomain.CA:
                        netPayout = _bookDomain.GetCANetPayout(used, price, kBook.PackageWeight, currency);
                        break;
                }

                verboseData = new VerboseData(used, price, @new, kBook.PackageWeight, KeepaDomain.US.ToString(), currency);
            }
        }

        public Book GetBook(string isbn, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(isbn))
                throw new ArgumentNullException(nameof(isbn));

            Book book = new Book();
            book.ISBN = isbn;
            book.VerboseData = new List<VerboseData>();

            //US
            var usBookTask = GetBookFromKeepaAsync(KeepaDomain.US, isbn, cancellationToken);
            //CA
            var caBookTask = GetBookFromKeepaAsync(KeepaDomain.CA, isbn, cancellationToken);
            //IN
            var inBookTask = GetBookFromKeepaAsync(KeepaDomain.IN, isbn, cancellationToken);
            //MX
            var mxBookTask = GetBookFromKeepaAsync(KeepaDomain.MX, isbn, cancellationToken);
            //Book Scouter
            var bookScouterTask = GetBookFromScouterAsync(isbn, cancellationToken);

            Task.WaitAll(new Task[] { usBookTask, caBookTask, inBookTask, mxBookTask, bookScouterTask }, cancellationToken);

            var bookScouted = bookScouterTask.Result;
            if (bookScouted != null)
            {
                GetBookScouterAttributes(bookScouted, out decimal offer, out string title, out string image);
                if (string.IsNullOrEmpty(book.Title))
                    book.Title = title;

                if (string.IsNullOrEmpty(book.Image))
                    book.Image = image;
            }

            var usBook = usBookTask.Result;
            ParseKeepaResult(usBook, book.Title, KeepaDomain.US, _sysOptions.Box1.CurrencyRate, out int usSalesRank, out decimal usNetPayout, out VerboseData usVerboseData);

            book.USSalesRank = usSalesRank;
            book.USNetPayout = usNetPayout;
            book.VerboseData.Add(usVerboseData);

            var caBook = caBookTask.Result;
            ParseKeepaResult(caBook, book.Title, KeepaDomain.CA, _sysOptions.Box4.CurrencyRate, out int caSalesRank, out decimal caNetPayout, out VerboseData caVerboseData);
            book.CASalesRank = caSalesRank;
            book.CANetPayout = caNetPayout;
            book.VerboseData.Add(caVerboseData);

            var inBook = inBookTask.Result;
            ParseKeepaResult(caBook, book.Title, KeepaDomain.IN, _sysOptions.Box5.CurrencyRate, out int inSalesRank, out decimal inNetPayout, out VerboseData inVerboseData);
            book.INSalesRank = inSalesRank;
            book.INNetPayout = inNetPayout;
            book.VerboseData.Add(inVerboseData);

            var mxBook = mxBookTask.Result;
            ParseKeepaResult(caBook, book.Title, KeepaDomain.MX, _sysOptions.Box3.CurrencyRate, out int mxSalesRank, out decimal mxNetPayout, out VerboseData mxVerboseData);
            book.MXNetPayout = mxNetPayout;
            book.MXSalesRank = mxSalesRank;
            book.VerboseData.Add(mxVerboseData);

            LoadBookRules(book, out bool meetARule, out string audio, out string color);

            book.MeetsARule = meetARule;
            book.Audio = string.IsNullOrEmpty(audio) ? audio : $"/sounds/{audio}";
            book.Color = color;

            book.DisplayAsRejected = meetARule ? false : !_sysOptions.DisplayRejected;

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

        private async Task<BookScouted> GetPriceFromScouter(string isbn, CancellationToken cancellationToken)
        {
            var svcBook = await _bookScouterService.GetBook(isbn, cancellationToken);
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
