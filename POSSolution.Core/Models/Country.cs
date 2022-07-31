using System.Collections.Generic;
using POSSolution.Core.Common.Models;

namespace POSSolution.Core.Models
{
   public class Country : BaseModel
    {
        public string Name { get; set; }
        public virtual List<State>  States { get; set; }
    }
}
