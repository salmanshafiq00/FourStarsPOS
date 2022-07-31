using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POSSolution.Application;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;
using POSSolution.Infrastructure.ModelRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : BaseController<Country>
    {
        private readonly POSContext _context;
        public CountryController(POSContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<ActionResult<IEnumerable<Country>>> GetAllAsync()
        {
            return await _context.Countries.Include(c => c.States).ThenInclude(c => c.Cities).ToListAsync();
        }

    }

}
