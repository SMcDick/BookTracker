using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.RunnerConsole.Models
{
    public class Book
    {
        public string Title { get; set; }

        public string ImageUri { get; set; }

        public string Isbn { get; set; }

        public string SalesRank { get; set; }

        public string NetPayout { get; set; }

        public string Offer { get; set; }

        public string CASalesRank { get; set; }

        public string CANetPayout { get; set; }

        public string UKSalesRank { get; set; }

        public string UKNetPayout { get; set; }
    }
}
