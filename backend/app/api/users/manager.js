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
  let newId = new Date().getTime();
  const form = formidable({uploadDir:"./database/Images/"+userId,filename:(name, ext, part, form) => {
    return ""+newId+".png";
  } });

  form.parse(req, (err, fields, files) => {
    try{
      let newCard = Card.create({
        id : newId,
        textValue:fields.name[0],
        imgValue:"/"+userId+"/"+newId+".png"
      });
      user.cardsId.push(newCard.id)
      res.status(200).json("OK")
    }catch(err){
      res.status(300).json("NOT OK")
    }
    
  });
}

module.exports = {
  getPresetDict, getCards, addToCards,
}
