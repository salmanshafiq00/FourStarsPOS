import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/Core/Models/country.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {}

updateLastAction(index: number, country: Country) : string{
   return country.name;
}

  deleteRow(id: number) {
    var record = this.repo.countryData.find((w) => w.id == id);
    this.service
      .Delete<Country>(this.url + 'country/' + record.id)
      .subscribe((res) => {
        this.repo.countryData.splice(this.repo.countryData.indexOf(record));
        alert('Data deleted');
      });
  }

  ngOnInit(): void {
    this.getDataAll();
  }

  private getDataAll() {
    if (this.repo.countryData.length == 0) {
      this.repo.countryData = this.repo.getRecords('country');
    }
  }
}
