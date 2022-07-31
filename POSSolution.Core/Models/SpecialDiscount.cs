using POSSolution.Core.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSSolution.Core.Models
{
    public class SpecialDiscount : BaseModel
    {
        public string DiscountName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        // public bool IsActive { get; set; } = false;
    }
}
