using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.Keepa
{
    public class Stats
    {
        public int[] Current { get; set; }

        public int[] Avg { get; set; }

        public int[] Avg30 { get; set; }

        public int[] Avg90 { get; set; }

        public int[][] Min { get; set; }

        public int[][] MinInInterval { get; set; }

        public int[][] Max { get; set; }

        public int[][] MaxInInterval { get; set; }

        public int[] OutOfStockPercentageInInterval { get; set; }
    }
}
