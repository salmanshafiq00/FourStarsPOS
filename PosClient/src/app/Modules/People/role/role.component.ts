import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/Core/Models/role.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  private url: string = "http://localhost:5000/api/";

  constructor(private service: RestDataService, public repo : DataListRepositoryService,) {

    if (this.repo.roleData ==undefined) {
        this.repo.roleData =  this.getDataAll();
    }
  }

  ngOnInit(): void {
  }

  getDataAll(): Role[] {
     return  this.repo.getRecords("role");
  }

  deleteRow(id: number) {
    var record = this.repo.roleData.find(w => w.id == id);
    this.service.Delete<Role>(this.url + "role/" + record.id).subscribe(res => {
      alert("Data deleted");
      this.repo.roleData.splice(this.repo.roleData.indexOf(res));
    });
  }
}
