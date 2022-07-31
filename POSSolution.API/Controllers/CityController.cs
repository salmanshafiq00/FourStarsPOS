using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;

namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : BaseController<City> 
    {
        public CityController(POSContext context) : base(context)
        {

        }
    }
}
