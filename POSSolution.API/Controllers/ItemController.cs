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
    public class ItemController : BaseController<Item>
    {
        private readonly POSContext _context;
        public ItemController(POSContext context) : base(context)
        {
            _context = context;
        }
        [HttpGet("NoImages")]
        public async Task<IActionResult> GetItemsNoImages()
        {
            try
            {
                return Ok(await _dbSet.Select(i => new { Id = i.Id, Name = i.Name, ItemCode= i.ItemCode, CategoryId = i.CategoryId, BrandId = i.BrandId, UnitId = i.UnitId, SKU = i.SKU, Barcode = i.Barcode, Description = i.Description, ProfitMargin = i.ProfitMargin, DiscountId = i.DiscountId }).ToListAsync());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                  "Error retrieving data from the database");
            }

        }


        [HttpGet("ItemWithPrice")]
        public IActionResult ItemWithPriceAsync()
        {
            try
            {
              var result =  _context.Items.Join(
                   _context.PurchaseDetails,
                   item => item.Id,
                   purchaseDetails => purchaseDetails.ItemId,
                   (item, PurchaseDetails) => new { item, PurchaseDetails }
                   ).Join(
                        _context.StockCounts,
                        itemCombined => itemCombined.item.Id,
                        stock => stock.ItemId,
                        (itemCombined, stock) => new {
                            ItemId = itemCombined.item.Id,
                            ItemName = itemCombined.item.Name,
                            ItemCode = itemCombined.item.ItemCode,
                            ExpireDate = itemCombined.PurchaseDetails.ExpireDate,
                            DiscountAmount = itemCombined.PurchaseDetails.DiscountAmount,
                            TaxAmount = itemCombined.PurchaseDetails.TaxAmount,
                            SalesPrice = itemCombined.PurchaseDetails.SalesPrice,
                            StockQty = stock.Balance
                        }

                    ).OrderBy(pd => pd.ExpireDate);

                return  Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpGet("ItemWithImages")]
        public IActionResult ItemWithImagesAsync()
        {
            try
            {
                var result = _context.Items.Join(
                     _context.PurchaseDetails,
                     item => item.Id,
                     purchaseDetails => purchaseDetails.ItemId,
                     (item, PurchaseDetails) => new { item, PurchaseDetails }
                     ).Join(
                          _context.StockCounts,
                          itemCombined => itemCombined.item.Id,
                          stock => stock.ItemId,
                          (itemCombined, stock) => new {
                              ItemId = itemCombined.item.Id,
                              ItemName = itemCombined.item.Name,
                              ItemCode = itemCombined.item.ItemCode,
                              ImagePath = itemCombined.item.ImagePath,
                              ExpireDate = itemCombined.PurchaseDetails.ExpireDate,
                              DiscountAmount = itemCombined.PurchaseDetails.DiscountAmount,
                              TaxAmount = itemCombined.PurchaseDetails.TaxAmount,
                              SalesPrice = itemCombined.PurchaseDetails.SalesPrice,
                              StockQty = stock.Balance

                          }

                      ).OrderBy(pd => pd.ExpireDate);

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

    }
}
