using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;

namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesDiscountTaxController : BaseController<SalesDiscountTax>
    {
        public SalesDiscountTaxController(POSContext context) : base(context)
        {

        }
    }
}
