using POSSolution.Core.Common.Models;
using POSSolution.Core.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POSSolution.Core.Models
{
   public class Sales : InvoiceHeader
    {
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        public SalesStatus Status { get; set; }

        public DateTime SalesDate { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual List<SalesDetails> SalesDetails { get; set; }
        public virtual List<SalesPayment> SalesPayments { get; set; }

    }
}
