using BookTracker.Models.System;
using BookTracker.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Web.Controllers
{
    [Route("api/[controller]")]
    public class SysController : Controller
    {
        private readonly ISysAppService _sysAppService;

        public SysController(ISysAppService sysAppService)
        {
            _sysAppService = sysAppService;
        }

        [HttpGet("[action]")]
        public async Task<SystemConfig> Get()
        {
            return await _sysAppService.GetConfig();
        }

        [HttpPut("[action]", Name = "[action]")]
        public Task Update([FromBody] SystemConfig data)
        {
            return _sysAppService.Update(data);
        }
    }
}
