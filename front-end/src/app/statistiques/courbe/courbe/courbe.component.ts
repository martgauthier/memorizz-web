import {Component, ElementRef, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartOptions} from "chart.js";

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

@Component({
  selector: 'app-courbe',
  templateUrl: './courbe.component.html',
  styleUrl: './courbe.component.scss'
})
export class CourbeComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public plottedDatasets= [
    {
      label: 'Simple',
      borderColor: 'rgb(50, 209, 25)',
      backgroundColor: 'rgb(50, 209, 25, 0.5)',
      data: COURBE_SIMPLE_MOCK,
      spanGaps: true,
      hidden: true
    },
    {
      label: 'Moyen',
      borderColor: 'rgb(209, 209, 25)',
      backgroundColor: 'rgb(209, 209, 25, 0.5)',
      data: COURBE_MOYEN_MOCK,
      spanGaps: true,
      hidden: true
    },
    {
      label: 'Difficile',
      borderColor: 'rgb(209, 25, 25)',
      backgroundColor: 'rgb(209, 25, 25, 0.5)',
      data: COURBE_DIFFICILE_MOCK,
      spanGaps: true,
      hidden: true
    },
    {
      label: 'En moyenne',
      borderColor: 'rgb(32, 145, 136)',
      backgroundColor: 'rgba(32, 145, 136, 0.5)',
      data: COURBE_EN_MOYENNE_MOCK,
      spanGaps: true
    }
  ];

  public labels: string[] = Array.from(new Array(31), (value: string, index: number): string => {
    if(index===0) return this.statsService.getLastTimeDateString();
    else if(index===30) return this.statsService.getDateString();
    else return "";
  });

  public options: ChartOptions<'line'> = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 20
          }
        },
      },
      title: {
        text: "Nombre d'erreurs après découverte des deux cartes de la paire",
        font: {
          size: 28,
        },
        color: "white",
        padding: 30,
        display: true
      },
      tooltip: {
        enabled: true,
        intersect: false,
        mode: "nearest",
        callbacks: {
          label: (item: any) => {
            return `${item.dataset.label}: ${item.formattedValue} erreurs sur les parties de ce jour`
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: ["Nombre d'erreurs avant", "de trouver la carte"],
          font: {
            size: 16
          }
        }
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 16
          }
        }
      }
    },
    datasets: {
      line: {
        pointRadius: 0
      }
    }
  };

  constructor(private statsService: StatistiquesService, ref: ElementRef) {
    statsService.selectedStat$.subscribe((selectedStat) => {
      if(this.chart?.chart?.options?.plugins?.title?.text) {//check that all values necessary are defined
        this.chart.chart.options.plugins.title.text = STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE[selectedStat.statType].statTitle;
        this.chart.update();
      }
    });

    statsService.duration$.subscribe(() => {
      this.labels[0]=this.statsService.getLastTimeDateString();
      this.labels[30]=this.statsService.getDateString();

      this.chart?.update();
    });

    statsService.scrollToCourbeEvent.subscribe(() => {
      ref.nativeElement.scrollIntoView({behavior: "smooth"});
    });
  }
}
