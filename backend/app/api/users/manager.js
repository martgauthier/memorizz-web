const { User, PresetDict, Card } = require('../../models/user')

const getPresetDict = (userId) => {
  const user = User.getById(userId)
  const presetdictId = parseInt(user.presetDictId, 10)
  return PresetDict.get().find((item) => item.id === presetdictId)
}

const getCards = (userId) => {
  const user = User.getById(userId)
  const cardsid = user.cardsId
  return Card.get().filter((item) => cardsid.includes(item.id))
}

const updatePresetDict = (newPresetDict) => {
  PresetDict.update(newPresetDict.id, newPresetDict);
}

module.exports = {
  getPresetDict, getCards,
}
