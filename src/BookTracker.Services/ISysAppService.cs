using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using BookTracker.Models.Options;
using BookTracker.Models.System;

namespace BookTracker.Services
{
    public interface ISysAppService
    {
        SystemOptions GetConfig();

        Task Update(SystemOptions config);

        Task Update(SystemOptions config, CancellationToken token);

        Task Reset();

        Task Reset(CancellationToken token);
    }
}
