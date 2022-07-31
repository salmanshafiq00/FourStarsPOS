using POSSolution.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace POSSolution.Core.Common.Models
{
    public class IdentityLocation : Identity
    {
        [ForeignKey("Country")]
        public int? CountryId { get; set; }
        public Country Country { get; set; }

        [ForeignKey("State")]
        public int? StateId { get; set; }
        public State State { get; set; }

        [ForeignKey("City")]
        public int? CityId { get; set; }
        public City City { get; set; }
        public string PostCode { get; set; }
        public string Address { get; set; }
    }
}
