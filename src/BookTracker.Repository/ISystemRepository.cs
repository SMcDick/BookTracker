using BookTracker.Models.System;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Repository
{
    public interface ISystemRepository
    {
        Task<SystemConfig> Get();

        Task Update(SystemConfig data);
    }
}
