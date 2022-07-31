using POSSolution.Core.Common.Models;
using POSSolution.Core.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace POSSolution.Core.Models
{
    public class Purchase : InvoiceHeader
    {
        [ForeignKey("Supplier")]
        public int SupplierId { get; set; }

        public DateTime PurchaseDate { get; set; }

        public PurchaseStatus Status { get; set; }

        public virtual Supplier Supplier { get; set; }
        public virtual List<PurchaseDetails> PurchaseDetails { get;  set; }
        //public virtual List<PurchasePayment> PurchasePayment { get;  set; }
    }
}
