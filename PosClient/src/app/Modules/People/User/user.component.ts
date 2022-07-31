import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Core/Models/user.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: RestDataService, public repo : DataListRepositoryService) { }

  private url : string = "http://localhost:5000/api/";
  ngOnInit(): void {
    if(this.repo.userData == undefined){
      this.repo.userData = this.getAllData();
    }
  }

  getAllData() : User[]{
    return this.repo.getRecords("user");
  }

  deleteRow(id : number){
    var record = this.repo.userData.find(e => e.id == id);
    this.service.Delete<User>(this.url + "user/" + record.id).subscribe(res => {
      alert("Data Deleted Successfull");
    });
    this.repo.userData.splice(this.repo.userData.indexOf(record));
  }

  
}
