using POSSolution.Core.Common.Enum;
using System;

namespace POSSolution.Core.Common.Models
{
    public class Payment : BaseModel
    {
        public PaymentType PaymentType { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public decimal DueAmount { get; set; }
        public string PaymentNote { get; set; }
    }
}
