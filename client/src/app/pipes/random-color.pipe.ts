// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'randomColor'
// })
// export class RandomColorPipe implements PipeTransform {

//   transform(value:number, style: string,  width:number = 0): any {
//     if(!value){
//       return '';
//     }
//     const randomColor = this.getRandomColor((value * 1234).toString());
//     const result:any = {};
//     let styleStr = `${randomColor}`;
//     if(width){
//       styleStr =`${width}px solid ${randomColor} `; 
//     }
//     result[style] = styleStr
//     return result;
//   }


//   getRandomColor(value:string): string {
//     let hash = 0;
//     for (let i = 0; i < value.length; i++) {
//       hash = value.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     let color = '#';
//     for (let i = 0; i < 3; i++) {
//       const sub = (hash >> (i * 8)) & 0xFF;
//       color += ('00' + sub.toString(16)).slice(-2);
//     }
//     return color;
//   }
// }
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomColor'
})
export class RandomColorPipe implements PipeTransform {

  transform(value: number, style: string, width: number = 0): any {
    if (!value) return '';

    const randomColor = this.getRandomColor((value * 1234).toString());

    const result: any = {};
    let styleStr = randomColor;

    if (width) {
      styleStr = `${width}px solid ${randomColor}`;
    }

    result[style] = styleStr;
    return result;
  }

  // 🎯 רק גווני כחול / תכלת
  getRandomColor(value: string): string {
    let hash = 0;

    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }

    // טווח כחולים בלבד
    const hue = 200 + (hash % 30); // כחול → תכלת
    const saturation = 60 + (hash % 25);
    const lightness = 50 + (hash % 25);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}