import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/Core/Models/brand.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {}

  updateLastAction(index: number, brand: Brand): number {
    return brand.id;
  }
  
  deleteRow(id: number) {
    var record = this.repo.brandData.find((w) => w.id == id);
    this.service
      .Delete<Brand>(this.url + 'brand/' + record.id)
      .subscribe((res) => {
        alert('Data deleted');
        this.repo.brandData.splice(this.repo.brandData.indexOf(record));
      });
  }

  ngOnInit(): void {
    this.getDataAll();
  }

  private getDataAll() {
    if (this.repo.brandData.length == 0) {
      this.repo.brandData = this.repo.getRecords('brand');
    }
  }

  
}
