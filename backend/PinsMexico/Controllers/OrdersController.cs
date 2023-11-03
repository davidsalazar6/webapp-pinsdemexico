using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PinsMexico;
using PinsMexico.Entities;

namespace PinsMexico.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class OrdersController : ControllerBase
  {
    private readonly MyDbContext _context;

    public OrdersController(MyDbContext context)
    {
      _context = context;
    }

    // GET: api/Orders
    [HttpGet("SelectOrders")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
      return await _context.Orders.Include(x => x.Status).ToListAsync();
    }

    // GET: api/Orders/5
    [HttpGet("SelectOrder/{id}")]
    public async Task<ActionResult<Order>> GetOrder(long id)
    {
      var order = await _context.Orders.FindAsync(id);

      if (order == null)
      {
        return NotFound();
      }

      return order;
    }

    // PUT: api/Orders/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("UpdateOrder/{id}")]
    public async Task<IActionResult> PutOrder(long id, Order order)
    {
      if (id != order.ID)
      {
        return BadRequest();
      }
      _context.Entry(order).State = EntityState.Modified;

      await _context.SaveChangesAsync();

      return NoContent();
    }

    // POST: api/Orders
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost("CreateOrder")]
    public async Task<ActionResult<Order>> PostOrder(Order order)
    {

      order.Status = null;
      _context.Orders.Add(order);
      try
      {
        await _context.SaveChangesAsync();

      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }

      return CreatedAtAction("GetOrder", new { id = order.ID }, order);
    }

    // DELETE: api/Orders/5
    [HttpDelete("DeleteOrder/{id}")]
    public async Task<IActionResult> DeleteOrder(long id)
    {

      var order = await _context.Orders.FindAsync(id);
      if (order == null)
      {
        return NotFound();
      }

      _context.Orders.Remove(order);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool OrderExists(long id)
    {
      return (_context.Orders?.Any(e => e.ID == id)).GetValueOrDefault();
    }
  }
}
