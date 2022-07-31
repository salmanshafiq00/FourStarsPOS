using POSSolution.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSSolution.Core.Common.Models
{
    public class InvoiceBody : BaseModel
    {
        public int Quantity { get; set; }
        [ForeignKey("Item")]
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public DateTime ExpireDate { get; set; }
    }
}
