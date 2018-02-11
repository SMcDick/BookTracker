using BookTracker.Models.BookScouter;
using BookTracker.Models.Options;
using BookTracker.Services.ExternalServices;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;
using System.Threading.Tasks;

namespace BookTracker.Services.Http
{
    public class BookScouterService : IBookScouterService
    {
        private readonly BookScouterOptions _bookScouterOptions;
        private readonly ILogger<BookScouterService> _logger;

        public BookScouterService(IOptions<BookScouterOptions> options, ILogger<BookScouterService> logger)
        {
            _bookScouterOptions = options.Value;
            _logger = logger;
        }

        public async Task<BookScouterResponse> GetBook(string isbn)
        {
            var client = new RestClient(_bookScouterOptions.BaseUri);

            var request = new RestRequest("prices/sell/{term}");

            request.AddUrlSegment("term", isbn);

            var response = await client.ExecuteGetTaskAsync(request);

            if (!response.IsSuccessful)
            {
                _logger.LogError("Error trying to get book {isbn}", isbn);
                _logger.LogError("Http status code {StatusCode} content -> {Content}", response.StatusCode, response.Content);
            }
            _logger.LogInformation("Http status code {StatusCode} Uri {uri} content -> {Content}", response.StatusCode, response.ResponseUri.AbsoluteUri, response.Content);

            var data = JsonConvert.DeserializeObject<BookScouterResponse>(response.Content);
            return data;
        }
    }
}
