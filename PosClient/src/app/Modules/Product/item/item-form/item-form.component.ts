import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/Core/Models/brand.model';
import { Category } from 'src/app/Core/Models/category.model';
import { Item } from 'src/app/Core/Models/item.model';
import { SalesDiscountTax } from 'src/app/Core/Models/salesDiscountTax.model';
import { Unit } from 'src/app/Core/Models/unit.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  public routeData?= Number(location.pathname.split('/')[3]);
  public formData: Item = new Item();
  public sampleImage : string = "\\assets\\product.jpg";
  public imagePlaceHolder : string;
  public buttonMode : string = "Save";

  private url: string = "http://localhost:5000/api/";

  constructor(private service: RestDataService, public repo: DataListRepositoryService, private route: Router) { }
 
  
  getEdit() {
    if (this.routeData > 0) {
      if (this.repo.itemData.find(f => f.id == this.routeData) == undefined) {   
        this.formData = new Item();
        this.imagePlaceHolder = this.sampleImage;
      }
      else{
        this.formData = this.repo.itemData.find(f => f.id == this.routeData);
        this.formData.profitMargin = this.repo.itemData.find(f => f.id == this.routeData).profitMargin * 100;
        this.imagePlaceHolder = this.formData.imagePath;
      }
      this.buttonMode = "Update";
    }
  }

  submit(form: NgForm) {
    if (form.valid) {
      console.log(this.formData);
      
      if (this.routeData > 0) {
        this.formData.imagePath = this.imagePlaceHolder;
        this.formData.id = this.routeData;
        this.service.Update<Item>(this.formData, this.url + "item/" + this.routeData).subscribe(res => {
          alert("Data updated");
          var index = this.repo.itemData.indexOf(this.formData);
          this.repo.itemData.splice(index, 1, this.formData);
          this.route.navigateByUrl("item");
        })
      } else {        
        this.formData.id = 0;
        this.formData.profitMargin = this.formData.profitMargin/100;
        this.service.Insert<Item>(this.formData, this.url + "item").subscribe(res => {
          alert("Data Inserted");
          this.repo.itemData.push(res);
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
        this.formData.imagePath = e.target.result;
        this.imagePlaceHolder = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  discountList: SalesDiscountTax[];

 

  ngOnInit(): void {
    this.imagePlaceHolder = this.sampleImage;
    this.getEdit();
    this.getAllCategory();
    this.getAllBrand();
    this.getAllDiscount();
    this.getAllUnit();
  }

  private getAllCategory() {
    if (this.repo.categoryData.length == 0) {
      this.service.GetAll<Category>(this.url + "category").subscribe(res => this.repo.categoryData = res);
    }
  }
  private getAllBrand() {
    if (this.repo.brandData.length == 0) {
      this.service.GetAll<Brand>(this.url + "brand").subscribe(res => this.repo.brandData = res);
    }
  }

 private getAllUnit() {
    if (this.repo.unitData.length == 0) {
      this.service.GetAll<Unit>(this.url + "unit").subscribe(res => this.repo.unitData = res);
    }
  }

  private getAllDiscount() {
    if (this.repo.discountData == undefined) {

      // Todo todo doto
      // Todo todo doto
      // Todo todo doto
      this.service.GetAll<SalesDiscountTax>(this.url + "brand").subscribe(res => {this.discountList = res, this.repo.discountData = res});
    }
  }
}