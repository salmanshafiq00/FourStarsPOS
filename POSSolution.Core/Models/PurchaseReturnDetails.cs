using POSSolution.Core.Common.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POSSolution.Core.Models
{
   public class PurchaseReturnDetails : BaseModel
    {
        [ForeignKey("Item")]
        public int ItemId { get; set; }


        public decimal Quantity { get; set; }

        //public DateTime ExpireDate { get; set; } // todo

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal UnitCost { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal TotalAmount { get; set; }

        [ForeignKey("PurchaseReturn")]
        public int PurchaseReturnId { get; set; }

        public virtual PurchaseReturn PurchaseReturn { get; set; }
        public virtual Item Item { get; set; }

    }
}
