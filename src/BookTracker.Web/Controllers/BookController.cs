using BookTracker.Models;
using BookTracker.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace BookTracker.Web.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IBookAppService _bookService;
        private readonly ILogger<BookController> _logger;

        public BookController(IBookAppService bookService, ILogger<BookController> logger)
        {
            _bookService = bookService;
            _logger = logger;
        }

        

        [HttpGet("{isbn}", Name = "GetByIsbn")]
        public Task<Book> GetByIsbn(string isbn, CancellationToken cancellationToken)
        {
            return _bookService.GetBook(isbn);
        }
    }
}
