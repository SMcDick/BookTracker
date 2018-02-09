using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.BookScouter
{
    public class BookScouterResponse
    {
        [JsonProperty(PropertyName = "data")]
        public BookScouted Books { get; set; }
    }
}
