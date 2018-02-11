using BookTracker.Models;
using BookTracker.Models.BookScouter;
using BookTracker.Models.Keepa;
using BookTracker.Models.Options;
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

        private readonly KeepaDomain[] _avaiableDomains = new KeepaDomain[] {
            KeepaDomain.US,
            KeepaDomain.CA,
            KeepaDomain.MX,
            KeepaDomain.IN };

        public BookAppService(IKeepaService keepaService, IBookScouterService bookScouterService, IOptions<KeepaOptions> keepaOptions)
        {
            _keepaService = keepaService;
            _bookScouterService = bookScouterService;
            _keepaOptions = keepaOptions.Value;
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

                book.Title = kBook.Title;
                book.Image = ParseBookImageName(kBook.ImagesCSV);

                book.USSalesRank = salesRank;
                book.USNetPayout = BookDomain.CalculateNetPayout(used, price, kBook.PackageWeight);

                book.VerboseData.Add(new VerboseData(used, price, @new, kBook.PackageWeight, KeepaDomain.US.ToString()));
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

                book.CANetPayout = BookDomain.CalculateCANetPayout(used, price, kBook.PackageWeight);
                book.CASalesRank = salesRank;

                book.VerboseData.Add(new VerboseData(used, price, @new, kBook.PackageWeight, KeepaDomain.CA.ToString()));
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

                book.INNetPayout = BookDomain.CalculateNetPayout(used, price, kBook.PackageWeight);
                book.INSalesRank = salesRank;

                book.VerboseData.Add(new VerboseData(used, price, @new, kBook.PackageWeight, KeepaDomain.IN.ToString()));
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

                book.MXNetPayout = BookDomain.CalculateINNetPayout(used, price, kBook.PackageWeight);
                book.MXSalesRank = salesRank;

                book.VerboseData.Add(new VerboseData(used, price, @new, kBook.PackageWeight, KeepaDomain.MX.ToString()));
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

            return book;
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
