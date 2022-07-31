using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using FastReport.Web;
using POSSolution.Infrastructure;
using Microsoft.Extensions.Configuration;
using System.IO;
using FastReport.Export.PdfSimple;
using FastReport.Data;

namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ReportController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly POSContext _context;
        private readonly IConfiguration _config;

        public ReportController(IWebHostEnvironment env, POSContext context, IConfiguration config)
        {
            this._env = env;
            this._context = context;
            this._config = config;
        }
        [HttpGet]
        [Route("allpurchage")]
        public IActionResult GetAllPurchase()
        {
            WebReport web = new WebReport();
            MsSqlDataConnection mscon = new MsSqlDataConnection();
            //load the fast report
            var path = $"{this._env.WebRootPath}\\Reports\\purchase.frx";
            web.Report.Load(path);
            mscon.ConnectionString = this._config.GetConnectionString("PosSolutionConnection");
            var constring = mscon.ConnectionString;
            web.Report.SetParameterValue("conn", mscon.ConnectionString);

            //get supplier name
            // var SupplerName  = _context.Suppliers.Where( s=> s.Name == "abc").FirstOrDefault().Name ;
            // render the report pdf
            Stream stream = new MemoryStream();
            web.Report.Prepare();
            web.Report.Export(new PDFSimpleExport(), stream);
            stream.Position = 0;
            return File(stream, "application/pdf", "purchase.pdf");
            //var add =  File(stream, "application/pdf", "purchase.pdf");

            //return Ok(add);
        }


        [HttpGet]
        [Route("allCity")]
        public IActionResult allCity()
        {
            WebReport web = new WebReport();
            MsSqlDataConnection mscon = new MsSqlDataConnection();
            var path = $"{this._env.WebRootPath}\\Reports\\city.frx";
            web.Report.Load(path);
            mscon.ConnectionString = this._config.GetConnectionString("PosSolutionConnection");
            web.Report.SetParameterValue("Conn", mscon.ConnectionString);

            Stream stream = new MemoryStream();
            web.Report.Prepare();
            web.Report.Export(new PDFSimpleExport(), stream);
            stream.Position = 0;
            return File(stream, "application/pdf", "city.pdf");
        }
    }
}
