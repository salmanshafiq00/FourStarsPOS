using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POSSolution.API.DTO
{
    public class ItemsWithoutImageDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string ItemCode { get; set; }

        public int CategoryId { get; set; }

        public int BrandId { get; set; }

        public int UnitId { get; set; }

        public string SKU { get; set; }

        public string Barcode { get; set; }

        public string Description { get; set; }

        public decimal ProfitMargin { get; set; }

        public string ImagePath { get; set; }

        public int DiscountId { get; set; }
    }
}
