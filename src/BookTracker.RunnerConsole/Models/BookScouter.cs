using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.RunnerConsole.Models
{
    public class BookScouter
    {
        public string Price { get; set; }

        public BookScouter(string price)
        {
            Price = price;
        }
    }
}
