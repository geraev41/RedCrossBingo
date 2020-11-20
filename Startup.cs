using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RedCrossBingo.Models; 
using Microsoft.EntityFrameworkCore; 
using RedCrossBingo.Repositories;
using GraphQL;
using RedCrossBingo.GraphQL;
using GraphQL.Server;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using GraphQL.Server.Ui.Playground;


namespace RedCrossBingo
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
            services.AddDbContext<DataBaseContext>(opt => opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")).UseSnakeCaseNamingConvention());
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory

             //dependency injection
            services.AddScoped<BingocardsRepository>();
            services.AddScoped<BingocardsnumbersRepository>();
            services.AddScoped<BingonumberRepository>();
            services.AddScoped<MainAdminRepository>();
            services.AddScoped<UserRepository>();

            services.AddScoped<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));
            services.AddScoped<RedCrossBingoSchema>();

            //Graphql configuration
            services.AddGraphQL(o => { o.ExposeExceptions = true;})
                    .AddGraphTypes(ServiceLifetime.Scoped);

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
             app.UseGraphQL<RedCrossBingoSchema>();
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions
            {
                Path = "/ui/playground"
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
