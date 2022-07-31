import { Component, OnInit } from '@angular/core';
import { PurchaseReturn } from 'src/app/Core/Models/purchase-return.model';
import { Purchase } from 'src/app/Core/Models/purchase.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';
import { ItemVM } from 'src/app/Core/ViewModel/itemVM.model';

@Component({
  selector: 'app-purchasereturn',
  templateUrl: './purchasereturn.component.html',
  styleUrls: ['./purchasereturn.component.css']
})
export class PurchaseReturnComponent implements OnInit {

  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {
    this.getDataAll();
    this.getPurchaseAll();
   

  }

  // updateLastAction(index: number, purchase: Purchase): number {
  //   return purchase.id;
  // }

  deleteRow(id: number) {
    var record = this.repo.purchaseReturnData.find((w) => w.id == id);
    this.service
      .Delete<PurchaseReturn>(this.url + 'purchaseReturn/' + record.id)
      .subscribe((res) => {
        alert('Data deleted');
        this.repo.purchaseReturnData.splice(this.repo.purchaseReturnData.indexOf(record));
      });
  }

  
  getSupplierName(): string {
    let supplierName;
    for (let index = 0; index < this.repo.purchaseReturnData.length; index++) {
      let singleSupplierId = this.repo.purchaseData.find(pd => pd.id == this.repo.purchaseReturnData[index].purchaseId).supplierId;
       if (singleSupplierId != undefined) {      
        supplierName =  this.repo.supplierData.find((s) => s.id == singleSupplierId).name;
       } else {
         return 'Supplier not found';

       }
            
     }
     return supplierName;
  }

  ngOnInit(): void {
    this.getSupplierAll();
    this.getItemAll();

  }

  private getDataAll() {
    if (this.repo.purchaseReturnData.length == 0) {
      this.service
        .GetAll<PurchaseReturn>(this.url + 'purchaseReturn')
        .subscribe(res => this.repo.purchaseReturnData = res);
    }
  }

  private getPurchaseAll() {
    if (this.repo.purchaseData.length == 0) {
      this.service
        .GetAll<Purchase>(this.url + 'purchase')
        .subscribe(res => this.repo.purchaseData = res);
    }
  }

  private getSupplierAll() {
    if (this.repo.supplierData.length == 0) {
      this.repo.supplierData = this.repo.getRecords('supplier');
     }
  }

  private getItemAll() {
    if (this.repo.itemDataNoImages.length == 0) {
      this.service
        .GetAll<ItemVM>(this.url + 'item/NoImages')
        .subscribe(res => this.repo.itemDataNoImages = res);
    } 
  }
}
