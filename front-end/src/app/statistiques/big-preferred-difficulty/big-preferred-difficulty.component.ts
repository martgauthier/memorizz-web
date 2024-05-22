import {Component} from "@angular/core";
import {
  GamesQuantity
} from "../../../models/stats-data.model";
import {STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE, StatistiquesService} from "../../../services/statistiques/statistiques.service";
import {HelpIconComponent} from "../help-icon/help-icon.component";
import * as Highcharts from "highcharts";


@Component({
  selector: 'app-big-preferred-difficulty',
  templateUrl: './big-preferred-difficulty.component.html',
  styleUrls: ['./big-preferred-difficulty.component.scss']
})
export class BigPreferredDifficultyComponent {
  public statType: string = "preferredDifficultyMode";
  public duration: number=1;
  public gamesQuantity?: GamesQuantity;
  public Highcharts: typeof Highcharts = Highcharts;
  public updateFlag: boolean=false;
  public totalGamesNumber: number = 0;

  public chartOptions: Highcharts.Options = {
    xAxis: {
      categories: ["Facile  ", "Moyen", "Difficile"],
      labels: {
        style: {
          color: "white"
        }
      }
    },
    yAxis: {
      labels: {
        style: {
          color: "white"
        }
      },
      title: {
        text: ""
      },
      gridLineColor: "rgba(255,255,255,0.5)"
    },
    title: {
      text: "",
    },
    series: [{
      showInLegend: false,
      type: "column",
      name: "Mode de difficulté",
      data: [
        {
          y: 0,
          color: "#49960b"
        },
        {
          y: 0,
          color: "#a6a612"
        },
        {
          y: 0,
          color: "#b31414"
        }],
    }],
    tooltip: {
      animation: false,
      formatter: function(): string {
        return `Mode ${this.x}: ${this.y}% des parties`
      },
      backgroundColor: "#01274a",
      style: {
        color: "white"
      }
    },
    plotOptions: {
      column: {
        borderColor: "transparent",
        shadow: {
          color: "white",
          opacity: 0.1,
          width: 2,
          offsetX: 0,
          offsetY: 0
        }
      }
    },
    chart: {
      backgroundColor: "#209188",
      borderColor: "rgba(0,255,255,0.1)",
      style: {
        fontFamily: "Poppins",
        textOutline: "transparent",
      }
    }
  };

  constructor(private statsService: StatistiquesService) {
    statsService.gamesQuantity$.subscribe((gamesQuantity) => {
      this.updateChart(gamesQuantity)
    });

    this.statsService.duration$.subscribe((duration) => {
      this.duration=duration;
    });
  }

  updateChart(gamesQuantity: GamesQuantity) {
    this.gamesQuantity = gamesQuantity;

    this.totalGamesNumber = 0;
    Object.values(gamesQuantity).forEach(value => this.totalGamesNumber += value);

    const updatedData = [
      {
        y: Math.round(gamesQuantity.simple * 100 / this.totalGamesNumber),
        color: "#49960b"
      },
      {
        y: Math.round(gamesQuantity.medium * 100 / this.totalGamesNumber),
        color: "#a6a612"
      },
      {
        y: Math.round(gamesQuantity.hard * 100 / this.totalGamesNumber),
        color: "#b31414"
      }
    ];

    this.chartOptions = {
      ...this.chartOptions,
        //@ts-ignore
      series: [{
        ...this.chartOptions.series![0],
        data: updatedData
      }]
    };

    this.updateFlag = true;
  }

  onMonitoringClick() {
    this.statsService.setSelectedStat(this.statType);
  }

  protected readonly HelpIconComponent = HelpIconComponent;
  protected readonly STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE = STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE;
}
