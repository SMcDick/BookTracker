using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.BookScouter
{
    public class Vendor
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public string BuySell { get; set; }

        public decimal Rating { get; set; }

        public int RatingCount { get; set; }

        public string Slug { get; set; }
    }
}
