import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "durationInMonthsOrYear"
})
export class DurationPipe implements PipeTransform {
  transform(value: number): any {
    return (value===12) ? "1 an" : value + " mois";
  }
}
