using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.Keepa
{
    public class Offer
    {
        public int OfferId { get; set; }

        public int LastSeen { get; set; }

        public string SellerId { get; set; }

        public int[] OfferCSV { get; set; }

        public byte Condition { get; set; }

        public string ConditionComment { get; set; }

        public bool IsPrime { get; set; }

        public bool IsMAP { get; set; }

        public bool IsShippable { get; set; }

        public bool IsAddonItem { get; set; }

        public bool IsPreorder { get; set; }

        public bool IsWarehouseDeal { get; set; }

        public bool IsScam { get; set; }

        public bool IsAmazon { get; set; }

        public bool IsPrimeExcl { get; set; }

        public int[] StockCSV { get; set; }
    }
}
