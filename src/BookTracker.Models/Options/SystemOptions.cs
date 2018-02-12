using BookTracker.Models.System;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models.Options
{
    public class SystemOptions
    {
        /// <summary>
        /// US configuration box
        /// </summary>
        public Box Box1 { get; set; }

        /// <summary>
        /// Book scouter configuration box
        /// </summary>
        public MinBox Box2 { get; set; }

        /// <summary>
        /// MX configuration box
        /// </summary>
        public Box Box3 { get; set; }

        /// <summary>
        /// CA configuration box
        /// </summary>
        public Box Box4 { get; set; }

        /// <summary>
        /// IN Configuration box
        /// </summary>
        public Box Box5 { get; set; }

        public bool DisplayRejected { get; set; }
    }
}
