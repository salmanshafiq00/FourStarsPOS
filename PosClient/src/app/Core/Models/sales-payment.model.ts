import { PaymentType } from "../Enums/payment-type.enum";

export class SalesPayment {
    public id:number;
    public salesId: number;
    public paymentType:PaymentType;
    public paymentDate:Date;
    public amount:number;
    public dueAmount:number;
    public paymentNote:string;
}
