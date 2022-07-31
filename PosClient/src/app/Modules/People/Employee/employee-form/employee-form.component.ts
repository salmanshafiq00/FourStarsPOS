import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Designation } from 'src/app/Core/Enums/designation.enum';
import { Employee } from 'src/app/Core/Models/employee.model';
import { Role } from 'src/app/Core/Models/role.model';
import { User } from 'src/app/Core/Models/user.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  
  public routeParam? = Number(location.pathname.split('/')[3]);
  public formData : Employee = new Employee();
  public sampleImage : string = "\\assets\\avatar5.png";
  public imagePlaceHolder : string;
  public designEnum = [];


  public buttonMode : string = "Save";
  
  private url : string = "http://localhost:5000/api/";

  constructor(private repo : DataListRepositoryService, private route : Router, private service : RestDataService) {
    this.designEnum = Object.keys(Designation).filter((key) => isNaN(+key));

  }
  
  getEdit() {
    if (this.routeParam > 0) {
      if (this.repo.employeeData.find(f => f.id == this.routeParam) == undefined) {   
        this.formData = new Employee();
        this.imagePlaceHolder = this.sampleImage;
      }
      else{
        this.formData = this.repo.employeeData.find(f => f.id == this.routeParam);
        this.imagePlaceHolder = this.formData.profilePicture;
      }
      this.buttonMode = "Update";
    }
  }
  
    submit(form : NgForm){
      if(form.valid){
        if(this.routeParam > 0){
          this.formData.id = this.routeParam;
          this.formData.profilePicture = this.imagePlaceHolder;
          this.service.Update<Employee>(this.formData, this.url + "employee/" + this.routeParam).subscribe(res=>{
            alert("Data Updated");
            var index = this.repo.employeeData.indexOf(this.formData);
            this.repo.employeeData.splice(index, 1, this.formData);
            this.route.navigateByUrl("employee");
          })
        }
        else{          
          this.formData.id = 0;          
          this.service.Insert<Employee>(this.formData, this.url + "employee").subscribe(res => {
            alert("Data Inserted");
            this.repo.employeeData.push(res);            
            form.reset();
            this.imagePlaceHolder = this.sampleImage;
          });
        }
      }
    }
  
    onChange(event : any){
  
      if(event.target.files && event.target.files[0]){
        const reader = new FileReader();
        reader.onload = (e : any) => {
          this.formData.profilePicture = e.target.result;
          this.imagePlaceHolder = e.target.result;
        };
  
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  
    ngOnInit(): void {
      this.imagePlaceHolder = this.sampleImage;
      this.getEdit();
    }
  
  }
  


