import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Core/Models/customer.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private url: string = "http://localhost:5000/api/";

  constructor(private service: RestDataService, public repo : DataListRepositoryService,) {
    
   
  }
  updateLastAction(index: number, customer: Customer): number {
    return customer.id;
  }

  deleteRow(id: number) {
    var record = this.repo.customerData.find(w => w.id == id);
    this.service.Delete<Customer>(this.url + "customer/" + record.id).subscribe(res => {
      alert("Data deleted");
      this.repo.customerData.splice(this.repo.customerData.indexOf(record));
    });
  }


  ngOnInit(): void {
    this.getDataAll();
  }

  private getDataAll(){
    if (this.repo.customerData.length == 0) {
      this.repo.customerData =  this.repo.getRecords("customer");
  }

  }


}
