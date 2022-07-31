using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;


namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitController : BaseController<Unit>
    {
        public UnitController(POSContext context) : base(context)
        {

        }
    }
}
