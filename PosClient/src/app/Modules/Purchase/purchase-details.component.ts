import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/app/Core/Models/company-info.model';
import { Purchase } from 'src/app/Core/Models/purchase.model';
import { Supplier } from 'src/app/Core/Models/supplier.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';
import { ItemVM } from 'src/app/Core/ViewModel/itemVM.model';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseDetailsComponent implements OnInit {
  public purchaseInvoice: Purchase = new Purchase();
  public company: CompanyInfo = new CompanyInfo();
  public supplierInfo: Supplier = new Supplier();
  public routeData? = Number(location.pathname.split('/')[3]);

  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {
    this.getAllItem();
  }

  getItemName(id: number): string {
    if (this.repo.itemDataNoImages != null && id != undefined) {
      return this.repo.itemDataNoImages.find((e) => e.id == id).name;
    } else {
      return 'item not found';
    }
  }

  ngOnInit(): void {
    this.getCompanyInfo();
    this.getPurchaseInvoice();

  }

  private getPurchaseInvoice() {
    this.service
      .GetOne<Purchase>(this.url + 'purchase/' + this.routeData)
      .subscribe((res) => {
        if (res != undefined) {
          this.getSupplier(res.supplierId);
        }
        this.purchaseInvoice = res;
      });
  }

  private getCompanyInfo() {
    this.service
      .GetOne<CompanyInfo>(this.url + 'companyinfo/' + 1)
      .subscribe((res) => (this.company = res));
  }

  private getSupplier(id: number) {
    if (this.repo.supplierData.length == 0) {
      this.service
        .GetAll<Supplier>(this.url + 'supplier')
        .subscribe((res) => (this.supplierInfo = res.find((s) => s.id == id)));
    } else {
      this.supplierInfo = this.repo.supplierData.find((f) => f.id == id);
    }
  }
  private getAllItem() {
    if (this.repo.itemDataNoImages.length == 0) {
      this.service
        .GetAll<ItemVM>(this.url + 'item/NoImages')
        .subscribe(res => this.repo.itemDataNoImages = res);
    } 
  }
}
