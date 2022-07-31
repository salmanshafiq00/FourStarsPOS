using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using POSSolution.Core.Common.Models;

namespace POSSolution.Core.Models
{
   public class State : BaseModel
    {
        public string Name { get; set; }
        [ForeignKey("Country")]
        public int CountryId { get; set; }
        public Country Country { get; set; }
        public List<City> Cities { get; set; }

    }
}
