using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Services
{
    internal static class Constants
    {
        internal const decimal NET_PAYOUT_POUND_DIFF = 1m;

        internal const decimal NETPAYOUT_CONST1 = 0.15m;
        internal const decimal NETPAYOUT_CONST2 = 1.8m;

        internal const decimal CA_NETPAYOUT_CONST = 1.0m;
        internal const decimal CA_NETPAYOUT_CONST_2 = 0.95m;
        internal const decimal CA_NETPAYOUT_PRICE_PERCENT = 0.15m;
        internal const decimal CA_NETPAYOUT_PRICE_1_POUND = 4.0m;
        internal const decimal CA_NETPAYOUT_PRICE_ADDITIONAL_500_GRAMS = 0.40m;

        internal const int CSV_PRICE_INDEX = 0;
        internal const int CSV_NEW_INDEX = 1;
        internal const int CSV_USED_INDEX = 2;
        internal const int CSV_SALES_RANK_INDEX = 3;

        internal const decimal PRICE_DOTPRODUCT = 0.01m;
    }
}
