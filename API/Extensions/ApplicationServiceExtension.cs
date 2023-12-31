using API.Data;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
  public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection service,
         IConfiguration config)
        {
          service.AddDbContext<DataContext>(options =>
          {
            options.UseSqlite(config.GetConnectionString("DefaultConnection"));
          });
          service.AddCors();
          service.AddScoped<ITokenService, TokenService>();
          service.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
          service.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
          service.AddScoped<IPhotoService, PhotoService>();
          service.AddScoped<LogUserActivity>();
          service.AddSignalR();
          service.AddSingleton<PresenceTracker>();
          service.AddScoped<IUnitOfWork, UnitOfWork>();

          return service;
        }
    }
}
