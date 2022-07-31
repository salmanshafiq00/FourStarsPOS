using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;


namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : BaseController<Role>
    {
        public RoleController(POSContext context) : base(context)
        {

        }
    }
}
