const Joi = require('joi')
const BaseModel = require('../../utils/base-model.js')

const Identification = new BaseModel('Identification', {
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  id: Joi.number().required(),
  src: Joi.string(),
})

module.exports = Identification
