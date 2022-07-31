import { SalesStatus } from "../Enums/sales-status.enum";
import { SalesDetails } from "./sales-details.model";
import { SalesPayment } from "./sales-payment.model";

export class Sales {
    public id:number;
    public customerId:number;
    public status:SalesStatus;
    public salesDate:string;
    public invoiceNo: string;
    public totalQuantity: number = 0;
    public subTotal: number = 0;
    public otherCharges: number = 0;
    public grandTotal: number = 0;
    public note: string;
    public salesDetails: SalesDetails[] = [];
    public salesPayments : SalesPayment[] = [];
}
