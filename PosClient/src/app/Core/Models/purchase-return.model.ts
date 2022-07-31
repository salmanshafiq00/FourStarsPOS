import { PurchaseReturnStatus } from "../Enums/purchase-return-status.enum";
import { PurchaseReturnDetails } from "./purchase-return-details.model";

export class PurchaseReturn {
    public id:number;
    public purchaseReturnDate:string;
    public status: PurchaseReturnStatus;
    public purchaseId :number;
    public invoiceNo: string;
    public totalQuantity: number = 0;
    public subTotal: number = 0;
    public otherCharges: number = 0;
    public grandTotal: number = 0;
    public note: string;
    public purchaseReturnDetails : PurchaseReturnDetails[] = [];
}
