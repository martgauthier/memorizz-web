const Joi = require('joi')
const BaseModel = require('../../utils/base-model.js')

module.exports = new BaseModel('Preset', {
  pairsNumber: Joi.number().required(),
  cardsAreVisible: Joi.boolean().required(),
  cardsAreBothImage: Joi.boolean().required(),
})
