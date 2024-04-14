import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "formatHour"
})
export class FormatHourPipe implements PipeTransform {
  transform(value: number, shouldFormat: boolean): any {
    if(!shouldFormat) return value.toFixed(1)

    let decimalValue=value-Math.floor(value);
    let seconds=Math.round(60*decimalValue);
    if(seconds===60) seconds--;

    return Math.floor(value) + " minutes " + seconds.toString().padStart(2, '0');
  }
}
