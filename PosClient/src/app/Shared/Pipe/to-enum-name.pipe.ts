import { Pipe, PipeTransform } from '@angular/core';
import { Designation } from 'src/app/Core/Enums/designation.enum';

@Pipe({
  name: 'toEnumName',
})
export class ToEnumNamePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    return Designation[value];
  }
}
