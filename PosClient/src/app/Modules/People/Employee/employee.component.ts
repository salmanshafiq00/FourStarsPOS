import { Component, OnInit } from '@angular/core';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';
import {Employee} from 'src/app/Core/Models/employee.model'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  private url : string = "http://localhost:5000/api/";

  constructor(private service: RestDataService, public repo : DataListRepositoryService) { }

  updateLastAction(index: number, employee: Employee): number {
    return employee.id;
  }

  deleteRow(id : number){
    var record = this.repo.employeeData.find(e => e.id == id);
    this.service.Delete<Employee>(this.url + "employee/" + record.id).subscribe(res => {
      this.repo.employeeData.splice(this.repo.employeeData.indexOf(record));
      alert("Data Deleted Successfully");
    });
  }

  ngOnInit(): void {
    this.getAllData();    
  }

  private getAllData() {
    if(this.repo.employeeData.length == 0){
      this.repo.employeeData = this.repo.getRecords("employee");
    }
  }
}
