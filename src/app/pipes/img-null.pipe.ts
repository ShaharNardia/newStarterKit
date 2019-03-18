import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgNull'
})
export class ImgNullPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let imgSrc = value;

    if (value == 0) {
      imgSrc=  109549;
    }

    return imgSrc;
  }

}
