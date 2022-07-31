using POSSolution.Core.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSSolution.Core.Models
{
    public class SalesDiscountTax : BaseModel
    {
        public bool IsPercentage { get; set; }
        public decimal DiscountRate { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxRate { get; set; }
        public virtual List<Item> Item { get; set; }
    }
}
