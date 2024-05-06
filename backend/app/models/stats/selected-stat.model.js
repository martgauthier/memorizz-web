import BaseModel from "../../utils/base-model";
const Joi = require("joi");

export default new BaseModel("SelectedStat", {
    userId: Joi.number().required(),
    cardId: Joi.number().required(),
    statType: Joi.string().required()
});