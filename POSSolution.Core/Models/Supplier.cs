using POSSolution.Core.Common.Models;

namespace POSSolution.Core.Models
{
    public class Supplier : IdentityLocation
    {
        public string VATNumber { get; set; }
        public decimal Balance { get; set; }

    }
}
