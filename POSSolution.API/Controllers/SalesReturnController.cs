using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class SalesReturnController : BaseController<SalesReturn>
    {
        private POSContext _context;
        public SalesReturnController(POSContext context) : base(context)
        {
            _context = context;
        }
        // Api for get single entity
        public override async Task<ActionResult<SalesReturn>> GetAsync([FromRoute] int id)
        {
            try
            {

                var result = await _dbSet.Include(sd => sd.SalesReturnDetails).Where(e => e.Id == id).FirstOrDefaultAsync();
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
        public override async Task<ActionResult<SalesReturn>> CreateAsync([FromBody] SalesReturn salesReturn)
        {
            using (var transection = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    if (await _context.Sales
                        .Include(s => s.SalesDetails)
                        .AnyAsync(s => s.Id == salesReturn.SalesId && 
                        s.CustomerId == salesReturn.CustomerId ))
                    {

                        await _context.SalesReturns.AddAsync(salesReturn);
                        await _context.SaveChangesAsync();
                    }

                    // Update the sold quantity in PurchaseDetails
                    List<PurchaseDetails> pdList = new List<PurchaseDetails>();
                    foreach (SalesReturnDetails details in salesReturn.SalesReturnDetails)
                    {
                        PurchaseDetails pd = _context.PurchaseDetails.OrderBy(o => o.Id).First(s => s.ItemId == details.ReturnItemId);
                        pd.SoldQty -= details.SalesReturnQty;
                        pdList.Add(pd);
                    }
                    _context.PurchaseDetails.UpdateRange(pdList);

                    // Update the SalesQty in StockCount
                    List<StockCount> whList = new List<StockCount>();
                    foreach (SalesReturnDetails details in salesReturn.SalesReturnDetails)
                    {
                        if(_context.SalesDetails.Any(e => e.ItemId == details.ReturnItemId) && _context.StockCounts.Any(item => item.ItemId == details.ReturnItemId))
                        {
                            StockCount wh = _context.StockCounts.Single(item => item.ItemId == details.ReturnItemId);
                            wh.SalesQty -= details.SalesReturnQty;
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
            return Created("api/SalesReturn/" + salesReturn.Id, salesReturn);
        }
        // Api for update entity
        public override async Task<ActionResult<SalesReturn>> UpdateAsync([FromRoute] int id, [FromBody] SalesReturn salesReturn)
        {
            using (var transection = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    if (id != salesReturn.Id)
                    {
                        return BadRequest();
                    }
                    else
                    {
                        if (await _context.SalesReturns.AnyAsync(p => p.Id == id))
                        {
                            _context.SalesReturns.Update(salesReturn);

                        }
                    }

                    // Update the sold quantity in PurchaseDetails
                    List<PurchaseDetails> pdList = new List<PurchaseDetails>();
                    foreach (SalesReturnDetails details in salesReturn.SalesReturnDetails)
                    {
                        PurchaseDetails pd = _context.PurchaseDetails.OrderBy(o => o.Id).First(s => s.ItemId == details.ReturnItemId);
                        decimal diffSoldQty = pd.SoldQty - details.SalesReturnQty;
                        pd.SoldQty += diffSoldQty;
                        pdList.Add(pd);
                    }
                    _context.PurchaseDetails.UpdateRange(pdList);

                    // Update the SalesQty in StockCount
                    List<StockCount> whList = new List<StockCount>();
                    foreach (SalesReturnDetails details in salesReturn.SalesReturnDetails)
                    {

                        if (_context.StockCounts.Any(item => item.ItemId == details.ReturnItemId))
                        {
                            decimal diffQty = _context.SalesReturnDetails.Single(p => p.Id == details.Id).SalesReturnQty - details.SalesReturnQty;
                            StockCount wh = _context.StockCounts.FirstOrDefault(item => item.ItemId == details.ReturnItemId);
                            wh.PurchaseQty += diffQty;
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



