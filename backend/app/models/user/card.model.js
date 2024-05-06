const Joi = require('joi')
const BaseModel = require('../../utils/base-model.js')

module.exports = new BaseModel('Preset', {
  textValue: Joi.string().required(),
  imgValue: Joi.string().required(),
})
