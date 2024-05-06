import BaseModel from "../../utils/base-model";
import DataPerDifficultyForSingleStat from "./data-per-difficulty-for-single-stat.model";

export default new BaseModel("AllDifficultiesData", {
    simple: DataPerDifficultyForSingleStat.schema.required(),
    medium: DataPerDifficultyForSingleStat.schema.required(),
    hard: DataPerDifficultyForSingleStat.schema.required()
})