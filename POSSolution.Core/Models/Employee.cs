using POSSolution.Core.Common.Models;
using POSSolution.Core.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSSolution.Core.Models
{
    public class Employee : Identity
    {
        public Designation Designation { get; set; }
        public string profilePicture { get; set; }
    }
}
