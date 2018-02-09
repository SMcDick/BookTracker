using Newtonsoft.Json;

namespace BookTracker.Models.Keepa
{
    public class KeepaSearchResult
    {
        public long Timestamp { get; set; }

        public string TokensLeft { get; set; }

        public string RefillIn { get; set; }

        public string RefillRate { get; set; }

        public string TokenFlowReduction { get; set; }

        public Product[] Products { get; set; }
    }
}
