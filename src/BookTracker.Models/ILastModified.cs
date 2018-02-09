using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Models
{
    public interface ILastModified
    {
        DateTime LastModified { get; set; }
    }
}
