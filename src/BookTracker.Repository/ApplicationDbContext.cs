using BookTracker.Models.System;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Repository
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<SystemConfig> SystemConfig { get; set; }

        public DbSet<Box> BoxConfig { get; set; }

        public DbSet<MinBox> MinBoxConfig { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=dbapp.db");
        }

        public static void RefreshConfig(ApplicationDbContext dbContext)
        {
            var boxes = dbContext.BoxConfig.ToList();
            dbContext.BoxConfig.RemoveRange(boxes);

            var boxMin = dbContext.MinBoxConfig.ToList();
            dbContext.MinBoxConfig.RemoveRange(boxMin);

            var settings = dbContext.SystemConfig.ToList();
            dbContext.SystemConfig.RemoveRange(settings);

            dbContext.SaveChanges();

            dbContext.SystemConfig.Add(new Models.System.SystemConfig
            {
                Current = true,
                Id = 1,
                KeepaApiKey = "XXX",
                LastModified = DateTime.UtcNow
            });

            dbContext.BoxConfig.Add(new Box
            {
                Id = 1,
                Color = "green",
                Description = "US Sales Rank Range",
                Enabled = true,

                MaxSalesRank = 10000,
                MinSalesRank = 1,
                MinNetPayout = 22,

                MaxSalesRank1 = 10000,
                MinSalesRank1 = 5000,
                MinNetPayout1 = 5,

                MaxSalesRank2 = 10000,
                MinSalesRank2 = 500,
                MinNetPayout2 = 5,

                MaxSalesRank3 = 10000,
                MinSalesRank3 = 400,
                MinNetPayout3 = 4,
            });

            dbContext.BoxConfig.Add(new Box
            {
                Id = 3,
                Color = "grey",
                Description = "US Sales Rank Range",
                Enabled = false,

                MaxSalesRank = 10000,
                MinSalesRank = 1,
                MinNetPayout = 22,

                MaxSalesRank1 = 10000,
                MinSalesRank1 = 5000,
                MinNetPayout1 = 5,

                MaxSalesRank2 = 10000,
                MinSalesRank2 = 500,
                MinNetPayout2 = 5,

                MaxSalesRank3 = 10000,
                MinSalesRank3 = 400,
                MinNetPayout3 = 4,
            });

            dbContext.BoxConfig.Add(new Box
            {
                Id = 4,
                Color = "blue",
                Description = "CANADA Sales Rank Range",
                Enabled = true,

                MaxSalesRank = 10000,
                MinSalesRank = 1,
                MinNetPayout = 22,

                MaxSalesRank1 = 10000,
                MinSalesRank1 = 5000,
                MinNetPayout1 = 5,

                MaxSalesRank2 = 10000,
                MinSalesRank2 = 500,
                MinNetPayout2 = 5,

                MaxSalesRank3 = 10000,
                MinSalesRank3 = 400,
                MinNetPayout3 = 4,
            });

            dbContext.BoxConfig.Add(new Box
            {
                Id = 5,
                Color = "pink",
                Description = "US Sales Rank Range",
                Enabled = true,

                MaxSalesRank = 10000,
                MinSalesRank = 1,
                MinNetPayout = 22,

                MaxSalesRank1 = 10000,
                MinSalesRank1 = 5000,
                MinNetPayout1 = 5,

                MaxSalesRank2 = 10000,
                MinSalesRank2 = 500,
                MinNetPayout2 = 5,

                MaxSalesRank3 = 10000,
                MinSalesRank3 = 400,
                MinNetPayout3 = 4,
            });

            dbContext.MinBoxConfig.Add(new MinBox
            {
                Color = "yellow",
                Enabled = true,
                Id = 2,
                OfferGreaterThan = 3,
                Sound = ""
            });

            dbContext.SaveChanges();
        }
    }
}
