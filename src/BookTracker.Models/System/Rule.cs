using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.System
{
    public class Rule
    {
        public decimal MinimumSalesRank { get; set; }

        public decimal MaximumSalesRank { get; set; }

        public decimal MinimumNetPayout { get; set; }
    }
}
