using POSSolution.Core.Common.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace POSSolution.Core.Models
{
   public class SalesDetails : BaseModel
    {
        public decimal SalesQty { get; set; }


        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal TotalAmount { get; set; }


        [ForeignKey("Sales")]
        public int SalesId { get; set; }

        [ForeignKey("Item")]
        public int ItemId { get; set; }

        public virtual Sales Sales { get; set; }
        public virtual Item Item { get; set; }


    }
}
