using POSSolution.Core.Common.Models;

namespace POSSolution.Core.Models
{
   public  class CompanyInfo: IdentityLocation
    {
        public string VATNumber { get; set; }
        public string TIN { get; set; }
        public string CompanyLogo { get; set; }
    }
}
