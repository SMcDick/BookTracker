using BookTracker.Models.Options;
using BookTracker.Services.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace BookTracker.Web.Test
{
    public class BookScouterUnitTest
    {
        //[Fact]
        public async Task Test1()
        {
            var logMock = new Mock<ILogger<BookScouterService>>();
            var logger = logMock.Object;

            var opts = new OptionsWrapper<BookScouterOptions>(new BookScouterOptions()
            {
                BaseUri = "https://api.bookscouter.com/v3/"
            });

            var svc = new BookScouterService(opts, logger);
            var book = await svc.GetBook(Constants.BOOK_ISBN);
            Assert.NotNull(book);
        }
    }
}
