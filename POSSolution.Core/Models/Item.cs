using POSSolution.Core.Common.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace POSSolution.Core.Models
{
    public class Item : BaseModel
    {
        public string Name { get; set; }

        public string ItemCode { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        [ForeignKey("Brand")]
        public int BrandId { get; set; }
       
        [ForeignKey("Unit")]
        public int UnitId { get; set; }

        public string SKU { get; set; }

        public string Barcode { get; set; }

        public string Description { get; set; }

        public decimal ProfitMargin { get; set; }

        public string ImagePath { get; set; }

        [ForeignKey("SalesDiscountTax")]
        public int DiscountId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Brand Brand { get; set; }
        public virtual Unit Unit { get; set; }
        public virtual SalesDiscountTax SalesDiscountTax { get; set; }
        public virtual List<SalesDetails> SalesDetails { get; set; }

    }
}
