using BookTracker.Models;
using System.Threading.Tasks;

namespace BookTracker.Services
{
    public interface IBookAppService
    {
        Task<Book> GetBook(string isbn);
    }
}
