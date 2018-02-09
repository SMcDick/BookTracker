using BookTracker.Models;
using BookTracker.Models.Keepa;
using System.Threading.Tasks;

namespace BookTracker.Services.ExternalServices
{
    public interface IKeepaService
    {
        Task<KeepaSearchResult> GetBook(KeepaDomain domain, string isbn);
    }
}
