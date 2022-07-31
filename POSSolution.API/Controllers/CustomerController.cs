using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;

namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : BaseController<Customer>
    {
        public CustomerController(POSContext context) : base(context)
        {

        }
    }
}
