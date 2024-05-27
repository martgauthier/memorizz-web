const { User, PresetDict, Card } = require('../../models/user')
const {formidable} = require("formidable")

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

const addToCards = (req, res, userId) => {
  const user = User.getById(userId)
  let newImageId = new Date().getTime();
  const form = formidable({uploadDir:"./database/Images/"+userId,filename:(name, ext, part, form) => {
    return ""+newImageId+".png";
  } });

  form.parse(req, (err, fields, files) => {
    try{
      let newCard = Card.create({
        textValue:fields.name[0],
        imgValue: userId+"/"+newImageId+".png"
      });
      cards = user.cardsId
      cards.push(newCard.id)
      User.update(userId,{"cardsId":cards})
      res.status(200).json("OK")
    }catch(err){
      console.error(err)
      res.status(300).json("NOT OK")
    }
    
  });
}

module.exports = {
  getPresetDict, getCards, addToCards,
}
