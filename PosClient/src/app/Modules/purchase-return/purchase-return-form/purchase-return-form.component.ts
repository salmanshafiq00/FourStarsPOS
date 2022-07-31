import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseReturnStatus } from 'src/app/Core/Enums/purchase-return-status.enum';
import { Item } from 'src/app/Core/Models/item.model';
import { PurchaseReturn } from 'src/app/Core/Models/purchase-return.model';
import { Purchase } from 'src/app/Core/Models/purchase.model';
import { Supplier } from 'src/app/Core/Models/supplier.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { ItemVM } from 'src/app/Core/ViewModel/itemVM.model';
@Component({
  selector: 'app-purchase-return-form',
  templateUrl: './purchase-return-form.component.html',
  styleUrls: ['./purchase-return-form.component.css'],
})
export class PurchaseReturnFormComponent implements OnInit {
  public singleItemEntity: Item;
  public formData: PurchaseReturn = new PurchaseReturn();
  public statusArray = [];
  public routeData? = Number(location.pathname.split('/')[5]);
  public purchaseId? = Number(location.pathname.split('/')[2]);
  public buttonMode: string = 'Save';
  public purchaseItemList = [];
  public itemModel: any;
  public supplierId: number;
  public singlePurchase : any;
  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService,
    private route: Router,
    private datePipe: DatePipe
  ) {
    this.statusArray = Object.keys(PurchaseReturnStatus).filter((key) =>isNaN(+key));
    this.getItemAll();
    this.getEditData();

  }

  getEditData() {
    if (this.routeData > 0) {
      if (
        this.repo.purchaseReturnData.find((f) => f.id == this.routeData) ==
        undefined
      ) {
        this.formData = new PurchaseReturn();
      } else {
        this.service
          .GetOne<PurchaseReturn>(this.url + 'PurchaseReturn/' + this.routeData)
          .subscribe((res) => {
            this.formData = res;
            this.formData.purchaseReturnDate = this.datePipe.transform(
              res.purchaseReturnDate,
              'yyyy-MM-dd'
            );
          });
      }
      this.buttonMode = 'Update';
    }
  }

  // For search operation
  formatter = (item: { id: number; name: string }) => item.name;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly { id: number; name: string }[]> = (
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
          ? this.purchaseItemList
          : this.purchaseItemList.filter(
              (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

  SelectedItem(item: any) {
    if (item != undefined) {
      this.formData.purchaseReturnDetails.push({
        id: 0,
        itemId: item.id,
        quantity: 1,
        unitCost: item.unitCost,
        totalAmount: 0,
        purchaseReturnId: 0,
      });
      this.calTotalQty();
    }
  }

  removeAttachedItem(index: number) {
    this.formData.purchaseReturnDetails.splice(index, 1);
    this.calTotalQty();
    this.calSubAmount();
  }

  // Crud Operation methods
  submit(form: NgForm) {
    if (form.valid) {
      if (this.routeData > 0) {
        this.service
          .Update<PurchaseReturn>(
            this.formData,
            this.url + 'purchaseReturn/' + this.routeData
          )
          .subscribe((res) => {
            alert('Data updated');
            var index = this.repo.purchaseReturnData.indexOf(this.formData);
            this.repo.purchaseReturnData.splice(index, 1, res);
            this.route.navigateByUrl('purchase_return');
          });
      } else {
        this.formData.purchaseId = this.purchaseId;
        this.formData.grandTotal =
          this.formData.subTotal + this.formData.otherCharges;
        this.service
          .Insert<PurchaseReturn>(this.formData, this.url + 'purchaseReturn')
          .subscribe((res) => {
            alert('Data Inserted');
            this.repo.purchaseReturnData.push(res);
            form.reset();
            this.formData = new PurchaseReturn();
          });
      }
    }
  }

  // For Quantity increment and decrement
  decrement_qty(i: number) {
    if (this.formData.purchaseReturnDetails[i].quantity > 1) {
      this.formData.purchaseReturnDetails[i].quantity -= 1;
      this.calTotalQty();
      this.calSubAmount();
    }
  }

  increment_qty(i: number) {
    this.formData.purchaseReturnDetails[i].quantity += 1;
    this.calTotalQty();
    this.calSubAmount();
  }

  changedQty(e: any, index: number) {
    this.formData.purchaseReturnDetails[index].quantity = Number(
      (e as HTMLInputElement).value
    );
    this.formData.purchaseReturnDetails[index].totalAmount =
      this.formData.purchaseReturnDetails[index].quantity *
      this.formData.purchaseReturnDetails[index].unitCost;
    this.calTotalQty();
    this.calSubAmount();
  }

  // changedExpiredDate(e: any, index: number) {
  //   var newDate = this.datePipe.transform(
  //     new Date((e as HTMLInputElement).value),
  //     'yyyy-MM-dd'
  //   );
  //   this.formData.purchaseReturnDetails[index]. = newDate;
  // }

  changedUnitCost(e: any, index: number) {
    this.formData.purchaseReturnDetails[index].unitCost = Number(
      (e as HTMLInputElement).value
    );
    this.formData.purchaseReturnDetails[index].totalAmount =
      this.formData.purchaseReturnDetails[index].quantity *
      this.formData.purchaseReturnDetails[index].unitCost;
    this.calSubAmount();
  }

  calTotalQty() {
    this.formData.totalQuantity = 0;
    for (
      let index = 0;
      index < this.formData.purchaseReturnDetails.length;
      index++
    ) {
      let oneQty = this.formData.purchaseReturnDetails[index].quantity;
      this.formData.totalQuantity += Number(oneQty);
    }
  }

  calSubAmount() {
    this.formData.subTotal = 0;
    for (
      let index = 0;
      index < this.formData.purchaseReturnDetails.length;
      index++
    ) {
      let oneTotal =
        this.formData.purchaseReturnDetails[index].quantity *
        this.formData.purchaseReturnDetails[index].unitCost;
      this.formData.subTotal += Number(oneTotal);
    }
  }

  getItemName(id: number): string {
    if (id != undefined && this.repo.itemDataNoImages.length != 0  ) {
      return this.repo.itemDataNoImages.find((e) => e.id == id).name;     
    } 
    else {
      return 'item not found';
    }
  }

  ngOnInit(): void {
    this.getPurchaseItem();
    this.getAllSuppliers();

    this.formData.purchaseReturnDate = this.datePipe.transform(Date.now(),'yyyy-MM-dd');
  }
  private getItemAll() {
    if (this.repo.itemDataNoImages.length == 0) {
      this.service
        .GetAll<ItemVM>(this.url + 'item/NoImages')
        .subscribe(res => this.repo.itemDataNoImages = res);
    } 
  }
  private getAllSuppliers() {
    if (this.repo.supplierData.length == 0) {
      this.service
        .GetAll<Supplier>(this.url + 'supplier')
        .subscribe((res) => (this.repo.supplierData = res));
    }
  }
  getPurchaseItem = () => {
    this.service
      .GetOne<Purchase>(this.url + 'purchase/' + this.purchaseId)
      .subscribe((res) => {
        res.purchaseDetails.forEach((f) =>
          this.purchaseItemList.push({
            id: f.itemId,
            name: this.getItemName(f.itemId),
            unitCost: f.unitCost
            
          })
        );
        this.supplierId = res.supplierId;
      });
  };
}
