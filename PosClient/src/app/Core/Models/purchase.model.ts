import { DatePipe } from "@angular/common";
import { PurchaseStatus } from "../Enums/purchase-status.enum";
import { PurchaseDetails } from "./purchase-details.model";

export class Purchase {
    public id: number;
    public supplierId: number;
    public purchaseDate: string;
    public status: PurchaseStatus;
    public invoiceNo: string;
    public totalQuantity: number=0;
    public subTotal: number = 0;
    public otherCharges: number = 0;
    public grandTotal: number = 0;
    public note: string;
    public purchaseDetails: PurchaseDetails[] = [];

}
