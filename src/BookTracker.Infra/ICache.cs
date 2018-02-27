using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;

namespace BookTracker.Infra
{
    public interface ICache
    {
        bool TryGetValue<T>(string key, out T entity);

        void Set<T>(string key, T entity);

        void Set<T>(string key, T entity, TimeSpan absoluteExpirationRelativeToNow);

        void Set<T>(string key, T entity, DateTimeOffset absoluteExpiration);

        void Remove(string key);

        T GetOrCreate<T>(string key, Func<ICacheEntry, T> factory);

        Task<T> GetOrCreateAsync<T>(string key, Func<ICacheEntry, Task<T>> factory);

        Task<T> GetOrCreateAsync<T>(string key, string secondKey, Func<ICacheEntry, Task<T>> factory);
    }
}
