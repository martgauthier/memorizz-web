const BaseModel = require("../../utils/base-model")
const Joi = require("joi");



module.exports = new BaseModel("DataPerDifficultyForSingleStat", {
   lastTimeValue: Joi.number().required(),
   nowValue: Joi.number().required(),
    /**
     * Indique le nombre de parties jouées avec ce mode de difficulté, sur l'écart de temps sélectionné
     */
   gamesQuantity: Joi.number().required()
});