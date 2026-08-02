using Fleet_Service.Data;
using Fleet_Service.Mappers;
using Fleet_Service.Repositories;
using Fleet_Service.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("https://logistics-application-nine.vercel.app") // Replace with your frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// configure parse enum 
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Configure MongoDb Settings and Context
var connectionString = builder.Configuration.GetSection("MongoDbSettings:ConnectionString").Value;
var databaseName = builder.Configuration.GetSection("MongoDbSettings:DatabaseName").Value;

builder.Services.AddSingleton<MongoDbContext>(sp => 
    new MongoDbContext(connectionString, databaseName));

builder.Services.AddScoped<VehicleRepository>();
builder.Services.AddScoped<DriverRepository>();
builder.Services.AddScoped<ContainerRepository>();

builder.Services.AddScoped<ContainerService>();
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
    
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseRouting();

app.UseCors("AllowFrontend");

app.Run();
