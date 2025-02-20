const Joi = require('joi')
const BaseModel = require('../../utils/base-model.js')

module.exports = new BaseModel('Card', {
  id: Joi.number().required(),
  textValue: Joi.string().required(),
  imgValue: Joi.string().required(),
})
