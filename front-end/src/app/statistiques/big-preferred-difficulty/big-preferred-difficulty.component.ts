import {Component} from "@angular/core";
import {
  FullDataForSingleStat
} from "../../../models/stats-data.model";
import {STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE, StatistiquesService} from "../../../services/statistiques/statistiques.service";
import {BehaviorSubject} from "rxjs";
import {HelpIconComponent} from "../help-icon/help-icon.component";
import * as Highcharts from "highcharts";


@Component({
  selector: 'app-big-preferred-difficulty',
  templateUrl: './big-preferred-difficulty.component.html',
  styleUrls: ['./big-preferred-difficulty.component.scss']
})
export class BigPreferredDifficultyComponent {
  public statType: string = "preferredDifficultyMode";
  public statData?: FullDataForSingleStat;
  public duration: number=1;
  public gamesQuantity: number=0;
  public Highcharts: typeof Highcharts = Highcharts;
  public updateChart: boolean=false;

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
    let dataToSubscribeTo: BehaviorSubject<FullDataForSingleStat> = this.statsService.data[this.statType];

    dataToSubscribeTo.subscribe((data) => {
      this.statData = data;
      this.gamesQuantity=0;

      let k: keyof typeof data.difficulty;
      for(k in data.difficulty) {
        this.gamesQuantity+=data.difficulty[k].gamesQuantity;
      }

      for(k in data.difficulty) {
        let dataIndex=["simple", "medium", "hard"].indexOf(k);

        // @ts-ignore
        this.chartOptions.series![0].data[dataIndex].y=Math.round(data.difficulty[k].gamesQuantity*100/this.gamesQuantity);
      }
    });

    this.statsService.duration$.subscribe((duration) => {
      this.duration=duration;
    });
  }

  onMonitoringClick() {
    this.statsService.setSelectedStat(this.statType);
  }

  protected readonly HelpIconComponent = HelpIconComponent;
  protected readonly STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE = STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE;
}
