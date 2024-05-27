const { User, PresetDict, Card } = require('../../models/user')
const {formidable} = require("formidable")

const getPresetDict = (userId) => {
  const user = User.getById(userId)
  const presetdictId = parseInt(user.presetDictId, 10)
  return PresetDict.get().find((item) => item.presetDictId === presetdictId)
}

const getCards = (userId) => {
  const user = User.getById(userId)
  const cardsid = user.cardsId
  return Card.get().filter((item) => cardsid.includes(item.cardId))
}

const addToCards = (req, res, userId) => {
  const user = User.getById(userId)
  let cardsid = user.cardsId

  const form = formidable({uploadDir:"/database/Images/"+userId,filename:(name, ext, part, form) => {
      return ""+Card.get().length+1+ext;
  } });


  form.parse(req, (err, fields, files) => {
    console.log('fields:', fields);
    console.log('files:', files);
    /*let newCard = Card.create(Card.get().length+1,fields.name,files.image.path)
    user.cardsId.push(newCard.id)*/
    res.status(200).json("OK")
  });
  return true;
}

module.exports = {
  getPresetDict, getCards, addToCards,
}
