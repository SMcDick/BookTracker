using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.System
{
    public class Box
    {
        public bool Enabled { get; set; }

        public string Name { get; set; }

        public Rule[] Rules { get; set; }

        public string SoundPath { get; set; }

        public string Color { get; set; }
    }
}
