using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models
{
    public class Book
    {
        public string Title { get; set; }

        public string ISBN { get; set; }

        public string Image { get; set; }

        public decimal SalesRank { get; set; }

        public decimal NetPayout { get; set; }

        public decimal Offer { get; set; }

        public decimal CANetPayout { get; set; }

        public decimal CASalesRank { get; set; }

        public int MyProperty { get; set; }
    }
}
