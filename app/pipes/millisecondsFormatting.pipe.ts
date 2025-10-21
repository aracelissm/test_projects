import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMilliseconds'
})
export class FormatMilliseconds implements PipeTransform {
  transform(milliseconds: number | null | undefined): string {
    if (!milliseconds) return "";
    const hours: number = Math.floor(milliseconds / (60 * 60 * 1000));
    milliseconds %= (60 * 60 * 1000);
    const minutes : number = Math.floor(milliseconds / (60 * 1000));
    milliseconds %= (60 * 1000);
    const seconds : number = Math.floor(milliseconds / 1000);
    milliseconds %= 1000;
    milliseconds = Math.round((milliseconds + Number.EPSILON) * 100) / 100
  
    return `${hours} hrs, ${minutes} mins, ${seconds} s, ${milliseconds} ms`;
  }
}