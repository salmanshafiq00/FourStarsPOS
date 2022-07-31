using Microsoft.AspNetCore.Mvc;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;

namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController<Category>
    {
        public CategoryController(POSContext context) : base(context)
        {

        }
    }
}
