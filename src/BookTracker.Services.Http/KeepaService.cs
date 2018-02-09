﻿using BookTracker.Models;
using BookTracker.Models.Keepa;
using BookTracker.Models.Options;
using BookTracker.Services.ExternalServices;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;
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
        }

        public async Task<KeepaSearchResult> GetBook(KeepaDomain domain, string isbn)
        {
            var client = new RestClient(_keepaOptions.BaseUri);

            var request = new RestRequest("product?key={key}&domain={domain}&code={code}");

            request.AddUrlSegment("key", _keepaOptions.ApiKey);
            request.AddUrlSegment("domain", (int)domain);
            request.AddUrlSegment("code", isbn);

            var response = await client.ExecuteGetTaskAsync(request);

            if (!response.IsSuccessful)
            {
                _logger.LogInformation($"Error trying to get book isbn {isbn} domain {domain}");
                _logger.LogError($"Http status code {response.StatusCode} content -> {response.Content}");
            }

            var data = JsonConvert.DeserializeObject<KeepaSearchResult>(response.Content);
            return data;
        }
    }
}