const Joi = require('joi')
const BaseModel = require('../../utils/base-model.js')

module.exports = new BaseModel('Card', {
  cardId: Joi.number().required(),
  textValue: Joi.string().required(),
  imgValue: Joi.string().required(),
})
