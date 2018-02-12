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

        public decimal Offer { get; set; }

        public decimal USNetPayout { get; set; }

        public int USSalesRank { get; set; }

        public decimal CANetPayout { get; set; }

        public int CASalesRank { get; set; }

        public decimal INNetPayout { get; set; }

        public int INSalesRank { get; set; }

        public decimal MXNetPayout { get; set; }

        public int MXSalesRank { get; set; }

        public bool MeetsARule { get; set; }

        public string Color { get; set; }

        public string Audio { get; set; }

        public bool DisplayRejected { get; set; }

        public List<VerboseData> VerboseData { get; set; }
    }

    public class VerboseData
    {
        public decimal Used { get; set; }

        public decimal New { get; set; }

        public int Weigth { get; set; }

        public decimal Price { get; set; }

        public string Store { get; set; }

        public decimal Currency { get; set; }

        public VerboseData(decimal used, decimal @new, decimal price, int weigth, string store, decimal currency)
        {
            Used = used;
            New = @new;
            Price = price;
            Weigth = weigth;
            Store = store;
            Currency = currency;
        }
    }
}
