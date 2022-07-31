import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/Core/Models/item.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Pipe({
  name: 'toItemName'
})
export class ToItemNamePipe implements PipeTransform {

  itemList : Item[];
  constructor(private repo : DataListRepositoryService, private rest : RestDataService){
    // this.itemList = this.repo.itemData;
    this.rest.GetAll<Item>('http://localhost:5000/api/item').subscribe(res => this.itemList = res);
    console.log(this.itemList);
    
  }
  transform(value: number, ...args: unknown[]): string {
    for (let index = 0; index < this.itemList.length; index++) {
      if(index == value){
        return this.repo.itemData[index].name;
      }
      
    }
    return "Hello";
  }

}
