using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Services.Helpers
{
    internal static class ConverterHelper
    {
        internal static decimal ToDecimal(int data)
        {
            return (decimal)data;
        }
    }
}
