using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;


namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : BaseController<Expense>
    {
        public ExpenseController(POSContext context) : base(context)
        {

        }
    }
}
