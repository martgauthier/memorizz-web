const BaseModel = require("../../utils/base-model")
const DataPerDifficultyForSingleStat = require("./data-per-difficulty-for-single-stat.model")

module.exports = new BaseModel("AllDifficultiesData", {
    simple: DataPerDifficultyForSingleStat.schema.required(),
    medium: DataPerDifficultyForSingleStat.schema.required(),
    hard: DataPerDifficultyForSingleStat.schema.required()
})