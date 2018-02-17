using BookTracker.Models.System;
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

        internal static int WeigthParts(decimal weigth, decimal grams)
        {
            return (int)Math.Ceiling(weigth / grams);
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
            else if (bookWeigthKg < 2m)
            {
                return 16.15m;
            }
            else if (bookWeigthKg < 5m)
            {
                return 19.20m;
            }
            return 19.20m * (bookWeigthKg - 1) * 2.80m;
        }

        internal static decimal CalculateMXNetPayout(decimal usedPrice, decimal price, decimal bookWeigthGrams, decimal currencyRate)
        {
            decimal bookWeigthPrice = GetBookWeigthPriceMX(bookWeigthGrams / 1000);
            decimal result = ((usedPrice) - (price * 0.1293m) - 17.85m - (bookWeigthPrice)) * currencyRate;

            return decimal.Round(result, 2, MidpointRounding.ToEven);
        }

        internal static decimal CalculateINNetPayout(decimal usedPrice, decimal price, decimal bookWeigthGrams, decimal currencyRate)
        {
            int bookParts500Grams = WeigthParts(bookWeigthGrams, 500m);
            bookParts500Grams = bookParts500Grams == 1 ? 0 : bookParts500Grams - 1;

            decimal result = ((usedPrice + 6.49m) + 1m - (price * 0.15m) - 0.95m - (4m + (0.4m * bookParts500Grams))) * currencyRate;

            return decimal.Round(result, 2, MidpointRounding.ToEven);
        }

        internal static decimal CalculateNetPayout(Formulas formulas, decimal usedPrice, decimal price, decimal bookWeigthGrams, decimal currencyRate)
        {
            //decimal val = ((usedPrice + 3.99m) - (price * 0.15m) - 1.8m - 3.19m) * currencyRate;
            //return decimal.Round(val, 2, MidpointRounding.ToEven);
            int bookParts500Grams = WeigthParts(bookWeigthGrams, 500m);

            var exp = new NCalc.Expression(formulas.USNetPayout);
            exp.Parameters["PRICE"] = Convert.ToDouble(price);
            exp.Parameters["USED"] = Convert.ToDouble(usedPrice);
            exp.Parameters["WEIGTH"] = Convert.ToDouble(bookWeigthGrams);
            exp.Parameters["CURRENCY_RATE"] = Convert.ToDouble(currencyRate);

            exp.Parameters["WEIGTH_PARTS_500_GRAMS"] = Convert.ToDouble(bookParts500Grams);

            decimal val = Convert.ToDecimal((double)exp.Evaluate());
            return decimal.Round(val, 2, MidpointRounding.ToEven);
        }

        internal static decimal CalculateCANetPayout(Formulas formulas, decimal usedPrice, decimal price, decimal bookWeigthGrams, decimal currencyRate)
        {
            int bookParts500Grams = WeigthParts(bookWeigthGrams, 500m);
            //bookParts500Grams = bookParts500Grams == 1 ? 0 : bookParts500Grams - 1;

            //decimal val = ((usedPrice + 6.49m) - 1m - (price * 0.15m) - 0.95m + 4m + (0.4m * bookParts500Grams)) * currencyRate;

            //return decimal.Round(val, 2, MidpointRounding.ToEven);

            var exp = new NCalc.Expression(formulas.CANetPayout);
            exp.Parameters["PRICE"] = Convert.ToDouble(price);
            exp.Parameters["USED"] = Convert.ToDouble(usedPrice);
            exp.Parameters["WEIGTH"] = Convert.ToDouble(bookWeigthGrams);
            exp.Parameters["CURRENCY_RATE"] = Convert.ToDouble(currencyRate);

            exp.Parameters["WEIGTH_PARTS_500_GRAMS"] = Convert.ToDouble(bookParts500Grams);

            decimal val = Convert.ToDecimal((double)exp.Evaluate());
            return decimal.Round(val, 2, MidpointRounding.ToEven);
        }
    }
}
