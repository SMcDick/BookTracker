using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.System
{
    public class MinBox
    {
        public int Id { get; set; }

        public bool Enabled { get; set; }

        public string Sound { get; set; }

        public string Color { get; set; }

        public decimal OfferGreaterThan { get; set; }
    }
}
