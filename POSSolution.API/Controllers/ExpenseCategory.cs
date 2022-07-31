using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;


namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseCategoryController : BaseController<ExpenseCategory>
    {
        public ExpenseCategoryController(POSContext context) : base(context)
        {

        }
    }
}
