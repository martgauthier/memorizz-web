const BaseModel = require("../../utils/base-model")
const Joi = require("joi");

module.exports = new BaseModel("SelectedStat", {
    userId: Joi.number().required(),
    cardId: Joi.number().required(),
    statType: Joi.string().required()
});