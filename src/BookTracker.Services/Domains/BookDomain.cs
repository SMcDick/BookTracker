using BookTracker.Models.System;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Services.Domains
{
    public class BookDomain : IBookDomain
    {
        private readonly Formulas _formulas;

        public BookDomain(IOptionsSnapshot<Formulas> formulaOptions)
        {
            _formulas = formulaOptions.Value;
        }

        private static int WeigthParts(decimal weigth, decimal grams)
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

        private decimal CalculateNetPayout(string formula, decimal usedPrice, decimal price, decimal bookWeigthGrams, decimal currencyRate)
        {
            int bookParts500Grams = WeigthParts(bookWeigthGrams, 500m);
            decimal bookWeigthPriceMX = GetBookWeigthPriceMX(bookWeigthGrams / 1000);

            var exp = new NCalc.Expression(formula);
            exp.Parameters["PRICE"] = Convert.ToDouble(price);
            exp.Parameters["USED"] = Convert.ToDouble(usedPrice);
            exp.Parameters["WEIGTH"] = Convert.ToDouble(bookWeigthGrams);
            exp.Parameters["CURRENCY_RATE"] = Convert.ToDouble(currencyRate);
            exp.Parameters["WEIGHT_PRICE_MX"] = Convert.ToDouble(bookWeigthPriceMX);

            exp.Parameters["WEIGHT_PARTS_500"] = Convert.ToDouble(bookParts500Grams);

            decimal val = Convert.ToDecimal((double)exp.Evaluate());
            return decimal.Round(val, 2, MidpointRounding.ToEven);
        }

        public decimal GetUSNetPayout(decimal usedPrice, decimal price, int weigth, decimal currency)
        {
            return CalculateNetPayout(_formulas.USNetPayout, usedPrice, price, weigth, currency);
        }

        public decimal GetCANetPayout(decimal usedPrice, decimal price, int weigth, decimal currency)
        {
            return CalculateNetPayout(_formulas.CANetPayout, usedPrice, price, weigth, currency);
        }

        public decimal GetMXNetPayout(decimal usedPrice, decimal price, int weigth, decimal currency)
        {
            return CalculateNetPayout(_formulas.MXNetPayout, usedPrice, price, weigth, currency);
        }

        public decimal GetINNetPayout(decimal usedPrice, decimal price, int weigth, decimal currency)
        {
            return CalculateNetPayout(_formulas.INNetPayout, usedPrice, price, weigth, currency);
        }
    }
}
