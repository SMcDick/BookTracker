using BookTracker.Infra;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Web.Test
{
    public class MockCache : ICache
    {
        public T GetOrCreate<T>(string key, Func<ICacheEntry, T> factory)
        {
            return factory(default(ICacheEntry));
        }

        public Task<T> GetOrCreateAsync<T>(string key, Func<ICacheEntry, Task<T>> factory)
        {
            return factory(default(ICacheEntry));
        }

        public Task<T> GetOrCreateAsync<T>(string key, string secondKey, Func<ICacheEntry, Task<T>> factory)
        {
            return Task.FromResult(default(T));
        }

        public void Remove(string key)
        {

        }

        public void Set<T>(string key, T entity)
        {

        }

        public void Set<T>(string key, T entity, TimeSpan absoluteExpirationRelativeToNow)
        {

        }

        public void Set<T>(string key, T entity, DateTimeOffset absoluteExpiration)
        {
        }

        public bool TryGetValue<T>(string key, out T entity)
        {
            entity = default(T);
            return false;
        }
    }
}
