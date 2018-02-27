using BookTracker.Models;
using System.Threading;
using System.Threading.Tasks;

namespace BookTracker.Services
{
    public interface IBookAppService
    {
        Book GetBook(string isbn);

        Book GetBook(string isbn, CancellationToken cancellationToken);
    }
}
