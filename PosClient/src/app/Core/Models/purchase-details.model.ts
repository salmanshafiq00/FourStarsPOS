export class PurchaseDetails {
    public id: number;
    public itemId : number;
    public quantity: number;
    public unitCost: number;
    public discountAmount?: number;
    public taxAmount?: number;
    public profitAmount?: number;
    public salesPrice?:number;
    public totalAmount: number;
    public soldQty?: number;
    public expireDate:string;
    public purchaseId:number;
}
