import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {
  DataPerDifficultyForSingleStat,
  FullDataForSingleStat
} from "../../../models/stats-data.model";
import {STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE, StatistiquesService} from "../../../services/statistiques/statistiques.service";
import {BehaviorSubject} from "rxjs";
import {HelpIconComponent} from "../help-icon/help-icon.component";
import {ChartDataset} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-big-preferred-difficulty',
  templateUrl: './big-preferred-difficulty.component.html',
  styleUrls: ['./big-preferred-difficulty.component.scss']
})
export class BigPreferredDifficultyComponent implements AfterViewInit {
  public statType: string = "preferredDifficultyMode";
  public statData?: FullDataForSingleStat;
  public duration: number=1;
  public gamesQuantity: number=0;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public plottedDatasets: ChartDataset<"bar">[] = [{
    data: [15, 60, 25],
    backgroundColor: ["#49960b", "#a6a612", "#b31414"]
  }];

  constructor(private statsService: StatistiquesService) {
    let dataToSubscribeTo: BehaviorSubject<FullDataForSingleStat> = this.statsService.data[this.statType];

    dataToSubscribeTo.subscribe((data) => {
      this.statData = data;
      this.gamesQuantity=0;
      Object.values(data.difficulty).forEach((values: DataPerDifficultyForSingleStat) => {
        this.gamesQuantity+=values.gamesQuantity;
      });
    });

    this.statsService.duration$.subscribe((duration) => {
      this.duration=duration;
    });
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.chart.chart.options.plugins.legend.display=false;
    // @ts-ignore
    this.chart.chart.options.plugins.tooltip = {
      enabled: true,
      intersect: false,
      mode: "nearest",
      callbacks: {
        label: (item: any): string => `${item.formattedValue}% des parties jouées`
      }
    };

    this.chart?.update();
  }


  onMonitoringClick() {
    this.statsService.setSelectedStat(this.statType);
  }

  protected readonly HelpIconComponent = HelpIconComponent;
  protected readonly STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE = STAT_TITLE_AND_DESCRIPTION_PER_STAT_TYPE;
}
