const Joi = require('joi')
const BaseModel = require('../../utils/base-model.js')
const PresetDict = require('./presetdict.model')
const Identification = require('./identification.model')

module.exports = new BaseModel('User', {
  id: Joi.number(),
  presetDictId: Joi.number(), // objet regroupant tous les Preset (simple, medium, hard)
  cardsId: Joi.array().items(Joi.number()),
})
