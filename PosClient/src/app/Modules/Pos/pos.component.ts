import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/Core/Models/item.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';
import { ItemWithImagesVM } from 'src/app/Core/ViewModel/itemwithImagesVM.model';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  public itemWithImages: ItemWithImagesVM[] = [];
  private url: string = 'http://localhost:5000/api/';

  constructor(private service: RestDataService,
    public repo: DataListRepositoryService) { 
      this.getAllItemWithImages();
    }

  ngOnInit(): void {
  }
  private getAllItemWithImages() {
    if (this.repo.itemData.length == 0) {
      this.service
        .GetAll<ItemWithImagesVM>(this.url + 'item/ItemWithImages')
        .subscribe((res) => (this.itemWithImages = res.slice(0, 12)));
    }
  }
  submit(form : NgForm){
    
  }

  decrement_qty(){

  }

  qty : number = 5;

  increment_qty(){

  }

}
