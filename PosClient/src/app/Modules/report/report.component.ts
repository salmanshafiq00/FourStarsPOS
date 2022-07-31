import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: 'report.component.html',
  styleUrls: ['report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private client: HttpClient, private router: Router) { }

  private url: string = "http://localhost:5000/api/report/allCity";
  ngOnInit(): void {

  }
  public filename: string;

  public getReport() {
    this.client.get(this.url, { responseType: 'blob' },).subscribe(
      (response: any) => {

        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        downloadLink.target = "_blank";
        if (this.filename)
          downloadLink.setAttribute('download', this.filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }
}

