import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {
  STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE,
  StatistiquesService
} from "../../../../services/statistiques/statistiques.service";
import {Chart} from "chart.js";

@Component({
  selector: 'app-courbe',
  templateUrl: './courbe.component.html',
  styleUrl: './courbe.component.scss'
})
export class CourbeComponent implements AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public plottedDatasets= [
    {
      label: 'Simple',
      data: [1, null, 4, 4, 5.2],
      borderColor: 'rgb(50, 209, 25)',
      backgroundColor: 'rgb(50, 209, 25, 0.5)',
      spanGaps: true
    },
    {
      label: 'Moyen',
      data: [5, 3, 4, 2, 1],
      borderColor: 'rgb(209, 209, 25)',
      backgroundColor: 'rgb(209, 209, 25, 0.5)',
      spanGaps: true
    },
    {
      label: 'Difficile',
      data: [2, 2, 4, 3, 5],
      borderColor: 'rgb(209, 25, 25)',
      backgroundColor: 'rgb(209, 25, 25, 0.5)',
      spanGaps: true
    },
    {
      label: 'En moyenne',
      data: [1, 5, 2, 3, 4],
      borderColor: 'rgb(22, 100, 191)',
      backgroundColor: 'rgb(2, 100, 191, 0.5)',
      spanGaps: true
    }
  ];

  ngAfterViewInit() {
    Chart.defaults.borderColor="rgba(255, 255, 255, 0.2)";
    Chart.defaults.color="rgba(255,255,255,0.8)";

    // @ts-ignore
    this.chart!.chart.options = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 20,
            }
          }
        },
        title: {
          text: "Nombre d'erreurs après découverte des deux cartes de la paire",
          font: {
              size: 28,
          },
          color: "white",
          padding: 30,
          display: true
        }
      }
    };

    this.chart!.update();
  }

  constructor(private statsService: StatistiquesService, ref: ElementRef) {
    statsService.selectedStat$.subscribe((selectedStat) => {
      if(this.chart !== undefined) {
        // @ts-ignore
        this.chart!.chart.options.plugins.title.text=STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE[selectedStat.statType].statTitle;
        this.chart!.update();
      }
    });

    statsService.scrollToCourbeEvent.subscribe(() => {
      ref.nativeElement.scrollIntoView({behavior: "smooth"});
    });
  }
}
