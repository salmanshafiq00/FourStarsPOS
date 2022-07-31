using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POSSolution.Application;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;
using POSSolution.Infrastructure.ModelRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyInfoController : BaseController<CompanyInfo>
    {
        public CompanyInfoController(POSContext context) : base(context)
        {

        }
    }
}