using BookTracker.Infra;
using BookTracker.Models.Options;
using BookTracker.Models.System;
using BookTracker.Services;
using BookTracker.Services.ExternalServices;
using BookTracker.Services.Http;
using BookTracker.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Swashbuckle.AspNetCore.Swagger;

namespace BookTracker.Web
{
    public class Startup
    {
        private readonly IHostingEnvironment _env;

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            _env = env;
            Configuration = configuration;

            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMemoryCache();
            services.AddScoped<ICache, MemoryCache>();

            services.AddMvc();
            services.AddOptions();

            services.Configure<KeepaOptions>(Configuration.GetSection("KeepaSettings"));

            services.Configure<BookScouterOptions>(Configuration.GetSection("BookScouter"));

            services.Configure<EnvorimentOptions>(c =>
            {
                c.RootDir = _env.ContentRootPath;
                c.AppDataDir = System.IO.Path.Combine(_env.ContentRootPath, "App_Data");
            });

            services.Configure<Formulas>(Configuration.GetSection("Formulas"));

            services.Configure<SystemOptions>(Configuration.GetSection("SysConfig"));

            services.AddScoped<IKeepaService, KeepaService>();
            services.AddScoped<IBookScouterService, BookScouterService>();

            services.AddScoped<IBookAppService, BookAppService>();
            services.AddScoped<ISysAppService, SysAppService>();

            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new Info { Title = "BookTracker Api", Version = "v1" }));

            string httpsOnly = Configuration["HTTPS"];
            if (!string.IsNullOrEmpty(httpsOnly) && string.Equals(httpsOnly, "true", System.StringComparison.CurrentCultureIgnoreCase))
            {
                services.Configure<MvcOptions>(opts => opts.Filters.Add(new RequireHttpsAttribute()));
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddSerilog();

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
                string httpsOnly = Configuration["HTTPS"];
                if (!string.IsNullOrEmpty(httpsOnly) && string.Equals(httpsOnly, "true", System.StringComparison.CurrentCultureIgnoreCase))
                {
                    var rOpts = new RewriteOptions()
                    .AddRedirectToHttps();

                    app.UseRewriter(rOpts);
                }

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
