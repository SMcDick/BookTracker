using BookTracker.Models;
using BookTracker.Models.Keepa;
using BookTracker.Services.ExternalServices;
using System;
using System.Threading.Tasks;

namespace BookTracker.Services
{
    public class BookAppService : IBookAppService
    {
        private readonly IKeepaService _keepaService;
        private readonly IBookScouterService _bookScouterService;

        private readonly KeepaDomain[] _avaiableDomains = new KeepaDomain[] {
            KeepaDomain.US,
            KeepaDomain.CA,
            KeepaDomain.MX,
            KeepaDomain.IN };

        public BookAppService(IKeepaService keepaService, IBookScouterService bookScouterService)
        {
            _keepaService = keepaService;
            _bookScouterService = bookScouterService;
        }

        public async Task<Book> GetBook(string isbn)
        {
            if (string.IsNullOrEmpty(isbn))
                throw new ArgumentNullException(nameof(isbn));

            Book book = new Book();
            var usBook = await _keepaService.GetBook(KeepaDomain.US, isbn);

            if (usBook.Products.Length > 0)
            {
                var kBook = usBook.Products[0];

                decimal used = (decimal)kBook.CSV[Constants.CSV_USED_INDEX][kBook.CSV[Constants.CSV_USED_INDEX].Length - 1];
                decimal price = (decimal)kBook.CSV[Constants.CSV_PRICE_INDEX][kBook.CSV[Constants.CSV_PRICE_INDEX].Length - 1];
                decimal @new = (decimal)kBook.CSV[Constants.CSV_NEW_INDEX][kBook.CSV[Constants.CSV_NEW_INDEX].Length - 1];

                book.ISBN = isbn;
                book.Title = kBook.Title;
                book.Image = kBook.ImagesCSV;

                book.SalesRank = "-1";
                book.NetPayout = BookDomain.CalculateNetPayout(used, price, kBook.PackageWeight);
            }

            var caBook = await _keepaService.GetBook(KeepaDomain.CA, isbn);
            if (caBook.Products.Length > 0)
            {
                var kBook = caBook.Products[0];

                decimal used = (decimal)kBook.CSV[Constants.CSV_USED_INDEX][kBook.CSV[Constants.CSV_USED_INDEX].Length - 1];
                decimal price = (decimal)kBook.CSV[Constants.CSV_PRICE_INDEX][kBook.CSV[Constants.CSV_PRICE_INDEX].Length - 1];
                decimal @new = (decimal)kBook.CSV[Constants.CSV_NEW_INDEX][kBook.CSV[Constants.CSV_NEW_INDEX].Length - 1];

                book.CANetPayout = BookDomain.CalculateNetPayout(used, price, kBook.PackageWeight);
            }


            book.Offer = await GetPriceFromScouter(isbn);
            return book;
        }

        private async Task<decimal> GetPriceFromScouter(string isbn)
        {
            var svcBook = await _bookScouterService.GetBook(isbn);
            if (svcBook != null 
                && svcBook.Books != null 
                && svcBook.Books.Prices != null 
                && svcBook.Books.Prices.Length > 0)
            {
                return svcBook.Books.Prices[0].RealPrice;
            }
            else
            {
                return 0m;
            }
        }
    }
}
