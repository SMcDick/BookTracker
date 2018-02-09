using BookTracker.Models.BookScouter;
using System.Threading.Tasks;

namespace BookTracker.Services.ExternalServices
{
    public interface IBookScouterService
    {
        Task<BookScouterResponse> GetBook(string isbn);
    }
}
