using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Services.Helpers
{
    internal static class MeasureHelper
    {
        private const decimal POUND_CONSTANT = 453.59237m;

        internal static decimal ConvertToPound(decimal grams)
        {
            return grams / POUND_CONSTANT;
        }
    }
}
