using BookTracker.Models;
using BookTracker.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BookTracker.Web.Controllers
{
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IBookAppService _bookService;

        public BookController(IBookAppService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet("[action]")]
        public string Status()
        {
            return "Ok";
        }

        [HttpGet("{isbn}", Name = "GetByIsbn")]
        public Task<Book> GetByIsbn(string isbn)
        {
            return _bookService.GetBook(isbn);
        }
    }
}
