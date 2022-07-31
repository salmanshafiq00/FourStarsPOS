using System.ComponentModel.DataAnnotations.Schema;
using POSSolution.Core.Common.Models;

namespace POSSolution.Core.Models
{
    public class City : BaseModel
    {
        public string Name { get; set; }
        [ForeignKey("State")]
        public int StateId { get; set; }
        public virtual State State { get; set; }
    }
}
