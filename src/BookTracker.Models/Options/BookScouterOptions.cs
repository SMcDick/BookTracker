using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.Options
{
    public class BookScouterOptions
    {
        public string BaseUri { get; set; }

        public int CacheMinutes { get; set; }
    }
}
