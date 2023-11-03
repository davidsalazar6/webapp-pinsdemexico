using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PinsMexico.Entities;

namespace PinsMexico
{

  public class MyDbContext : DbContext
  {
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    { }
    public virtual DbSet<Order> Orders { get; set; }
    public DbSet<Status> Status { get; set; }
    public DbSet<Metric> Metrics { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        IConfigurationRoot configuration = new ConfigurationBuilder()
           .SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json")
           .Build();
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        optionsBuilder.UseSqlServer(connectionString);
      }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Metric>().HasNoKey();
    }

  }
}
