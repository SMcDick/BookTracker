using BookTracker.Infra;
using BookTracker.Models;
using BookTracker.Models.Keepa;
using BookTracker.Models.Options;
using BookTracker.Services.ExternalServices;
using BookTracker.Services.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Threading;
#if TOKEN_OUT
using System.IO;
#endif
using System.Threading.Tasks;

namespace BookTracker.Web.Services
{
    public class KeepaService : IKeepaService
    {
        private readonly KeepaOptions _keepaOptions;
        private readonly ILogger<KeepaService> _logger;

        public KeepaService(IOptions<KeepaOptions> options, ILogger<KeepaService> logger)
        {
            _keepaOptions = options.Value;
            _logger = logger;
        }

        public Task<KeepaSearchResult> GetBook(KeepaDomain domain, string isbn)
        {
            return GetBook(domain, isbn, CancellationToken.None);
        }

        public async Task<KeepaSearchResult> GetBook(KeepaDomain domain, string isbn, CancellationToken cancellationToken)
        {
#if TOKEN_OUT
            string content = File.ReadAllText(@"C:\Users\ricardo\source\repos\BookTracker\Solution Items\Misc\sample.json");
            return JsonConvert.DeserializeObject<KeepaSearchResult>(content);
#endif

            var client = new RestClient(_keepaOptions.BaseUri);

            var request = new RestRequest("product?key={key}&domain={domain}&code={code}&update={update}");

            request.AddUrlSegment("key", _keepaOptions.ApiKey);
            request.AddUrlSegment("domain", (int)domain);
            request.AddUrlSegment("code", isbn);
            request.AddUrlSegment("update", 20);

            var response = await client.ExecuteGetTaskAsync(request, cancellationToken);
            if (!response.IsSuccessful)
            {
                _logger.LogError("Error trying to get book {isbn}", isbn);
                _logger.LogError("Http status code {StatusCode} content -> {Content}", response.StatusCode, response.Content);
            }
            _logger.LogInformation("Http status code {StatusCode} Uri {uri} content -> {Content}", response.StatusCode, response.ResponseUri.AbsoluteUri, response.Content);

            var data = JsonConvert.DeserializeObject<KeepaSearchResult>(response.Content);
            return data;
        }
    }
}
