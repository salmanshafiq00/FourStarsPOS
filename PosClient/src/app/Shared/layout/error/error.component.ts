import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  bkUrl = {};   
  ngOnInit() {
      this.bkUrl = {'background-image': 'url(assets/grass.png)'}
    }
  }