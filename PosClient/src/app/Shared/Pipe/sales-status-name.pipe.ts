import { Pipe, PipeTransform } from '@angular/core';
import { SalesStatus } from 'src/app/Core/Enums/sales-status.enum';

@Pipe({
  name: 'salesStatusName'
})
export class SalesStatusNamePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return SalesStatus[value];
  }

}
