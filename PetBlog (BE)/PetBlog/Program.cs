using Microsoft.EntityFrameworkCore;
using PetBlog.Core.Contracts;
using PetBlog.Core.Models.AutoMapper;
using PetBlog.Core.Services;
using PetBlog.Infrastructure.Data;
using PetBlog.Infrastructure.Data.Repositories;
using PetBlog.Middlewares;

namespace PetBlog;

public class Program
{
    public static void Main(string[] args)
    {
        var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                     policy =>
                     {
                         policy.WithOrigins("http://localhost:3000").AllowAnyMethod();
                     });
        });

        // Add services to the container.
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseMySql(connectionString,
                new MariaDbServerVersion("8.0.33"),
                b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.GetName().Name));
        });
        builder.Services.AddAutoMapper(typeof(MappingProfile));
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddScoped<IRepository, Repository>();
        builder.Services.AddScoped<IPetService, PetService>();
        builder.Services.AddScoped<IImageService, ImageService>();
        builder.Services.AddScoped<IPreferencesService, PreferencesService>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        //if (app.Environment.IsDevelopment())
        //{
            app.UseSwagger();
            app.UseSwaggerUI();
        //}

        app.UseCors(MyAllowSpecificOrigins);

        app.UseMiddleware<ApiKeyValidationMiddleware>();

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}

