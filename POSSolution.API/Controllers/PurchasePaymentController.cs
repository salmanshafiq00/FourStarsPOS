using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POSSolution.Core.Models;
using POSSolution.Infrastructure;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasePaymentController : BaseController<PurchasePayment>
    {
        private readonly POSContext _context;

        public PurchasePaymentController(POSContext context) : base(context)
        {
            this._context = context;
        }
        //public override async Task<ActionResult<PurchasePayment>> CreateAsync([FromBody] PurchasePayment entity)
        //{
        //    using (var transection = await _context.Database.BeginTransactionAsync())
        //    {
        //        try
        //        {
        //            if (entity != null)
        //            {
        //                await _context.PurchasePayments.AddAsync(entity);
        //                await _context.SaveChangesAsync();
        //            }

        //            int purchaseId = entity.PurchaseId;
        //            Supplier supplier = await GetSupplier(purchaseId);
        //            if (supplier != null)
        //            {
        //                supplier.Balance -= entity.Amount;
        //                _context.Suppliers.Attach(supplier);
        //                _context.Entry(supplier).Property(b => b.Balance).IsModified = true;
        //                await _context.SaveChangesAsync();
        //            }
                    

        //            await transection.CommitAsync();
        //            return Created("api/purchasePayment/"+entity.Id, entity);
        //        }
        //        catch (Exception)
        //        {
        //            await transection.RollbackAsync();
        //            return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
        //        }
        //    }

        //}


        //private async Task<Supplier> GetSupplier(int purchaseId)
        //{
        //    Purchase purchase = await _context.Purchases.Where(p => p.Id == purchaseId).FirstOrDefaultAsync();
        //    int supplierId = purchase.SupplierId;
        //    Supplier supplier = await _context.Suppliers.Where(s => s.Id == supplierId).FirstOrDefaultAsync();
        //    return supplier;
        //}
    }
}
