import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Core/Models/item.model';
import { Purchase } from 'src/app/Core/Models/purchase.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {

  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {
    this.getSupplierAll();

  }

  // updateLastAction(index: number, purchase: Purchase): number {
  //   return purchase.id;
  // }

  deleteRow(id: number) {
    var record = this.repo.purchaseData.find((w) => w.id == id);
    this.service
      .Delete<Item>(this.url + 'item/' + record.id)
      .subscribe((res) => {
        alert('Data deleted');
        this.repo.purchaseData.splice(this.repo.purchaseData.indexOf(record));
      });
  }

  getSupplierName(id: number): string {
    if (id != undefined) {      
      return this.repo.supplierData.find((s) => s.id == id).name;
    } else {
      return 'Supplier not found';
    }
  }

  ngOnInit(): void {
    this.getDataAll();
    this.getSupplierAll();
  }

  private getDataAll() {
    if (this.repo.purchaseData.length == 0) {
      this.service
        .GetAll<Purchase>(this.url + 'purchase')
        .subscribe((res) => (this.repo.purchaseData = res));
    }
  }

  private getSupplierAll() {
    if (this.repo.supplierData.length == 0) {
      this.repo.supplierData = this.repo.getRecords('supplier');
     }
  }
}
