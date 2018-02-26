using BookTracker.Models.BookScouter;
using System.Threading;
using System.Threading.Tasks;

namespace BookTracker.Services.ExternalServices
{
    public interface IBookScouterService
    {
        Task<BookScouterResponse> GetBook(string isbn);

        Task<BookScouterResponse> GetBook(string isbn, CancellationToken cancellationToken);
    }
}
