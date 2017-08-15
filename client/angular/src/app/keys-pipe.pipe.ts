import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysPipe'
})
export class KeysPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    let obj = JSON.parse(value)
    let keys = [];
    for (let key in obj) {
      keys.push({key: key, value: obj[key]});
    }
    return keys;
  }

}
