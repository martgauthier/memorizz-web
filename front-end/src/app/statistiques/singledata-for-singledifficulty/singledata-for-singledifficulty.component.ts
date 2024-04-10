import {Component, Input, OnInit} from "@angular/core";
import {
  createDefaultDataPerDifficultyForSingleStat,
  DataPerDifficultyForSingleStat
} from "../../../models/stats-data.model";
import {StatistiquesService, SUFFIXES_PER_STAT_TYPE} from "../../../services/statistiques/statistiques.service";

@Component({
  selector: 'app-singledata-for-singledifficulty',
  templateUrl: './singledata-for-singledifficulty.component.html',
  styleUrls: ['./singledata-for-singledifficulty.component.scss']
})
export class SingledataForSingledifficultyComponent implements OnInit {
  @Input({required: true}) difficulty: "simple" | "medium" | "hard" = "simple";//arbitrary default value
  @Input({required: true}) statType?: string="";
  @Input({required: true}) statData: DataPerDifficultyForSingleStat = createDefaultDataPerDifficultyForSingleStat();
  @Input({required: true}) shouldFormatHour: boolean=false;

  public duration: number = 1;

  public nowDate: string="";
  public lastTimeDate: string="";

  public statLongSuffix: string="";
  public statShortSuffix: string="";
  public statPercentageSuffix: string="";

  difficultyDescriptor: string = "simple";//arbitrary default value

  constructor(private statsService: StatistiquesService) {
    this.nowDate=statsService.getDateString();
    this.lastTimeDate=statsService.getLastTimeDateString();
    this.statsService.duration$.subscribe((duration) => {
      this.duration=duration;
      this.lastTimeDate=this.statsService.getLastTimeDateString();
      this.nowDate=this.statsService.getDateString();
    })
  }

  ngOnInit() {
    switch (this.difficulty) {
      case "simple":
        this.difficultyDescriptor="simple";
        break;
      case "medium":
        this.difficultyDescriptor="moyen";
        break;
      case "hard":
        this.difficultyDescriptor="difficile";
        break;
    }

    ({statLongSuffix: this.statLongSuffix, statShortSuffix: this.statShortSuffix, statPercentageSuffix: this.statPercentageSuffix} = SUFFIXES_PER_STAT_TYPE[this.statType!]);
  }

  getEvolutionPercentage(): string {
    if(this.statData==null) {
      return "...";
    }
    else {
      let percentage=100*(this.statData.nowValue-this.statData.lastTimeValue)/this.statData.lastTimeValue;
      return (percentage<0 ? "" : "+") + Math.round(percentage).toString();
    }
  }
}
