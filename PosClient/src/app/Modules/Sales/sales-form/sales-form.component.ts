import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';
import { Customer } from 'src/app/Core/Models/customer.model';
import { Sales } from 'src/app/Core/Models/sales.model';
import { SalesStatus } from 'src/app/Core/Enums/sales-status.enum';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Purchase } from 'src/app/Core/Models/purchase.model';
import { ItemWithPriceVM } from 'src/app/Core/ViewModel/ItemWithPriceVM.model';
import { SalesPayment } from 'src/app/Core/Models/sales-payment.model';
import { PaymentType } from 'src/app/Core/Enums/payment-type.enum';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {

  public customerList : Customer[];
  public itemList : string[] = [];
  public formData : Sales = new Sales();
  public statusArray = [];
  public paymentTypeArray = [];
  public singleItemEntity: ItemWithPriceVM;
  public routeData? = Number(location.pathname.split('/')[3]);
  public itemWithPrice : ItemWithPriceVM = new ItemWithPriceVM();
  public salesPayment : SalesPayment = new SalesPayment();
  public salesPrice : number;
  public discountAmount : number;
  public taxAmount : number;

  private url : string = "http://localhost:5000/api/";

  constructor(private service : RestDataService, private repo: DataListRepositoryService, private route: Router, private datePipe : DatePipe) 
  { 
    this.statusArray = Object.keys(SalesStatus).filter(key => isNaN(+key));
    this.paymentTypeArray = Object.keys(PaymentType).filter(key => isNaN(+key));
    this.getAllPurchase();
    this.getAllItemWithPrice();
  }
  
  getDataAll() {
    if (this.routeData > 0) {

      this.formData = this.repo.salesData.find(f => f.id == this.routeData);
    }
  }

  // Search Operation
  formatter = (item: ItemWithPriceVM) =>  item.itemCode + " - " + "["+"Qty: "+ item.stockQty + "]"+ " - " +  item.itemName;
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  search: OperatorFunction<string, readonly ItemWithPriceVM[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.repo.itemDataWithPrice
          : this.repo.itemDataWithPrice.filter(
              (v : ItemWithPriceVM) => v.itemName.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };
  


  SelectedItem(item: ItemWithPriceVM) {
    
    if (item != undefined) {
      this.itemWithPrice =this.repo.itemDataWithPrice.sort(d => d.expireDate).find(i => i.itemId == item.itemId);
            
      this.formData.salesDetails.push({
        id: 0,
        salesQty: 1,
        totalAmount: this.itemWithPrice.salesPrice,
        salesId: 0,
        itemId: item.itemId
      });
      
      this.salesPrice = this.itemWithPrice.salesPrice;
      this.discountAmount = this.itemWithPrice.discountAmount;
      this.taxAmount = this.itemWithPrice.taxAmount;
      this.calTotalQty();
      this.calSubAmount();
    }
  }

  getItemName(id: number): string {
    
    if ( id != undefined) {      
      return this.repo.itemDataWithPrice.find((e) => e.itemId == id).itemName;
    } else {
      return 'item not found';
    }
  }

  removeAttachedItem(index: number) {
    this.formData.salesDetails.splice(index, 1);
    this.calTotalQty();
    this.calSubAmount();
  }


  submit(form : NgForm){ 
    
    if (form.valid) {
      if (this.routeData > 0) {

        this.service.Update<Sales>(this.formData, this.url+"sales/" + this.routeData).subscribe(res => {
          alert("Data updated");
          var index = this.repo.salesData.indexOf(this.formData);
          this.repo.salesData.splice(index, 1, res);
          this.route.navigateByUrl("sales");
        })
      }else{
             
        this.service.Insert<Sales>(this.formData, this.url+"sales").subscribe(res => {
          this.repo.salesData.push(res);
          alert("Data Inserted");
          form.reset();
          this.formData = new Sales();
          this.service.GetAll<ItemWithPriceVM>(this.url + 'item/ItemWithPrice').subscribe(res => {this.repo.itemDataWithPrice = res});
        })
      }
    }

  }

    // For Quantity increment and decrement
    decrement_qty(i: number) {
      if (this.formData.salesDetails[i].salesQty > 1) {
        this.formData.salesDetails[i].salesQty -= 1;
        this.calTotalQty();
        this.calSubAmount();
      }
    }
  
    increment_qty(i: number) {
      this.formData.salesDetails[i].salesQty += 1;
      this.calTotalQty();
      this.calSubAmount();      
    }
  
    changedQty(e: any, index: number) {
      this.formData.salesDetails[index].salesQty = Number((e as HTMLInputElement).value);
      this.calTotalQty();
      this.calSubAmount();
    }

    calTotalQty() {
      this.formData.totalQuantity = 0;
      for (let index = 0; index < this.formData.salesDetails.length; index++) {
        let oneQty = this.formData.salesDetails[index].salesQty;
        this.formData.totalQuantity += Number(oneQty);
      }
    }
  
    calSubAmount() {
      this.formData.subTotal = 0;
      for (let index = 0; index < this.formData.salesDetails.length; index++) {
        let oneTotal = this.formData.salesDetails[index].totalAmount;
        
        console.log(oneTotal);
        this.formData.subTotal += Number(oneTotal);
      }
    }

 

  ngOnInit(): void {
    this.formData.salesDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.getAllCustomers();
  }

  private getAllPurchase(){
    if (this.repo.purchaseData.length == 0) {
      this.service.GetAll<Purchase>(this.url + "purchase").subscribe(res => this.repo.purchaseData = res);
    } 
  }

  private getAllItemWithPrice() {
    if (this.repo.itemDataWithPrice.length == 0) {
      this.service
        .GetAll<ItemWithPriceVM>(this.url + 'item/ItemWithPrice')
        .subscribe(res => {this.repo.itemDataWithPrice = res});
    } 
  }

  private getAllCustomers(){
    if (this.repo.customerData.length == 0) {
      this.service.GetAll<Customer>(this.url + "customer").subscribe(res => this.customerList = res);
    } 
  }
}
