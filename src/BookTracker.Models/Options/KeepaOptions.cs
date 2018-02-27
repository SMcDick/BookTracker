namespace BookTracker.Models.Options
{
    public class KeepaOptions
    {
        public string ApiKey { get; set; }

        public string BaseUri { get; set; }

        public string AmazonImageUri { get; set; }

        public int CacheMinutes { get; set; }
    }
}
