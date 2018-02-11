using BookTracker.Models.Options;
using BookTracker.Models.System;
using BookTracker.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Web.Controllers
{
    [Route("api/[controller]")]
    public class SysController : Controller
    {
        private readonly ISysAppService _sysAppService;
        private readonly ILogger<SysController> _logger;
        private readonly LogOptions _logOptions;

        public SysController(ISysAppService sysAppService, ILogger<SysController> logger, IOptions<LogOptions> option)
        {
            _sysAppService = sysAppService;
            _logger = logger;
            _logOptions = option.Value;
        }

        [HttpGet("[action]")]
        public string Status()
        {
            string status = "Ok";
            _logger.LogInformation("State of application {status}", status);
            return status;
        }

        [HttpGet("[action]")]
        public async Task<AppConfig> Get()
        {
            return await _sysAppService.GetConfig();
        }

        [HttpPut("[action]", Name = "[action]")]
        public Task Update([FromBody] AppConfig data)
        {
            return _sysAppService.Update(data);
        }

        [HttpGet("[action]")]
        public void Reset()
        {
            _sysAppService.Reset();
        }
    }
}
