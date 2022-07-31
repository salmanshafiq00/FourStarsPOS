using POSSolution.Core.Common.Models;
using POSSolution.Core.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace POSSolution.Core.Models
{
    public class PurchaseReturn : InvoiceHeader
    {

        public DateTime PurchaseReturnDate { get; set; }

        public PurchaseReturnStatus Status { get; set; }

        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }

        public virtual Purchase Purchase { get; set; }
        public virtual List<PurchaseReturnDetails> PurchaseReturnDetails { get;  set; }
       // public  virtual List<PurchasePayment> PurchasePayment { get; private set; } = new List<PurchasePayment>();
    }
}
