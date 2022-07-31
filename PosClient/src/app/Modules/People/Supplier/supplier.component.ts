import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/Core/Models/supplier.model';
import { RestDataService } from 'src/app/Core/Services/rest.service';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  
  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {
 
  }
  updateLastAction(index: number, supplier: Supplier): number {
    return supplier.id;
  }

  deleteRow(id: number) {
    var record = this.repo.supplierData.find((w) => w.id == id);
    this.service
      .Delete<Supplier>(this.url + 'supplier/' + record.id)
      .subscribe((res) => {
        alert('Data deleted');
        this.repo.supplierData.splice(this.repo.supplierData.indexOf(record));
      });
  }

  ngOnInit(): void {
    this.getDataAll();
  }

  private getDataAll()  {
    if (this.repo.supplierData.length == 0) {
     this.repo.supplierData = this.repo.getRecords('supplier');
    }
    
  }
}
