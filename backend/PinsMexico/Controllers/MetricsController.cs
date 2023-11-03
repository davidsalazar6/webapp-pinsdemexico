using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PinsMexico.Entities;

namespace PinsMexico.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class MetricsController : Controller
  {
    private readonly MyDbContext _context;

    public MetricsController(MyDbContext context)
    {
      _context = context;
    }
    // GET: api/Metrics
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Metric>>> GetMetrics()
    {
      var metrics = await _context.Metrics.ToListAsync();
      var orders = await _context.Orders.ToListAsync();
      if (metrics == null)
      {
        return NotFound();
      }
      CalculateMetrics(metrics, orders);
      return metrics;
    }
    private void CalculateMetrics(List<Metric> metrics, List<Order> orders)
    {
      var counts = new Dictionary<string, int>
    {
        { "Completed", orders.Count(x => x.StatusKey == "Completed") },
        { "Pending", orders.Count(x => x.StatusKey == "Pending") },
        { "Canceled", orders.Count(x => x.StatusKey == "Canceled") }
    };

      metrics.ForEach(metric =>
      {
        metric.Value = metric.Title switch
        {
          "Pedidos completados" => counts["Completed"].ToString(),
          "Pedidos pendientes" => counts["Pending"].ToString(),
          "Pedidos cancelados" => counts["Canceled"].ToString(),
          "Total Facturado" => orders.Where(x => x.CreatedDateTime >= DateTime.Now.AddDays(-30)).Sum(x => x.Total).ToString("N0"),
          "Total IVA" => "Pendiente...",
          "Total por pagar" => "Pendiente...",
          _ => metric.Value
        };
      });
    }

  }
}
