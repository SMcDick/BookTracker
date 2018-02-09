using BookTracker.Models.Options;
using BookTracker.Repository;
using BookTracker.Services;
using BookTracker.Services.ExternalServices;
using BookTracker.Services.Http;
using BookTracker.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

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
            services.AddMvc();

            string apiKey = Configuration["KeepaSettings:apiKey"];
            string keepaUri = Configuration["KeepaSettings:baseUri"];

            services.Configure<KeepaOptions>(c =>
            {
                c.ApiKey = apiKey;
                c.BaseUri = keepaUri;
            });

            string scoutUri = Configuration["BookScouter:baseUri"];
            services.Configure<BookScouterOptions>(c =>
            {
                c.BaseUri = scoutUri;
            });

            services.AddScoped<IKeepaService, KeepaService>();
            services.AddScoped<IBookScouterService, BookScouterService>();

            services.AddScoped<IBookAppService, BookAppService>();

            services.AddDbContext<ApplicationDbContext>(opts => opts.UseSqlite("Data Source=dbapp.db"));


            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new Info { Title = "BookTracker Api", Version = "v1" }));
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

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "BookTracker Api v1");
            });

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
