const BaseModel = require('../../utils/base-model.js')
const Preset = require('./preset.model')

module.exports = new BaseModel('PresetDict', {
  simple: Preset,
  medium: Preset,
  hard: Preset,
})
