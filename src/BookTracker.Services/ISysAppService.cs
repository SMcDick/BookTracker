using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookTracker.Models.System;

namespace BookTracker.Services
{
    public interface ISysAppService
    {
        Task<SystemConfig> GetConfig();

        Task Update(SystemConfig config);
    }
}
