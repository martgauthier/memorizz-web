const { User, PresetDict, Card, Identification, Preset} = require('../../models/user')
const {formidable} = require("formidable")
const fs = require("fs");
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

function createEmptyPresetDict() {
  let simple = Preset.create({
    pairsNumber : 0,
    cardsAreVisible : false,
    cardsAreBothImage : false
  });
  let med = Preset.create({
    pairsNumber : 0,
    cardsAreVisible : false,
    cardsAreBothImage : false
  });
  let hard = Preset.create({
    pairsNumber : 0,
    cardsAreVisible : false,
    cardsAreBothImage : false
  });
  let presetDictId = new Date().getTime();
  let presetDict = PresetDict.create({
    id: presetDictId,
    simple: simple,
    medium: med,
    hard: hard,
  });
  return presetDictId;
}

const addUser = (req, res) => {
  let UserId = new Date().getTime();
  //créer le dossier associé au patient
  if (!fs.existsSync('./database/Images/'+UserId)){
    fs.mkdirSync('./database/Images/'+UserId);
  }
  const form = formidable({uploadDir:"./database/Images/"+UserId,filename:(name, ext, part, form) => {
      return "pfp.png";
    } });

  form.parse(req, (err, fields, files) => {
    try{
      console.log("fields : "+fields);
      let identification = Identification.create({
        nom:fields.surname[0],
        prenom:fields.name[0],
        id: UserId,
        src: UserId+"/pfp.png"
      })
      let newUser = User.create({
        id:UserId,
        preseDictId : createEmptyPresetDict(),
        cardsId : []
      });
      res.status(200).json("OK")
    }catch(err){
      console.error(err)
      res.status(300).json("NOT OK")
    }

  });
}

module.exports = {
  getPresetDict, getCards, addToCards, addUser,
}
