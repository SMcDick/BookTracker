using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.System
{
    public class Box
    {
        public int Id { get; set; }

        public bool Enabled { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int MinSalesRank { get; set; }

        public int MaxSalesRank { get; set; }

        public decimal MinNetPayout { get; set; }

        public int MinSalesRank1 { get; set; }

        public int MaxSalesRank1 { get; set; }

        public decimal MinNetPayout1 { get; set; }

        public int MinSalesRank2 { get; set; }

        public int MaxSalesRank2 { get; set; }

        public decimal MinNetPayout2 { get; set; }

        public int MinSalesRank3 { get; set; }

        public int MaxSalesRank3 { get; set; }

        public decimal MinNetPayout3 { get; set; }

        public string SoundPath { get; set; }

        public string Color { get; set; }
    }
}
