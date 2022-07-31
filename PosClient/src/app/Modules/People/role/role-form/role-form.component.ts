import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/Core/Models/role.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

  constructor(private service : RestDataService, private repo: DataListRepositoryService, private route: Router) { }
  private url : string = "http://localhost:5000/api/";
  public routeData? = Number(location.pathname.split('/')[3]);
  formData : Role = new Role();

  getEdit() {

    if (this.routeData > 0) {

      this.formData = this.repo.roleData.find(f => f.id == this.routeData);
    }

  }


  submit(form : NgForm){
    if (form.valid) {
      if (this.routeData > 0) {
        this.service.Update<Role>(this.formData, this.url+"role/" + this.routeData).subscribe(res => {
          alert("Data updated");
          var index = this.repo.roleData.indexOf(this.formData);
          this.repo.roleData.splice(index, 1, res);
          this.route.navigateByUrl("role");
        })
      }else{
        this.service.Insert<Role>(this.formData, this.url+"role").subscribe(res => {
          alert("Data Inserted");
          this.repo.roleData.push(res);
        })
      }
    }

  }

  ngOnInit(): void {
    this.getEdit();
  }


}
