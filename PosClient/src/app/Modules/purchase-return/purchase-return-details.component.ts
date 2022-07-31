import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/app/Core/Models/company-info.model';
import { PurchaseReturn } from 'src/app/Core/Models/purchase-return.model';
import { Purchase } from 'src/app/Core/Models/purchase.model';
import { Supplier } from 'src/app/Core/Models/supplier.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';
import { ItemVM } from 'src/app/Core/ViewModel/itemVM.model';

@Component({
  selector: 'app-purchase-return-details',
  templateUrl: './purchase-return-details.component.html',
})
export class PurchaseReturnDetailsComponent implements OnInit {
  public purchaseReturnInvoice: PurchaseReturn = new PurchaseReturn();
  public company: CompanyInfo = new CompanyInfo();
  public supplierInfo: Supplier = new Supplier();
  public routeData? = Number(location.pathname.split('/')[3]);
  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {
    this.getAllSuppliers();
    this.getAllPurchase();
  }

  getItemName(id: number): string {
    if (this.repo.itemDataNoImages != undefined && id != undefined) {
      return this.repo.itemDataNoImages.find((e) => e.id == id).name;
    } else {
      return 'item';
    }
  }

  ngOnInit(): void {

    this.getItemAll();
    this.getCompanyInfo();
    this.getReturnPurchaseInvoice();
  }

  private getReturnPurchaseInvoice() {
    this.service
      .GetOne<PurchaseReturn>(this.url + 'purchaseReturn/' + this.routeData)
      .subscribe((res) => {
        this.purchaseReturnInvoice = res;
        
        this.getSupplier(
          this.repo.purchaseData.find((p) => p.id == res.purchaseId).supplierId
        );
      });
  }

  private getCompanyInfo() {
    this.service
      .GetOne<CompanyInfo>(this.url + 'companyinfo/' + 1)
      .subscribe((res) => (this.company = res));
  }

  private getSupplier(id: number) {

      this.supplierInfo = this.repo.supplierData.find((f) => f.id == id);

  }

  private getItemAll() {
    if (this.repo.itemDataNoImages.length == 0) {
      this.service
        .GetAll<ItemVM>(this.url + 'item/NoImages')
        .subscribe(res => this.repo.itemDataNoImages = res);
    } 
  }

  private getAllSuppliers() {
    if (this.repo.supplierData.length == 0) {
      this.service
        .GetAll<Supplier>(this.url + 'supplier')
        .subscribe((res) => (this.repo.supplierData = res));
    }
  }

  private getAllPurchase() {
    if (this.repo.purchaseData.length == 0) {
      this.service
        .GetAll<Purchase>(this.url + 'purchase')
        .subscribe((res) => (this.repo.purchaseData = res));
    }
  }
}
