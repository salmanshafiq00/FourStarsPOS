using POSSolution.Core.Common.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace POSSolution.Core.Models
{
    public class User : Identity
    {
        public string Password { get; set; }
        [ForeignKey("Role")]
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public string ProfilePicture { get; set; }
    }
}
