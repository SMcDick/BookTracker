using BookTracker.Models;
using BookTracker.Models.Keepa;
using System.Threading;
using System.Threading.Tasks;

namespace BookTracker.Services.ExternalServices
{
    public interface IKeepaService
    {
        Task<KeepaSearchResult> GetBook(KeepaDomain domain, string isbn);

        Task<KeepaSearchResult> GetBook(KeepaDomain domain, string isbn, CancellationToken cancellationToken);
    }
}
