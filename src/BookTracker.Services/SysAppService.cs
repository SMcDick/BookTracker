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

        public async Task<AppConfig> GetConfig()
        {
            var appConfig = new AppConfig();

            var config = await _systemRepository.Get();
            if (config == null)
            {
                config = new SystemConfig()
                {
                    KeepaApiKey = _options.ApiKey
                };
            }
            appConfig.System = config;

            var boxes = await _systemRepository.GetBoxes();

            appConfig.Box1 = boxes.Count > 0 ? boxes[0] : new Box();
            appConfig.Box3 = boxes.Count > 1 ? boxes[1] : new Box();
            appConfig.Box4 = boxes.Count > 2 ? boxes[2] : new Box();
            appConfig.Box5 = boxes.Count > 3 ? boxes[3] : new Box();

            var minBox = await _systemRepository.GetMinBox();
            appConfig.Box2 = minBox;

            return appConfig;
        }

        public void Reset()
        {
            _systemRepository.Reset();
        }

        public async Task Update(AppConfig config)
        {
            await _systemRepository.Update(config.System);

            await _systemRepository.UpdateBox(config.Box1);
            await _systemRepository.UpdateMinBox(config.Box2);

            await _systemRepository.UpdateBox(config.Box3);
            await _systemRepository.UpdateBox(config.Box4);
            await _systemRepository.UpdateBox(config.Box5);
        }
    }
}
