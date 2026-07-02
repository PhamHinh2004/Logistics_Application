using Fleet_Service.Data;
using Fleet_Service.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure MongoDb Settings and Context
var connectionString = builder.Configuration.GetSection("MongoDbSettings:ConnectionString").Value;
var databaseName = builder.Configuration.GetSection("MongoDbSettings:DatabaseName").Value;

builder.Services.AddSingleton<MongoDbContext>(sp => 
    new MongoDbContext(connectionString, databaseName));

builder.Services.AddScoped<VehicleRepository>();
builder.Services.AddScoped<DriverRepository>();
builder.Services.AddScoped<ContainerRepository>();

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

app.Run();
