const USER_CARDS=require("../user.data.json");

module.exports= (arrayOfTimestamps, userIds) => {
  let returnedObject = {}

  userIds.forEach(userid => {
    let cards_id = USER_CARDS.find((identification) => identification.id === userid).cardsId
    returnedObject[userid]={}


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