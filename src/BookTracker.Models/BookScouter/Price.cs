using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.BookScouter
{
    public class Price
    {
        [JsonProperty(PropertyName ="Price")]
        public decimal RealPrice { get; set; }

        public bool IsQueued { get; set; }

        public Vendor Vendor { get; set; }
    }
}
