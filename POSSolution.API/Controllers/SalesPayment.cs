using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;



namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesPaymentController : BaseController<SalesPayment>
    {
        public SalesPaymentController(POSContext context) : base(context)
        {

        }
    }
}
