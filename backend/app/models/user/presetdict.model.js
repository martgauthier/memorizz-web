const Joi = require('joi')
const BaseModel = require('../../utils/base-model.js')
const Preset = require('./preset.model')

module.exports = new BaseModel('PresetDict', {
  presetDictId: Joi.number(),
  simple: Preset.schema,
  medium: Preset.schema,
  hard: Preset.schema,
})
