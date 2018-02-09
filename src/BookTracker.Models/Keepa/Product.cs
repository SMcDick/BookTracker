using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.Keepa
{
    public class Product
    {
        [JsonProperty(PropertyName = "csv")]
        public int[][] CSV { get; set; }

        public long[] Categories { get; set; }

        public string ImagesCSV { get; set; }

        public string Manufacturer { get; set; }

        public string Title { get; set; }

        public string LastUpdate { get; set; }

        public string LastPriceChange { get; set; }

        public int RootCategory { get; set; }

        public int ProductType { get; set; }

        public string ParentAsin { get; set; }

        public string VariationCSV { get; set; }

        public string Asin { get; set; }

        public int DomainId { get; set; }

        public string Type { get; set; }

        public bool HasReviews { get; set; }

        public long Ean { get; set; }

        public long Upc { get; set; }

        public string Mpn { get; set; }

        public int TrackingSince { get; set; }

        public string Brand { get; set; }

        public string Label { get; set; }

        public object Department { get; set; }

        public string Publisher { get; set; }

        public string ProductGroup { get; set; }

        public string PartNumber { get; set; }

        public string Studio { get; set; }

        public string Genre { get; set; }

        public string Model { get; set; }

        public string Color { get; set; }

        public string Size { get; set; }

        public string edition { get; set; }

        public string Platform { get; set; }

        public string Format { get; set; }

        public int PackageHeight { get; set; }

        public int PackageLength { get; set; }

        public int PackageWidth { get; set; }

        public int PackageWeight { get; set; }

        public int PackageQuantity { get; set; }

        public bool IsAdultProduct { get; set; }

        public bool IsEligibleForTradeIn { get; set; }

        public bool IsEligibleForSuperSaverShipping { get; set; }

        public Offer[] Offers { get; set; }

        public string[] BuyBoxSellerIdHistory { get; set; }

        public bool IsRedirectASIN { get; set; }

        public bool IsSNS { get; set; }

        public string Author { get; set; }

        public string Binding { get; set; }

        public int NumberOfItems { get; set; }

        public int NumberOfPages { get; set; }

        public int PublicationDate { get; set; }

        public int ReleaseDate { get; set; }

        public string[][] Languages { get; set; }

        public int LastRatingUpdate { get; set; }

        public long[] EbayListingIds { get; set; }

        public int LastEbayUpdate { get; set; }

        public string[] EanList { get; set; }

        public string[] UpcList { get; set; }

        public int[] LiveOffersOrder { get; set; }

        public string[] FrequentlyBoughtTogether { get; set; }

        public Stats Stats { get; set; }

        public bool OffersSuccessful { get; set; }

        public int G { get; set; }
    }
}
