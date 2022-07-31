import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/Core/Models/unit.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  private url: string = "http://localhost:5000/api/";

  constructor(private service: RestDataService, public repo : DataListRepositoryService,) {

  }

  updateLastAction(index: number, unit: Unit): number {
    return unit.id;
  }

  deleteRow(id: number) {
    var record = this.repo.unitData.find(w => w.id == id);
    this.service.Delete<Unit>(this.url + "unit/" + record.id).subscribe(res => {
      alert("Data deleted");
      this.repo.unitData.splice(this.repo.unitData.indexOf(record));
    });
  }

  ngOnInit(): void {
     this.getDataAll();
  }

 private getDataAll() {
    if (this.repo.unitData.length == 0) {
      this.repo.unitData =  this.repo.getRecords("unit");
    } 
  }

}
