import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/Core/Models/role.model';
import { User } from 'src/app/Core/Models/user.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private repo : DataListRepositoryService, private route : Router, private service : RestDataService) { this.getAllRole(); }

  private url : string = "http://localhost:5000/api/";
  public routeParam? = Number(location.pathname.split('/')[3]);
  public formData : User = new User();
  public roleData : Role[];
  ngOnInit(): void {
    this.getDataToUpdate();
  }

  getDataToUpdate(){
    if(this.routeParam > 0){
      this.formData = this.repo.userData.find(e => e.id == this.routeParam);
    }
  }

  submit(form : NgForm){
    if(form.valid){
      if(this.routeParam > 0){
        this.service.Update<User>(this.formData, this.url + "supplier/" + this.routeParam).subscribe(res=>{
          alert("Data Updated");
          var index = this.repo.userData.indexOf(this.formData);
          this.repo.userData.splice(index, 1, this.formData);
          this.route.navigateByUrl("user");
        })
      }
      else{
        
        this.formData.profilePicture = (this.formData.profilePicture);
        this.service.Insert<User>(this.formData, this.url + "user").subscribe(res => {
          console.log(this.formData);
          alert("Data Inserted");
          this.repo.userData.push(res);
          
        });
      }
    }
  }

  onChange(event : any){

    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e : any) => {
        this.formData.profilePicture = e.target.result;
        this.userImage = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getAllRole(){
    this.service.GetAll<Role>("http://localhost:5000/api/role").subscribe(res => this.roleData = res);
  }

  userImage : string = "\\assets\\avatar5.png";

}
