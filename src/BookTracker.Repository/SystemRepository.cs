using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookTracker.Models.System;
using Microsoft.EntityFrameworkCore;

namespace BookTracker.Repository
{
    public class SystemRepository : ISystemRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public SystemRepository(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public Task<SystemConfig> Get()
        {
            return _dbContext.SystemConfig.FirstOrDefaultAsync(c => c.Current == true);
        }

        public async Task Update(SystemConfig data)
        {
            if(data.Id == 0)
            {
                _dbContext.SystemConfig.Add(data);
            }
            else
            {
                _dbContext.SystemConfig.Update(data);
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}
