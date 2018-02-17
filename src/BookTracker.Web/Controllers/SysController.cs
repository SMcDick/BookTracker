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
using System.Threading;
using System.Threading.Tasks;

namespace BookTracker.Web.Controllers
{
    [Route("api/[controller]")]
    public class SysController : Controller
    {
        private readonly ISysAppService _sysAppService;
        private readonly ILogger<SysController> _logger;
        private readonly EnvorimentOptions _logOptions;
        private readonly SystemOptions _sysOptions;

        public SysController(ISysAppService sysAppService,
            ILogger<SysController> logger,
            IOptions<EnvorimentOptions> option,
            IOptionsSnapshot<SystemOptions> sysOptions)
        {
            _sysAppService = sysAppService;
            _logger = logger;
            _logOptions = option.Value;
            _sysOptions = sysOptions.Value;
        }

        [HttpGet("[action]")]
        public string Status()
        {
            string status = "Ok";
            _logger.LogInformation("State of application {status}", status);
            return $"Status Ok";
        }

        [HttpGet("")]
        public SystemOptions Get()
        {
            return _sysAppService.GetConfig();
        }

        [HttpPost("")]
        public async Task Update([FromBody] SystemOptions data, CancellationToken cancellationToken)
        {
            await _sysAppService.Update(data, cancellationToken);
        }

        [HttpGet("[action]")]
        public async Task Reset(CancellationToken cancellationToken)
        {
            await _sysAppService.Reset(cancellationToken);
        }
    }
}
