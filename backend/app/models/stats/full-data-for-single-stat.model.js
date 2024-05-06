import BaseModel from "../../utils/base-model";
import AllDifficultiesData from "./all-difficulties-data.model";
const Joi = require("joi");

export default new BaseModel("FullDataForSingleStat", {
    statType: Joi.string().valid("errorsPerGame", "timeToDiscoverFullPair", "preferredDifficultyMode", "errorPercentageOnWholeGame", "meanGameDuration").required(),
    /**
     * Duration between the two mesures {@link DataPerDifficultyForSingleStat.lastTimeValue} and {@link DataPerDifficultyForSingleStat.nowValue}
     * (1 month, 2 months, 3 months, 6 months, 8 months, 12 months)
     */
    duration: Joi.number().required(),
    difficulty: AllDifficultiesData.schema.required()
})