import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/Core/Models/brand.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  public buttonMode : string = "Save";
  public routeData? = Number(location.pathname.split('/')[3]);
  public formData : Brand = new Brand();
  private url : string = "http://localhost:5000/api/";

  constructor(private service : RestDataService, private repo: DataListRepositoryService, private route: Router) { }

  getEdit() {

    if (this.routeData > 0) {
      if (this.repo.brandData.find(f => f.id == this.routeData) == undefined) {
        this.formData = new Brand();
      }
      else{
        this.formData = this.repo.brandData.find(f => f.id == this.routeData);
      
      }
      this.buttonMode = "Update";
    }

  }


  submit(form : NgForm){
    if (form.valid) {
      if (this.routeData > 0) {
        this.formData.id = this.routeData;
        this.service.Update<Brand>(this.formData, this.url+"brand/" + this.routeData).subscribe(res => {
          alert("Data updated");
          var index = this.repo.brandData.indexOf(this.formData);
          this.repo.brandData.splice(index, 1, this.formData);
          this.route.navigateByUrl("brand");
        })
      }else{
        this.formData.id = 0;
        this.service.Insert<Brand>(this.formData, this.url+"brand").subscribe(res => {
          alert("Data Inserted");
          this.repo.brandData.push(res);
          form.reset();
        })
      }
    }

  }

  ngOnInit(): void {
    this.getEdit();
  }

}
