using POSSolution.Core.Common.Models;
using POSSolution.Core.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSSolution.Core.Models
{
    public class SalesReturn : InvoiceHeader
    {
        [ForeignKey("Customer")]
        public int? CustomerId { get; set; }
        public SalesReturnStatus Status { get; set; }

        public DateTime SalesReturnDate { get; set; }

        [ForeignKey("Sales")]
        public int SalesId { get; set; }

        public virtual List<SalesReturnDetails> SalesReturnDetails { get; set; }
        public virtual List<SalesPayment> SalesPayments { get; set; }
        public virtual Sales Sales { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
