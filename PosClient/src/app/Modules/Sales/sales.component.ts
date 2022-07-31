import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Core/Models/item.model';
import { Sales } from 'src/app/Core/Models/sales.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {
    this.getCustomerAll();

  }

  // updateLastAction(index: number, purchase: Purchase): number {
  //   return purchase.id;
  // }

  deleteRow(id: number) {
    var record = this.repo.salesData.find((w) => w.id == id);
    this.service
      .Delete<Item>(this.url + 'item/' + record.id)
      .subscribe((res) => {
        alert('Data deleted');
        this.repo.salesData.splice(this.repo.salesData.indexOf(record));
      });
  }

  getCustomerName(id: number): string {
    if (id != undefined) {      
      return this.repo.customerData.find((s) => s.id == id).name;
    } else {
      return 'Customer not found';
    }
  }

  ngOnInit(): void {
    this.getDataAll();
    this.getCustomerAll();
  }

  private getDataAll() {
    if (this.repo.salesData.length == 0) {
      this.service
        .GetAll<Sales>(this.url + 'sales')
        .subscribe((res) => (this.repo.salesData = res));
    }
  }

  private getCustomerAll() {
    if (this.repo.customerData.length == 0) {
      this.repo.customerData = this.repo.getRecords('customer');
     }
  }
}