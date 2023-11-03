using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PinsMexico.Entities;

namespace PinsMexico.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : Controller
    {
        private readonly MyDbContext _context;

        public StatusController(MyDbContext context)
        {
            _context = context;
        }
        // GET: api/Status
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Status>>> GetStatus()
        {
            if (_context.Status == null)
            {
                return NotFound();
            }
            return await _context.Status.ToListAsync();
        }
    }
}
