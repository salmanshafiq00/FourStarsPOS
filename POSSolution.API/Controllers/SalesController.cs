using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POSSolution.API.DTO;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : BaseController<Sales>
    {
        private POSContext _context;
        public SalesController(POSContext context) : base(context)
        {
            _context = context;
        }
        // Api for single entity
        [HttpGet("{id}")]
        public override async Task<ActionResult<Sales>> GetAsync([FromRoute] int id)
        {
            try
            {

                var result = await _dbSet.Include(sd => sd.SalesDetails).Where(e => e.Id == id).FirstOrDefaultAsync();
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound($"{id} not found");
                }
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        // Api for Create entity
        [HttpPost]
        public override async Task<ActionResult<Sales>> CreateAsync([FromBody] Sales sales)
        {
            using (var transection = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    foreach (SalesDetails details in sales.SalesDetails)
                    {
                        decimal salesPrice =  _context.PurchaseDetails.OrderBy(o => o.Id).First(s => s.ItemId == details.ItemId && s.Quantity > s.SoldQty).SalesPrice;
                        details.TotalAmount = details.SalesQty * salesPrice;
                    }

                    sales.SubTotal = sales.SalesDetails.Sum(s => s.TotalAmount);

                    await _context.Sales.AddAsync(sales);
                    await _context.SaveChangesAsync();

                    // Update the sold quantity in PurchaseDetails
                    List<PurchaseDetails> pdList = new List<PurchaseDetails>();
                    foreach (SalesDetails details in sales.SalesDetails)
                    {
                        PurchaseDetails pd  = _context.PurchaseDetails.OrderBy(o => o.Id).First(s => s.ItemId == details.ItemId && s.Quantity > s.SoldQty);
                        pd.SoldQty = details.SalesQty;
                        pdList.Add(pd);
                    }
                    _context.PurchaseDetails.UpdateRange(pdList);

                    // Update the SalesQty in StockCount
                    List<StockCount> whList = new List<StockCount>();
                    foreach (SalesDetails details in sales.SalesDetails)
                    {

                        if (_context.StockCounts.Any(item => item.ItemId == details.ItemId))
                        {
                            StockCount wh = _context.StockCounts.Single(item => item.ItemId == details.ItemId);
                            wh.SalesQty += details.SalesQty;
                            whList.Add(wh);

                        }

                    }
                     _context.StockCounts.UpdateRange(whList);
                    await _context.SaveChangesAsync();
                    await transection.CommitAsync();
                }
                catch (Exception ex)
                {
                    await transection.RollbackAsync();
                    throw new Exception(ex.Message);
                }
            }
            return Created("api/Sales/" + sales.Id, sales);
        }

        // Api for Update entity
        [HttpPut("{id}")]
        public override async Task<ActionResult<Sales>> UpdateAsync([FromRoute] int id, [FromBody] Sales sales)
        {
            if (id != sales.Id)
            {
                return BadRequest();
            }
            else
            {
                using (var transection = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        // Fetch sold item's price
                        foreach (SalesDetails details in sales.SalesDetails)
                        {
                            decimal salesPrice = _context.PurchaseDetails.OrderBy(o => o.Id).First(s => s.ItemId == details.ItemId && s.Quantity > s.SoldQty).SalesPrice;
                            details.TotalAmount = details.SalesQty * salesPrice;
                        }

                        sales.SubTotal = sales.SalesDetails.Sum(s => s.TotalAmount);

                         _context.Sales.Update(sales);

                        // Update the sold quantity in PurchaseDetails
                        List<PurchaseDetails> pdList = new List<PurchaseDetails>();
                        foreach (SalesDetails details in sales.SalesDetails)
                        {
                            PurchaseDetails pd = _context.PurchaseDetails.OrderBy(o => o.Id).First(s => s.ItemId == details.ItemId && s.Quantity > s.SoldQty);
                            decimal diffSoldQty = details.SalesQty - pd.SoldQty;
                            pd.SoldQty += diffSoldQty;
                            pdList.Add(pd);
                        }
                        _context.PurchaseDetails.UpdateRange(pdList);

                        // Update the SalesQty in StockCount
                        List<StockCount> whList = new List<StockCount>();
                        foreach (SalesDetails details in sales.SalesDetails)
                        {

                            if (_context.StockCounts.Any(item => item.ItemId == details.ItemId))
                            {
                                decimal diffSalesQty = details.SalesQty - _context.SalesDetails.Single(sd => sd.Id == details.Id).SalesQty;
                                StockCount wh = _context.StockCounts.Single(item => item.ItemId == details.ItemId);
                                wh.SalesQty += diffSalesQty;
                                whList.Add(wh);

                            }

                        }
                        _context.StockCounts.UpdateRange(whList);
                        await _context.SaveChangesAsync();
                        await transection.CommitAsync();
                    }
                    catch (Exception ex)
                    {
                        await transection.RollbackAsync();
                        throw new Exception(ex.Message);
                    }
                }
                return Ok();
            }
           
        }
    }
}


