import {Component, ElementRef} from '@angular/core';

import {
  STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE,
  StatistiquesService
} from "../../../../services/statistiques/statistiques.service";
import {
  COURBE_DIFFICILE_MOCK,
  COURBE_EN_MOYENNE_MOCK,
  COURBE_MOYEN_MOCK,
  COURBE_SIMPLE_MOCK
} from "../../../../mocks/data-courbe.mock";
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-courbe',
  templateUrl: './courbe.component.html',
  styleUrl: './courbe.component.scss'
})
export class CourbeComponent {
  public Highcharts: typeof Highcharts = Highcharts;

  public labels: string[] = Array.from(new Array(31), (value: string, index: number): string => {
    if(index===0) return this.statsService.getLastTimeDateString();
    else if(index===30) return this.statsService.getDateString();
    else return "";
  });

  public updateChart: boolean=false;

  public chartOptions: Highcharts.Options = {
    xAxis: {
      categories: this.labels,
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
      name: "Simple",
      data: COURBE_SIMPLE_MOCK,
      color: "green",
      visible: false
    },
      {
        type: "line",
        name: "Moyen",
        data: COURBE_MOYEN_MOCK,
        color: "yellow",
        visible: false
      },
      {
        type: "line",
        name: "Difficile",
        data: COURBE_DIFFICILE_MOCK,
        color: "red",
        visible: false
      },{
        type: "line",
        name: "En moyenne",
        data: COURBE_EN_MOYENNE_MOCK,
      }],
    tooltip: {
      animation: false,
      formatter: function(): string {
        return `${this.series.name} : ${this.y?.toFixed(1)}% d'erreurs sur les parties de ce jour`
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
          enabled: false
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

  constructor(private statsService: StatistiquesService, ref: ElementRef) {
    statsService.selectedStat$.subscribe((selectedStat) => {
      (this.chartOptions.yAxis as any).title.text = STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE[selectedStat.statType].statTitle;
      (this.chartOptions as any).title.text = STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE[selectedStat.statType].statTitle;
      this.updateChart=true;
    });

    statsService.duration$.subscribe(() => {
      this.labels[0]=this.statsService.getLastTimeDateString();
      this.labels[30]=this.statsService.getDateString();

      this.updateChart=true;
    });

    statsService.scrollToCourbeEvent.subscribe(() => {
      ref.nativeElement.scrollIntoView({behavior: "smooth"});
    });
  }
}
