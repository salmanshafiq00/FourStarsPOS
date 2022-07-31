using POSSolution.Core.Common.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace POSSolution.Core.Models
{
    public class Expense : BaseModel
    {
        public DateTime ExpenseDate { get; set; }

        [ForeignKey ("ExpenseCategory")]
        public int ExpenseCategoryId { get; set; }

        public string ExpenseFor { get; set; }

        [DataType(DataType.Currency), Column(TypeName = "money")]
        public decimal Amount { get; set; }

        public string ReferenceNo { get; set; }

        public string Note { get; set; }

        public virtual ExpenseCategory ExpenseCategory { get; set; }
    }

}
