using BookTracker.Services.Helpers;
using BookTracker.Models;
using BookTracker.Models.Keepa;
using BookTracker.Services.ExternalServices;
using System;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using BookTracker.Models.Options;
using BookTracker.Models.BookScouter;

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

            var usBook = await _keepaService.GetBook(KeepaDomain.US, isbn);

            if (usBook.Products.Length > 0)
            {
                var kBook = usBook.Products[0];

                decimal used = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_USED_INDEX][kBook.CSV[Constants.CSV_USED_INDEX].Length - 1]);
                decimal price = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_PRICE_INDEX][kBook.CSV[Constants.CSV_PRICE_INDEX].Length - 1]);
                decimal @new = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_NEW_INDEX][kBook.CSV[Constants.CSV_NEW_INDEX].Length - 1]);
                decimal salesRank = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_SALES_RANK_INDEX][kBook.CSV[Constants.CSV_SALES_RANK_INDEX].Length - 1]);

                book.Title = kBook.Title;
                book.Image = ParseBookImageName(kBook.ImagesCSV);

                book.SalesRank = salesRank;
                book.NetPayout = BookDomain.CalculateNetPayout(used, price, kBook.PackageWeight);
            }

            var caBook = await _keepaService.GetBook(KeepaDomain.CA, isbn);
            if (caBook.Products.Length > 0)
            {
                var kBook = caBook.Products[0];

                decimal used = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_USED_INDEX][kBook.CSV[Constants.CSV_USED_INDEX].Length - 1]);
                decimal price = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_PRICE_INDEX][kBook.CSV[Constants.CSV_PRICE_INDEX].Length - 1]);
                decimal @new = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_NEW_INDEX][kBook.CSV[Constants.CSV_NEW_INDEX].Length - 1]);
                decimal salesRank = ConverterHelper.ToDecimalPrice(kBook.CSV[Constants.CSV_SALES_RANK_INDEX][kBook.CSV[Constants.CSV_SALES_RANK_INDEX].Length - 1]);

                book.CANetPayout = BookDomain.CalculateNetPayout(used, price, kBook.PackageWeight);
                book.CASalesRank = salesRank;
            }

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
