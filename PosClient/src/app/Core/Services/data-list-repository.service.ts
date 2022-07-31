import { Injectable } from '@angular/core';
import { Brand } from '../Models/brand.model';
import { Category } from '../Models/category.model';
import { City } from '../Models/city.model';
import { CompanyInfo } from '../Models/company-info.model';
import { Country } from '../Models/country.model';
import { Customer } from '../Models/customer.model';
import { Employee } from '../Models/employee.model';
import { Item } from '../Models/item.model';
import { PurchaseReturn } from '../Models/purchase-return.model';
import { Purchase } from '../Models/purchase.model';
import { Role } from '../Models/role.model';
import { Sales } from '../Models/sales.model';
import { SalesDiscountTax } from '../Models/salesDiscountTax.model';
import { State } from '../Models/state.model';
import { Supplier } from '../Models/supplier.model';
import { Unit } from '../Models/unit.model';
import { User } from '../Models/user.model';
import { ItemVM } from '../ViewModel/itemVM.model';
import { ItemWithPriceVM } from '../ViewModel/ItemWithPriceVM.model';
import { RestDataService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class DataListRepositoryService {
  constructor(private service: RestDataService) {

  }

  public emptyData = [];
  public baseUrl = 'http://localhost:5000/api/';
  public brandData: Brand[] = [];
  public cityData: City[] = [];
  public categoryData: Category[] =[];
  public companyData: CompanyInfo[] = [];
  public customerData: Customer[] = [];
  public countryData: Country[] = [];
  public discountData: SalesDiscountTax[] =[];
  public employeeData: Employee[] = [];
  public itemData: Item[] = [];
  public itemDataNoImages = [];
  public itemDataWithPrice = [];
  public purchaseData: Purchase[] = [];
  public purchaseReturnData: PurchaseReturn[] = [];
  public roleData: Role[] = [];
  public supplierData: Supplier[] = [];
  public stateData: State[] = [];
  public salesData: Sales[] = [];
  public unitData: Unit[] = [];
  public userData: User[] = [];


  public getRecords(entity: string): any[] {
    switch (entity) {
      case 'item':
        this.service.GetAll<Item>(this.baseUrl + entity).subscribe(res => {this.itemData = res});
        return this.itemData;
      case 'item/NoImages':
        this.service.GetAll<ItemVM>(this.baseUrl + entity).subscribe(res => {this.itemDataNoImages = res});
        return this.itemDataNoImages;
      case 'item/ItemWithPrice':
        this.service.GetAll<ItemWithPriceVM>(this.baseUrl + entity).subscribe(res => {this.itemDataWithPrice = res});
        return this.itemDataWithPrice;
      case 'customer':
        this.service.GetAll<Customer>(this.baseUrl + entity).subscribe(res => this.customerData = res);
        return this.customerData;
      case 'supplier':
        this.service.GetAll<Supplier>(this.baseUrl + entity).subscribe(res => this.supplierData = res);
        return this.supplierData;
      case 'user':
        this.service.GetAll<User>(this.baseUrl + entity).subscribe(res => this.userData = res);
        return this.userData;
      case 'employee':
        this.service.GetAll<Employee>(this.baseUrl + entity).subscribe(res => this.employeeData = res);
        return this.employeeData;
      case 'role':
        this.service.GetAll<Role>(this.baseUrl + entity).subscribe(res => this.roleData = res);
        return this.roleData;
      case 'brand':
        this.service.GetAll<Brand>(this.baseUrl + entity).subscribe(res => this.brandData = res);
        return this.brandData;
      case 'category':
        this.service.GetAll<Category>(this.baseUrl + entity).subscribe(res => this.categoryData = res);
        return this.categoryData;
      case 'unit':
        this.service.GetAll<Unit>(this.baseUrl + entity).subscribe(res => this.unitData = res);
        return this.unitData;
      case 'purchase':
        this.service.GetAll<Purchase>(this.baseUrl + entity).subscribe(res => this.purchaseData = res);
        return this.purchaseData;
      case 'purchaseReturnData':
        this.service.GetAll<PurchaseReturn>(this.baseUrl + entity).subscribe(res => this.purchaseReturnData = res);
        return this.purchaseReturnData;
      case 'country':
        this.service.GetAll<Country>(this.baseUrl + entity).subscribe(res => this.countryData = res);
        return this.countryData;
      case
        'state':
        this.service.GetAll<State>(this.baseUrl + entity).subscribe(res => this.stateData = res);
        return this.stateData;
      case
        'city':
        this.service.GetAll<City>(this.baseUrl + entity).subscribe(res => this.cityData = res);
        return this.cityData;
      case
        'sales':
        this.service.GetAll<Sales>(this.baseUrl + entity).subscribe(res => this.salesData = res);
        return this.salesData;
      case
        'companyinfo':
        this.service.GetAll<CompanyInfo>(this.baseUrl + entity).subscribe(res => {this.companyData = res});
        return this.companyData;
      default:
        return this.emptyData;
    }
  }
}
