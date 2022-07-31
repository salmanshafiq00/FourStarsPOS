import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyFormComponent } from './Modules/Company/company-form/company-form.component';
import { CompanyComponent } from './Modules/Company/company.component';
import { CityFormComponent } from './Modules/Location/City/city-form/city-form.component';
import { CityComponent } from './Modules/Location/City/city.component';
import { CountryFormComponent } from './Modules/Location/Country/country-form/country-form.component';
import { CountryComponent } from './Modules/Location/Country/country.component';
import { StateFormComponent } from './Modules/Location/State/state-form/state-form.component';
import { StateComponent } from './Modules/Location/State/state.component';
import { CustomerFormComponent } from './Modules/People/Customer/customer-form/customer-form.component';
import { CustomerComponent } from './Modules/People/Customer/customer.component';
import { EmployeeFormComponent } from './Modules/People/Employee/employee-form/employee-form.component';
import { EmployeeComponent } from './Modules/People/Employee/employee.component';
import { RoleFormComponent } from './Modules/People/role/role-form/role-form.component';
import { RoleComponent } from './Modules/People/role/role.component';
import { SupplierFormComponent } from './Modules/People/Supplier/supplier-form/supplier-form.component';
import { SupplierComponent } from './Modules/People/Supplier/supplier.component';
import { UserFormComponent } from './Modules/People/User/user-form/user-form.component';
import { UserComponent } from './Modules/People/User/user.component';
import { PosComponent } from './Modules/Pos/pos.component';
import { BrandFormComponent } from './Modules/Product/brand/brand-form/brand-form.component';
import { BrandComponent } from './Modules/Product/brand/brand.component';
import { CategoryFormComponent } from './Modules/Product/category/category-form/category-form.component';
import { CategoryComponent } from './Modules/Product/category/category.component';
import { ItemFormComponent } from './Modules/Product/item/item-form/item-form.component';
import { ItemComponent } from './Modules/Product/item/item.component';
import { UnitFormComponent } from './Modules/Product/unit/unit-form/unit-form.component';
import { UnitComponent } from './Modules/Product/unit/unit.component';
import { PurchaseDetailsComponent } from './Modules/Purchase/purchase-details.component';
import { PurchaseFormComponent } from './Modules/Purchase/purchase-form/purchase-form.component';
import { PurchaseComponent } from './Modules/Purchase/purchase.component';
import { SalesFormComponent } from './Modules/Sales/sales-form/sales-form.component';
import { SalesComponent } from './Modules/Sales/sales.component';


import { ErrorComponent } from './Shared/layout/error/error.component';
import { LayoutComponent } from './Shared/layout/layout.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './Shared/guard/auth-guard';
import { LoginComponent } from './Shared/authentication/login/login-component';
import { RegisterComponent } from './Shared/authentication/Register/register-component';
import { ReportComponent } from './Modules/report/report.component';
import { SalesReturnComponent } from './Modules/sales-return/sales-return.component';
import { SalesReturnFormComponent } from './Modules/sales-return/sales-return-form/sales-return-form.component';
import { PurchaseReturnComponent } from './Modules/purchase-return/purchasereturn.component';
import { PurchaseReturnFormComponent } from './Modules/purchase-return/purchase-return-form/purchase-return-form.component';
import { PurchaseReturnDetails } from './Core/Models/purchase-return-details.model';
import { PurchaseReturnDetailsComponent } from './Modules/purchase-return/purchase-return-details.component';
import { SalesDetailsComponent } from './Modules/Sales/sales-details.component';



const routes: Routes = [
  {path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {path: "", component: DashboardComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "purchase", component: PurchaseComponent}, 
    {path: "purchase/form", component:PurchaseFormComponent},
    {path: "purchase/form/:id", component:PurchaseFormComponent},
    {path: "purchase/details/:id", component:PurchaseDetailsComponent},
    {path: "purchase_return", component: PurchaseReturnComponent},
    {path: "purchase_return/details/:id", component: PurchaseReturnDetailsComponent},
    {path: "purchase/:id/return/form", component: PurchaseReturnFormComponent},
    {path: "purchase/:id/return/edit/:id", component: PurchaseReturnFormComponent},
  
    {path: "item", component: ItemComponent},
    {path: "item/form", component: ItemFormComponent },
    {path: "item/form/:id", component: ItemFormComponent },
    {path: "category", component: CategoryComponent},
    {path: "category/form", component: CategoryFormComponent },
    {path: "category/form/:id", component: CategoryFormComponent },
    {path: "brand", component: BrandComponent},
    {path: "brand/form", component: BrandFormComponent },
    {path: "brand/form/:id", component: BrandFormComponent },
    {path: "unit", component: UnitComponent},
    {path: "unit/form", component: UnitFormComponent }, 
    {path: "unit/form/:id", component: UnitFormComponent }, 
    {path: "sales", component: SalesComponent }, 
    {path: "sales/form", component: SalesFormComponent }, 
    {path: "sales/form/:id", component: SalesFormComponent }, 
    {path: "sales_details/:id", component: SalesDetailsComponent }, 
    {path: "sales/return", component: SalesReturnComponent }, 
    {path: "sales/return/form", component: SalesReturnFormComponent }, 
    {path: "sales/return/form/:id", component: SalesReturnFormComponent }, 
  
    {path: "country", component: CountryComponent }, 
    {path: "country/form", component: CountryFormComponent }, 
    {path: "country/form/:id", component: CountryFormComponent }, 
    {path: "state", component: StateComponent }, 
    {path: "state/form", component: StateFormComponent }, 
    {path: "state/form/:id", component: StateFormComponent }, 
    {path: "city", component: CityComponent }, 
    {path: "city/form", component: CityFormComponent }, 
    {path: "city/form/:id", component: CityFormComponent }, 
    {path: "company", component: CompanyComponent }, 
    {path: "company/form", component: CompanyFormComponent },
    {path: "company/form/:id", component: CompanyFormComponent },
  
    {path: "supplier", component: SupplierComponent }, 
    {path: "supplier/form", component: SupplierFormComponent },
    {path: "supplier/form/:id", component: SupplierFormComponent },
    {path: "customer", component: CustomerComponent }, 
    {path: "customer/form", component: CustomerFormComponent },
    {path: "customer/form/:id", component: CustomerFormComponent },
  
    {path: "employee", component: EmployeeComponent }, 
    {path: "employee/form", component: EmployeeFormComponent }, 
    {path: "employee/form/:id", component: EmployeeFormComponent }, 
    {path: "user", component: UserComponent }, 
    {path: "user/form", component: UserFormComponent }, 
    {path: "user/form/:id", component: UserFormComponent }, 
    {path: "role", component: RoleComponent }, 
    {path: "role/form", component: RoleFormComponent },
    {path: "role/form/:id", component: RoleFormComponent },
    {path: "report", component: ReportComponent }
  ]},

  
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "pos", component: PosComponent, canActivate: [AuthGuard]},
  {path: "**", component: ErrorComponent}
];

//function is use to get jwt token from local storage
export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  imports: [RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7299"],
        disallowedRoutes: []
      }
    }),
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
