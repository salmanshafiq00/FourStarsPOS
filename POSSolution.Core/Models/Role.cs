using POSSolution.Core.Common.Models;
using System.Collections.Generic;


namespace POSSolution.Core.Models
{
   public class Role : BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<User> Users { get; set; }
    }
}
