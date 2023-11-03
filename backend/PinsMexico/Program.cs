using Microsoft.EntityFrameworkCore;
using PinsMexico;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS to services
builder.Services.AddCors();

// Database
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Configure CORS for development (You can adjust this later for production if needed)
    app.UseCors(builder => builder
       .AllowAnyOrigin()
       .AllowAnyMethod()
       .AllowAnyHeader()
    );
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
