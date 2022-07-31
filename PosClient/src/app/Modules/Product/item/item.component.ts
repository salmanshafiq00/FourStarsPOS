import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Core/Models/item.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  private url: string = 'http://localhost:5000/api/';
  
  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {}

  updateLastAction(index: number, item: Item): number {
    return item.id;
  }

  deleteRow(id: number) {
    var record = this.repo.itemData.find((w) => w.id == id);
    this.service
      .Delete<Item>(this.url + 'item/' + record.id)
      .subscribe((res) => {
        alert('Data deleted');
        this.repo.itemData.splice(this.repo.itemData.indexOf(record));
      });
  }

  ngOnInit(): void {
    this.getDataAll();
  }

  private getDataAll() {
    if (this.repo.itemData.length == 0) {
      this.service
        .GetAll<Item>(this.url + 'item')
        .subscribe((res) => (this.repo.itemData = res));
    }
  }
}
