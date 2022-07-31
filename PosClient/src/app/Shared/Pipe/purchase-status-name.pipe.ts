import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseStatus } from 'src/app/Core/Enums/purchase-status.enum';

@Pipe({
  name: 'purchaseStatusName'
})
export class PurchaseStatusNamePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return PurchaseStatus[value];
  }

}
