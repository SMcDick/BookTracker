using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Services.Domains
{
    public interface IBookDomain
    {
        decimal GetUSNetPayout(decimal usedPrice, decimal price, int weigth, decimal currency);

        decimal GetCANetPayout(decimal usedPrice, decimal price, int weigth, decimal currency);

        decimal GetMXNetPayout(decimal usedPrice, decimal price, int weigth, decimal currency);

        decimal GetINNetPayout(decimal usedPrice, decimal price, int weigth, decimal currency);
    }
}
