const fs = require("fs");
module.exports= (arrayOfTimestamps, userIds) => {
  let returnedObject = {}

  userIds.forEach(userid => {
    let cards_id = []
    returnedObject[userid]={}
    for(let i = 0; i < 7; i++) {
      let card_id = Math.floor(Math.random() * 100)
      while(cards_id.includes(card_id)) {
        card_id = Math.floor(Math.random() * 100)
      }
      cards_id.push(card_id)
    }

    for(let timestampAndDifficulty of arrayOfTimestamps) {
      for (let cardId of cards_id) {
        if(!returnedObject[userid][cardId]) returnedObject[userid][cardId]={}
        returnedObject[userid][cardId][timestampAndDifficulty.timestamp]={
          "errorsPerGame": Math.floor(Math.random() * 50),//entre 0 et 50
          "timeToDiscoverFullPair": Math.floor(Math.random() * 100) + 60, //entre 60sec et 160 sec
          "difficulty": timestampAndDifficulty.difficulty//"simple", "medium", ou "hard"
        }
      }
    }
  })

  //fs.writeFileSync(`${__dirname}/../database/${process.env.DB_FOLDER ?? ''}stats-per-cards.data.json`, JSON.stringify(returnedObject, null, 2), 'utf8')
  return returnedObject
}