using BookTracker.Infra;
using BookTracker.Models.BookScouter;
using BookTracker.Models.Keepa;
using BookTracker.Models.Options;
using BookTracker.Models.System;
using BookTracker.Services.ExternalServices;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace BookTracker.Services.Test
{
    public class BookAppServiceUnitTest
    {
        private IOptionsSnapshot<Formulas> GetFormulasMock()
        {
            var formulaOpts = new Mock<IOptionsSnapshot<Formulas>>();
            formulaOpts.SetupGet(c => c.Value).Returns(() =>
            {
                var _opts = new Formulas()
                {
                    USNetPayout = "([USED] + 3.99 - [PRICE] * 0.15 - 1.8 - 3.19) * [CURRENCY_RATE]",
                    CANetPayout = "([USED_PRICE] + 6.49 - 1 - [PRICE] - 0.15 - 0.95) * [CURRENCY_CONVERTER]",
                    INNetPayout = "([USED_PRICE] + 46 - [PRICE] * 0.15 - 40 - 15 - (50 - 27 * (WEIGTH_PARTS_500 - 1))) * [CURRENCY_CONVERTER]",
                    MXNetPayout = "([USED_PRICE] - (PRICE * 0.1293) - 17.85 - [WEIGHT_PRICE_MX]) * [CURRENCY_CONVERTER]",
                    Variables = new string[] { "USED_PRICE", "PRICE", "WEIGHT_PRICE_MX", "CURRENCY_RATE", "WEIGTH", "WEIGTH_PARTS_500_GRAMS" }
                };
                return _opts;
            });
            return formulaOpts.Object;
        }

        private IOptions<KeepaOptions> GetKeepOptionsMock()
        {
            var keepaOpts = new OptionsWrapper<KeepaOptions>(new KeepaOptions()
            {
                BaseUri = "https://api.keepa.com/",
                AmazonImageUri = "https://dumb.com/"
            });
            return keepaOpts;
        }

        public KeepaSearchResult GetKeepSearchResultMock()
        {
            string content = File.ReadAllText(@"C:\Users\ricardo\source\repos\BookTracker\Solution Items\Misc\sample.json");
            KeepaSearchResult keepaResult = JsonConvert.DeserializeObject<KeepaSearchResult>(content);
            return keepaResult;
        }

        //[Fact(DisplayName = "BookTest")]
        //public async Task BookTest()
        //{
        //    string isbn = "2343242";
        //    KeepaDomain domain = KeepaDomain.US;

        //    Task<KeepaSearchResult> tKeepaResult = Task.FromResult<KeepaSearchResult>(GetKeepSearchResultMock());

        //    Task<BookScouterResponse> tScouterResponse = Task.FromResult<BookScouterResponse>(null);

        //    var mockScouterSvc = new Mock<IBookScouterService>();
        //    mockScouterSvc.Setup(c => c.GetBook(isbn)).Returns(tScouterResponse);

        //    var mockKeepaSvc = new Mock<IKeepaService>(MockBehavior.Default);
        //    mockKeepaSvc.Setup(c => c.GetBook(domain, isbn)).Returns(tKeepaResult);

        //    var keepaOpts = GetKeepOptionsMock();

        //    var sysOpts = new Mock<IOptionsSnapshot<SystemOptions>>();
        //    sysOpts.SetupGet(c => c.Value).Returns(() =>
        //    {
        //        var _opts = new SystemOptions()
        //        {
        //            Box1 = new Models.System.Box()
        //            {
        //                Enabled = false,
        //                CurrencyRate = 1m
        //            },
        //            Box2 = new Models.System.MinBox
        //            {
        //                Enabled = false
        //            },
        //            Box3 = new Models.System.Box
        //            {
        //                Enabled = false,
        //                CurrencyRate = 1m
        //            },
        //            Box4 = new Models.System.Box
        //            {
        //                Enabled = false,
        //                CurrencyRate = 1m
        //            },
        //            Box5 = new Models.System.Box
        //            {
        //                Enabled = false,
        //                CurrencyRate = 1m
        //            },
        //            DisplayRejected = true
        //        };
        //        return _opts;
        //    });

        //    var formulaOpts = GetFormulasMock();

        //    var appService = new BookAppService(mockKeepaSvc.Object, mockScouterSvc.Object, keepaOpts, sysOpts.Object, formulaOpts, new EmptyCache());
        //    var b = await appService.GetBook(isbn);

        //    Assert.NotNull(b);
        //}
    }
}
