using BookTracker.Models.Options;
using BookTracker.Web.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace BookTracker.Web.Test
{
    public class KeepaUnitTest
    {
        //[Fact]
        public async Task Test1()
        {
            var logMock = new Mock<ILogger<KeepaService>>();
            var logger = logMock.Object;

            var opts = new OptionsWrapper<KeepaOptions>(new KeepaOptions()
            {
                BaseUri = "https://api.keepa.com/"
            });

            var svc = new KeepaService(opts, logger);
            var book = await svc.GetBook(Models.Keepa.KeepaDomain.US, Constants.BOOK_ISBN);
            Assert.NotNull(book);
        }
    }
}
