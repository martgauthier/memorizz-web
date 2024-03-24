import {Component, Input, OnInit} from "@angular/core";
import {
  createDefaultDataPerDifficultyForSingleStat,
  DataPerDifficultyForSingleStat
} from "../../../models/stats-data.model";

@Component({
  selector: 'app-singledata-for-singledifficulty',
  templateUrl: './singledata-for-singledifficulty.component.html',
  styleUrls: ['./singledata-for-singledifficulty.component.scss']
})
export class SingledataForSingledifficultyComponent implements OnInit {
  @Input() difficulty: "simple" | "medium" | "hard" = "simple";//arbitrary default value
  @Input() statData: DataPerDifficultyForSingleStat = createDefaultDataPerDifficultyForSingleStat();
  @Input() duration?: number = 0;

  difficultyDescriptor: string = "simple";//arbitrary default value

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
  }

  getEvolutionPercentage(): string {
    if(this.statData==null) {
      return "...";
    }
    else {
      let percentage=100*(this.statData.nowValue-this.statData.lastTimeValue)/this.statData.nowValue;
      return Math.round(percentage).toString();
    }
  }
}
