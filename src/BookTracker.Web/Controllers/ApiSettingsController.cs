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
    public class ApiSettingsController : Controller
    {
        private readonly ISysAppService _sysAppService;
        private readonly ILogger<ApiSettingsController> _logger;
        private readonly EnvorimentOptions _logOptions;
        private readonly SystemOptions _sysOptions;

        public ApiSettingsController(ISysAppService sysAppService,
            ILogger<ApiSettingsController> logger,
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

        [HttpGet]
        public KeepaOptions Get()
        {
            return _sysAppService.GetKeepaOptions();
        }

        [HttpPost("")]
        public async Task Update([FromBody] KeepaOptions data, CancellationToken cancellationToken)
        {
            await _sysAppService.UpdateKeepaOptions(data, cancellationToken);
        }
    }
}
