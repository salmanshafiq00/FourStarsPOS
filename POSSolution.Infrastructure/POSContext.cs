using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using POSSolution.Core.Common.Models;
using POSSolution.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSSolution.Infrastructure
{
    public class POSContext : IdentityDbContext<IdentityUser>
    {
        public POSContext(DbContextOptions<POSContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<CompanyInfo> CompanyInfos { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<PurchaseDetails> PurchaseDetails { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<PurchaseReturn>  PurchaseReturns { get; set; }
        public DbSet<PurchaseReturnDetails>  PurchaseReturnDetails { get; set; }
        public DbSet<PurchasePayment> PurchasePayments { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<SalesDetails> SalesDetails { get; set; }
        public DbSet<Sales> Sales { get; set; }
        public DbSet<SalesDiscountTax>  SalesDiscountTaxes { get; set; }
        public DbSet<SalesReturn> SalesReturns { get; set; }
        public DbSet<SalesReturnDetails> SalesReturnDetails { get; set; }
        public DbSet<SalesPayment> SalesPayments { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<StockCount> StockCounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Purchase>().Property(p => p.GrandTotal).HasComputedColumnSql("[SubTotal]+[OtherCharges]");
            modelBuilder.Entity<PurchaseDetails>().Property(p => p.TotalAmount).HasComputedColumnSql("[UnitCost] * [Quantity]");
            modelBuilder.Entity<PurchaseDetails>().Property(p => p.SalesPrice).HasComputedColumnSql("[UnitCost]-[DiscountAmount]+[TaxAmount]+[ProfitAmount]");
            modelBuilder.Entity<StockCount>().Property(p => p.Balance).HasComputedColumnSql("[PurchaseQty]-[SalesQty]");
            modelBuilder.Entity<PurchaseReturn>().Property(p => p.GrandTotal).HasComputedColumnSql("[SubTotal]+[OtherCharges]");
            modelBuilder.Entity<PurchaseReturnDetails>().Property(p => p.TotalAmount).HasComputedColumnSql("[UnitCost] * [Quantity]");
            modelBuilder.Entity<Sales>().Property(p => p.GrandTotal).HasComputedColumnSql("[SubTotal]+[OtherCharges]");

            modelBuilder.Entity<SalesReturn>().Property(p => p.GrandTotal).HasComputedColumnSql("[SubTotal]+[OtherCharges]");


            modelBuilder.Entity<Brand>().HasData(new Brand { Id = 1, Name = "Samsung", Description = "GlobalBrand" }, new Brand { Id = 2, Name = "Apple", Description = "GlobalBrand" }, new Brand { Id = 3, Name = "Walton", Description = "GlobalBrand" });
            modelBuilder.Entity<Category>().HasData(new Category { Id = 1, Name = "Electronics", Description = "AllKindElectronics" }, new Category { Id = 2, Name = "Appliance", Description = "Home Appliance" }, new Category { Id = 3, Name = "Mobile", Description = "All mobile phones" });
            modelBuilder.Entity<Country>().HasData(new Country { Id = 1, Name = "Bangladesh" }, new Country { Id = 2, Name = "India" }, new Country { Id = 3, Name = "Pakistan" });
            modelBuilder.Entity<State>().HasData(new State { Id = 1, Name = "Dhaka", CountryId = 1 }, new State { Id = 2, Name = "Chittagong", CountryId = 1 }, new State { Id = 3, Name = "Sylhet", CountryId = 1 }, new State { Id = 4, Name = "UttarProdesh", CountryId = 2 }, new State { Id = 5, Name = "Karachi", CountryId = 3 });
            modelBuilder.Entity<City>().HasData(new City { Id = 1, Name = "Dhaka", StateId = 1 }, new City { Id = 2, Name = "Chittagong", StateId = 2 }, new City { Id = 3, Name = "Sylhet", StateId = 3 }, new City { Id = 4, Name = "Agra", StateId = 4 }, new City { Id = 5, Name = "Karachi City", StateId = 5 });
            modelBuilder.Entity<Unit>().HasData(new Unit { Id = 1, Name = "pcs", Description = "Pieces" }, new Unit { Id = 2, Name = "Kg", Description = "Killogram" }, new Unit { Id = 3, Name = "ltr", Description = "Litre" });
            modelBuilder.Entity<ExpenseCategory>().HasData(new ExpenseCategory { Id = 1, CategoryName = "Office supplies", Description = "pens, folders, disinfectant wipes, trash bags, and other cleaning supplies" }, new ExpenseCategory { Id = 2, CategoryName = "Utilities", Description = "costs of electricity, gas, water, air conditioning, and trash" }, new ExpenseCategory { Id = 3, CategoryName = "OfficeOperationCost", Description = "Salaries and other compensation, Rent, Maintenance and repairs, Employee benefit programs" });
            modelBuilder.Entity<SalesDiscountTax>().HasData(new SalesDiscountTax { Id = 1, IsPercentage = true, DiscountRate = Convert.ToDecimal(0.01) });
            modelBuilder.Entity<CompanyInfo>().HasData(new CompanyInfo { Id = 1, Name = "FourStart Pos Ltd", Phone = "25658-245", Mobile = 18254685, Email = "fourstart@gmail.com", VATNumber = "vt1001", TIN = "tin10005", CountryId = 1, StateId = 1, CityId = 1, PostCode = "Dhaka-1200", Address = "Panthopath", CompanyLogo = "//assets//Logo.PNG" });

            base.OnModelCreating(modelBuilder);
        }
    }
}
