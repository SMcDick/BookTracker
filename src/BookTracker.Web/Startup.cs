using BookTracker.Models.Options;
using BookTracker.Repository;
using BookTracker.Services.ExternalServices;
using BookTracker.Services.Http;
using BookTracker.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BookTracker.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<KeepaOptions>(c => new KeepaOptions()
            {
                ApiKey = Configuration["KeepaSettings:apiKey"],
                BaseUri = Configuration["KeepaSettings:baseUri"]
            });
            services.Configure<BookScouterOptions>(c => new BookScouterOptions()
            {
                BaseUri = Configuration["BookScouter:baseUri"]
            });
            services.AddScoped<IKeepaService, KeepaService>();
            services.AddScoped<IBookScouterService, BookScouterService>();

            services.AddDbContext<ApplicationDbContext>(opts => opts.UseSqlite("Data Source=dbapp.db"));

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
