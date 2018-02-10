using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookTracker.Models.Options;
using BookTracker.Models.System;
using BookTracker.Repository;
using Microsoft.Extensions.Options;

namespace BookTracker.Services
{
    public class SysAppService : ISysAppService
    {
        private readonly ISystemRepository _systemRepository;
        private readonly KeepaOptions _options;

        public SysAppService(ISystemRepository systemRepository, IOptions<KeepaOptions> options)
        {
            _systemRepository = systemRepository;
            _options = options.Value;
        }

        public async Task<SystemConfig> GetConfig()
        {
            var config = await _systemRepository.Get();
            if(config == null)
            {
                config = new SystemConfig()
                {
                    KeepaApiKey = _options.ApiKey
                };
            }
            return config;
        }

        public Task Update(SystemConfig config)
        {
            return _systemRepository.Update(config);
        }
    }
}
