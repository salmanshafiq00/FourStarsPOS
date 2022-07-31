using POSSolution.Core.Models;
using System.Collections.Generic;


namespace POSSolution.Core.Common.Models
{
    public class ItemIdentity : BaseModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Item> Items { get; set; }
    }
}
