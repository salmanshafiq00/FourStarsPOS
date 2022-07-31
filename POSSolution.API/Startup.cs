using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using POSSolution.Infrastructure;
using Microsoft.EntityFrameworkCore;
using POSSolution.Application;
using POSSolution.Infrastructure.ModelRepository;
using POSSolution.Core.Models;
using Microsoft.AspNetCore.Mvc.Formatters;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using FastReport.Data;

namespace POSSolution.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("posPolicy", policy =>
            policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()));
            services.AddControllers().AddNewtonsoftJson(options =>
                        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddScoped<IRepository<Country>, Repository<Country>>();
            services.AddDbContext<POSContext>(options =>
                                options.UseSqlServer(Configuration.GetConnectionString("PosSolutionConnection")));
            services.AddIdentity<IdentityUser, IdentityRole>(ob =>
            {
                ob.Password.RequireDigit = false;
                ob.Password.RequireLowercase = false;
                ob.Password.RequireNonAlphanumeric = false;
                ob.User.RequireUniqueEmail = true;

            }).AddEntityFrameworkStores<POSContext>().AddDefaultTokenProviders();

            // Adding Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });

            FastReport.Utils.RegisteredObjects.AddConnection(typeof(MsSqlDataConnection));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "POSSolution.API", Version = "v1" });
            });
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "POSSolution.API v1"));
            }
            app.UseCors("posPolicy");
            app.UseRouting();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseFastReport();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
