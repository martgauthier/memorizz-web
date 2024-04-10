import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "formatHour"
})
export class FormatHourPipe implements PipeTransform {
  transform(value: number, shouldFormat: boolean): any {
    if(!shouldFormat) return value.toFixed(1);

    console.log("Piped value: ", value)

    let decimalValue=value-Math.floor(value);
    let seconds=Math.round(60*decimalValue);

    return Math.floor(value) + " minutes " + seconds.toString().padStart(2, '0');
  }
}
