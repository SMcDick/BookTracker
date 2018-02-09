using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.System
{
    public class SystemConfig : ILastModified
    {
        public int Id { get; set; }

        public bool Current { get; set; }

        public string KeepaApiKey { get; set; }

        public DateTime LastModified { get; set; }
    }
}
