using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Infra
{
    public class MemoryCache : ICache
    {
        private readonly IMemoryCache _memoryCache;

        public MemoryCache(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public T GetOrCreate<T>(string key, Func<ICacheEntry, T> factory)
        {
            return _memoryCache.GetOrCreate(key, factory);
        }

        public Task<T> GetOrCreateAsync<T>(string key, Func<ICacheEntry, Task<T>> factory)
        {
            return _memoryCache.GetOrCreateAsync(key, factory);
        }

        public Task<T> GetOrCreateAsync<T>(string key, string secondKey, Func<ICacheEntry, Task<T>> factory)
        {
            return GetOrCreateAsync($"{key}{secondKey}", factory);
        }

        public void Remove(string key)
        {
            _memoryCache.Remove(key);
        }

        public void Set<T>(string key, T entity, TimeSpan absoluteExpirationRelativeToNow)
        {
            _memoryCache.Set(key, entity, absoluteExpirationRelativeToNow: absoluteExpirationRelativeToNow);
        }

        public void Set<T>(string key, T entity)
        {
            _memoryCache.Set(key, entity);
        }

        public void Set<T>(string key, T entity, DateTimeOffset absoluteExpiration)
        {
            _memoryCache.Set(key, entity, absoluteExpiration: absoluteExpiration);
        }

        public bool TryGetValue<T>(string key, out T entity)
        {
            return _memoryCache.TryGetValue(key, out entity);
        }
    }
}
