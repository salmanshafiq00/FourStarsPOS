using POSSolution.Core.Common.Models;
using System.Collections.Generic;


namespace POSSolution.Core.Models
{
    public class ExpenseCategory : BaseModel
    {
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public virtual List<Expense> Expenses { get; set; }
    }
}
