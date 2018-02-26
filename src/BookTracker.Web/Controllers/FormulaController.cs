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
    public class FormulaController : Controller
    {
        private readonly ISysAppService _sysAppService;
        private readonly ILogger<FormulaController> _logger;
        private readonly SystemOptions _sysOptions;

        public FormulaController(ISysAppService sysAppService,
            ILogger<FormulaController> logger)
        {
            _sysAppService = sysAppService;
            _logger = logger;
        }

        [HttpGet]
        public Formulas Get()
        {
            return _sysAppService.GetFormulas();
        }

        [HttpPost]
        public async Task Update([FromBody] Formulas data, CancellationToken cancellationToken)
        {
            await _sysAppService.UpdateFormulas(data, cancellationToken);
        }
    }
}
