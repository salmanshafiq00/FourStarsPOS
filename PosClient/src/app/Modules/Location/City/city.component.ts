import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/Core/Models/city.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

    private url: string = "http://localhost:5000/api/";

    constructor(private service: RestDataService, public repo : DataListRepositoryService,) {

    }


    updateLastAction(index: number, city: City) : number{
      return city.id;
   }
   

    deleteRow(id: number) {
      var record = this.repo.cityData.find(w => w.id == id);
      this.service.Delete<City>(this.url+"city/"+ record.id).subscribe(res => {
      alert("Data deleted");
      this.repo.cityData.splice(this.repo.cityData.indexOf(record));
      });
    }

    ngOnInit(): void {
      this.getDataAll();
    }

    private  getDataAll(){
      if(this.repo.cityData.length == 0)
      this.repo.cityData =  this.repo.getRecords("city");
   }
  }
