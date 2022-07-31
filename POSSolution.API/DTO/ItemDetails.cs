using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POSSolution.API.DTO
{
    public class ItemDetails
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal SalesPrice { get; set; }
        public decimal StockQty { get; set; }
    }
}
