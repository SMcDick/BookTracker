using BookTracker.Services.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Services
{
    internal static class BookDomain
    {
        internal static decimal CalculateSalesRank()
        {
            return 0m;
        }



        internal static decimal CalculateNetPayout(decimal usedPrice, decimal price, decimal bookWeigthGrams)
        {
            decimal bookPounds = MeasureHelper.ConvertToPound(bookWeigthGrams);

            //case under 1 pound
            if (bookPounds <= Constants.NET_PAYOUT_POUND_DIFF)
            {
                return usedPrice - price * Constants.NETPAYOUT_CONST1 - Constants.NETPAYOUT_CONST2 - 3.19m;
            }
            else //case over 1 pound
            {
                return usedPrice - price * Constants.NETPAYOUT_CONST1 - Constants.NETPAYOUT_CONST2 - 4.71m + (bookPounds - 1m) * 0.38m;
            }
        }

        internal static decimal CalculateCANetPayout(decimal usedPrice, decimal price, decimal bookWeigthGrams)
        {
            decimal bookParts500Grams = Math.Floor(bookWeigthGrams / 500m);
            return usedPrice - Constants.CA_NETPAYOUT_CONST - price
                * Constants.CA_NETPAYOUT_PRICE_PERCENT - Constants.CA_NETPAYOUT_CONST_2
                - Constants.CA_NETPAYOUT_PRICE_1_POUND
                + Constants.CA_NETPAYOUT_PRICE_ADDITIONAL_500_GRAMS * bookParts500Grams;
        }
    }
}
