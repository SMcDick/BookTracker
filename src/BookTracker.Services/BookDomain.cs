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

        private static decimal GetBookWeigthPriceMX(decimal bookWeigthKg)
        {
            if (bookWeigthKg < 0.5m)
            {
              return 13.15m;
            }
            else if (bookWeigthKg < 1m)
            {
                return 14.15m;
            }
            else if(bookWeigthKg < 2m)
            {
                return 16.15m;
            }
            else if(bookWeigthKg < 5m)
            {
                return 19.20m;
            }
            return 19.20m * (bookWeigthKg - 1) * 2.80m;
        }

        internal static decimal CalculateMXNetPayout(decimal usedPrice, decimal price, decimal bookWeigthGrams)
        {
            decimal bookWeigthPrice = GetBookWeigthPriceMX(bookWeigthGrams * 1000);
            

            decimal f = usedPrice - (price - 0.1293m) - 17.85m - bookWeigthPrice;

            decimal result = f;
            return decimal.Round(result, 2, MidpointRounding.ToEven);
        }

        internal static decimal CalculateINNetPayout(decimal usedPrice, decimal price, decimal bookWeigthGrams)
        {
            decimal bookWeigthPrice = 50m;
            if(bookWeigthGrams > 500)
            {
                bookWeigthGrams += ((bookWeigthGrams - 500m) / 500m) * 27m;
            }

            decimal result = usedPrice - (price - 0.15m) - 40m - 15m - bookWeigthPrice;

            return decimal.Round(result, 2, MidpointRounding.ToEven);
        }

        internal static decimal CalculateNetPayout(decimal usedPrice, decimal price, decimal bookWeigthGrams)
        {
            decimal bookPounds = MeasureHelper.ConvertToPound(bookWeigthGrams);

            decimal result = 0m;
            //case under 1 pound
            if (bookPounds <= Constants.NET_PAYOUT_POUND_DIFF)
            {
                result = usedPrice - price * Constants.NETPAYOUT_CONST1 - Constants.NETPAYOUT_CONST2 - 3.19m;
            }
            else //case over 1 pound
            {
                result = usedPrice - price * Constants.NETPAYOUT_CONST1 - Constants.NETPAYOUT_CONST2 - 4.71m + (bookPounds - 1m) * 0.38m;
            }
            return decimal.Round(result, 2, MidpointRounding.ToEven);
        }

        internal static decimal CalculateCANetPayout(decimal usedPrice, decimal price, decimal bookWeigthGrams)
        {
            decimal bookParts500Grams = Math.Floor(bookWeigthGrams / 500m);
            decimal result = usedPrice - Constants.CA_NETPAYOUT_CONST - price
                * Constants.CA_NETPAYOUT_PRICE_PERCENT - Constants.CA_NETPAYOUT_CONST_2
                - Constants.CA_NETPAYOUT_PRICE_1_POUND
                + Constants.CA_NETPAYOUT_PRICE_ADDITIONAL_500_GRAMS * bookParts500Grams;

            return decimal.Round(result, 2, MidpointRounding.ToEven);
        }
    }
}
