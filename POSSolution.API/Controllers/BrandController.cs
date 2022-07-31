using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;



namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : BaseController<Brand>
    {
        public BrandController(POSContext context) : base(context)
        {

        }
    }
}
