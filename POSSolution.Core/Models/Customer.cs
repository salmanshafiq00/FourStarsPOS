using POSSolution.Core.Common.Models;

namespace POSSolution.Core.Models
{
    public class Customer : IdentityLocation
    {
        public string TaxNumber { get; set; }
        public decimal Balance { get; set; }
    }
}
