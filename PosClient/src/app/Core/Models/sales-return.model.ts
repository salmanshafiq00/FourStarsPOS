import { SalesReturnStatus } from "../Enums/sales-return-status.enum";

export class SalesReturnInvoice {
    public id:number;
    public status: SalesReturnStatus;
    public salesReturnDate:Date;
    public salesId:number;
    public invoiceNo: string;
    public totalQuantity: number;
    public subTotal: number;
    public otherCharges: number;
    public grandTotal: number;
    public note: string;
}
