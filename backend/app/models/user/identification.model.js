const Joi = require('joi')
const BaseModel = require('../../utils/base-model.js')

module.exports = new BaseModel('Identification', {
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  id: Joi.number().required(),
  src: Joi.string(),
})
