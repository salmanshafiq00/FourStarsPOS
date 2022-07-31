import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseReturnStatus } from 'src/app/Core/Enums/purchase-return-status.enum';

@Pipe({
  name: 'purchaseReturnStatusName'
})
export class PurchaseReturnStatusNamePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return PurchaseReturnStatus[value];
  }

}
