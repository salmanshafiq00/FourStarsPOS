using POSSolution.Core.Common.Models;
using System.ComponentModel.DataAnnotations.Schema;


namespace POSSolution.Core.Models
{
    public class SalesPayment : Payment
    {
        [ForeignKey("Sales")]
        public int SalesId { get; set; }
        public virtual Sales Sales { get; set; }
    }
}
