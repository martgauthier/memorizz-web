import {Component, ElementRef} from '@angular/core';

import {
  STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE,
  StatistiquesService
} from "../../../../services/statistiques/statistiques.service";
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-courbe',
  templateUrl: './courbe.component.html',
  styleUrl: './courbe.component.scss'
})
export class CourbeComponent {
  public Highcharts: typeof Highcharts = Highcharts;

  public updateChart: boolean=false;

  private duration: number=1;

  public chartOptions: Highcharts.Options = {
    xAxis: {
      categories: [],
      labels: {
        style: {
          color: "white",
          fontSize: "16px"
        }
      },
      gridLineWidth: 1,
      gridLineColor: "rgba(255,255,255,0.1)"
    },
    legend: {
      itemStyle: {
        color: "white",
        fontSize: "18px"
      },
      symbolRadius: 0,
    },
    yAxis: {
      labels: {
        style: {
          color: "white"
        }
      },
      title: {
        text: "",
        style: {
          color: "white",
          fontSize: "16px"
        }
      },
      gridLineColor: "rgba(255,255,255,0.5)"
    },
    title: {
      text: "",
      style: {
        color: "white"
      }
    },
    series: [{
      type: "line",
      name: "Facile",
      data: [],
      color: "green",
      visible: false
    },
      {
        type: "line",
        name: "Moyen",
        data: [],
        color: "yellow",
        visible: false
      },
      {
        type: "line",
        name: "Difficile",
        data: [],
        color: "red",
        visible: false
      },{
        type: "line",
        name: "En moyenne",
        data: [],
        visible: true
      }],
    tooltip: {
      animation: false,
      formatter: function(): string {
        return `${this.series.name} : ${this.y?.toFixed(1)}`
      },
      backgroundColor: "#01274a",
      style: {
        color: "white"
      }
    },
    plotOptions: {
      line: {
        shadow: {
          color: "rgba(255,255,255,0.5)",
          width: 3,
          offsetX: 0,
          offsetY: 0
        },
        marker: {
          enabled: true
        },
        legendSymbol: "rectangle"
      }
    },
    chart: {
      backgroundColor: "#01274a",
      borderColor: "rgba(0,255,255,0.1)",
      style: {
        fontFamily: "Poppins",
        textOutline: "transparent",
      }
    }
  };

  calculateMeanValues(): number[] {
    // @ts-ignore
    let meanValues: number[] = new Array(this.chartOptions.series[0].data.length);

    for(let i=0; i < meanValues.length; i++) {
      let denominateur=0;
      let sum=0;

      [0,1,2].forEach(index => {
        // @ts-ignore
        if(this.chartOptions.series[index].data[i] !== null) {
          // @ts-ignore
          sum+=this.chartOptions.series[index].data[i];
          denominateur++;
        }
      })

      // @ts-ignore
      meanValues[i]=(denominateur != 0) ? sum / denominateur : 0;
    }

    return meanValues;
  }

  constructor(private statsService: StatistiquesService, ref: ElementRef) {
    statsService.selectedStat$.subscribe((selectedStat) => {
      (this.chartOptions.yAxis as any).title.text = STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE[selectedStat.statType].statTitle;
      (this.chartOptions as any).title.text = STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE[selectedStat.statType].statTitle;
    });

    statsService.courbeData$.subscribe((courbeData) => {
      let labels=new Array(courbeData.simple.length);
      for(let i=0; i < labels.length; i++) {
        if(i===0) labels[i]=statsService.getLastTimeDateString();
        else if(i===labels.length - this.duration) labels[i]=statsService.getDateString();
        else labels[i]="";
      }

      let chartOptionsCopy= {
        ...this.chartOptions
      };

      (chartOptionsCopy.xAxis as Highcharts.XAxisOptions).categories=labels;

      (chartOptionsCopy.series![0] as any).data = courbeData.simple.map((value: number) => value === 0 ? null : value);
      (chartOptionsCopy.series![1] as any).data = courbeData.medium.map((value: number) => value === 0 ? null : value);
      (chartOptionsCopy.series![2] as any).data = courbeData.hard.map((value: number) => value === 0 ? null : value);
      (chartOptionsCopy.series![3] as any).data = this.calculateMeanValues().map((value: number) => value === 0 ? null : value);

      console.log(this.chartOptions)

      this.chartOptions=chartOptionsCopy;

      console.log("Copie: ", chartOptionsCopy)

      this.updateChart=true;
    });

    statsService.duration$.subscribe((duration) => {
      this.duration=duration;
    })

    statsService.scrollToCourbeEvent.subscribe(() => {
      ref.nativeElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    });
  }
}
