const Joi = require('joi')
const BaseModel = require('../../utils/base-model.js')

const Identification = new BaseModel('Identification', {
  userId: Joi.number().required(),
  nom: Joi.string().required(),
  prenom: Joi.string().required(), 
  src: Joi.string(),
})

module.exports = Identification
