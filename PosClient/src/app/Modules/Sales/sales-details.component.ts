import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/app/Core/Models/company-info.model';
import { Customer } from 'src/app/Core/Models/customer.model';
import { Sales } from 'src/app/Core/Models/sales.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';
import { ItemWithPriceVM } from 'src/app/Core/ViewModel/ItemWithPriceVM.model';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html'
})
export class SalesDetailsComponent implements OnInit {

  public salesInvoice: Sales = new Sales();
  public company: CompanyInfo = new CompanyInfo();
  public customerInfo: Customer = new Customer();
  public routeData? = Number(location.pathname.split('/')[2]);

  private url: string = 'http://localhost:5000/api/';

  constructor(private service: RestDataService,
    public repo: DataListRepositoryService) { 
    this.getCompanyInfo();
    this.getAllItemWithPrice();
  }

  getItemName(id: number): string {
    
    if ( id != undefined) {      
      return this.repo.itemDataWithPrice.find((e) => e.itemId == id).itemName;
    } else {
      return 'item not found';
    }
  }

  ngOnInit(): void {
    this.getSalesInvoice();
  }

  private getSalesInvoice() {
    this.service
      .GetOne<Sales>(this.url + 'sales/' + this.routeData)
      .subscribe((res) => {
        if (res != undefined) {
          this.getCustomer(res.customerId);
        }
        this.salesInvoice = res;
      });
  }

  private getCompanyInfo() {
    this.service
      .GetOne<CompanyInfo>(this.url + 'companyinfo/' + 2)
      .subscribe((res) => (this.company = res));
  }

  private getAllItemWithPrice() {
    if (this.repo.itemDataWithPrice.length == 0) {
      this.service
        .GetAll<ItemWithPriceVM>(this.url + 'item/ItemWithPrice')
        .subscribe(res => {this.repo.itemDataWithPrice = res});
    } 
  }

  
  private getCustomer(id: number) {
    if (this.repo.customerData.length == 0) {
      this.service
        .GetAll<Customer>(this.url + 'customer')
        .subscribe((res) => (this.customerInfo = res.find((s) => s.id == id)));
    } else {
      this.customerInfo = this.repo.customerData.find((f) => f.id == id);
    }
  }

}
