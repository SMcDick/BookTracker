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

        public Task<List<Box>> GetBoxes()
        {
            return _dbContext.BoxConfig.ToListAsync();
        }

        public Task<MinBox> GetMinBox()
        {
            return _dbContext.MinBoxConfig.FirstOrDefaultAsync();
        }

        public void Reset()
        {
            ApplicationDbContext.RefreshConfig(_dbContext);
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

        public Task UpdateBox(Box data)
        {
            if(data.Id == 0)
            {
                _dbContext.BoxConfig.Add(data);
            }
            else
            {
                _dbContext.BoxConfig.Update(data);
            }
            return _dbContext.SaveChangesAsync();
        }

        public Task UpdateMinBox(MinBox data)
        {
            if (data.Id == 0)
            {
                _dbContext.MinBoxConfig.Add(data);
            }
            else
            {
                _dbContext.MinBoxConfig.Update(data);
            }
            return _dbContext.SaveChangesAsync();
        }
    }
}
