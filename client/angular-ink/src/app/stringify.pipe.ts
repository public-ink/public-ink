import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'stringify'
})
export class StringifyPipe implements PipeTransform {

  transform(value: Object): string {
    return JSON.stringify(value)
  }

}
