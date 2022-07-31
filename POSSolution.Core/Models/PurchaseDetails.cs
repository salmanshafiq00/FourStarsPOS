using POSSolution.Core.Common.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POSSolution.Core.Models
{
    public class PurchaseDetails : BaseModel
    {
        [ForeignKey("Item")]
        public int ItemId { get; set; }

        public decimal Quantity { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal UnitCost { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal DiscountAmount { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TaxAmount { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal ProfitAmount { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal SalesPrice { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
         public decimal TotalAmount { get; set; }

        public decimal SoldQty { get; set; }

        public DateTime ExpireDate { get; set; }

        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }
       
        public virtual Item Item { get; set; }
        public virtual Purchase Purchase { get; set; }

    }
}
