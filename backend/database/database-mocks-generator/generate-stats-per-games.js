module.exports= (arrayOfTimestamps, userIds) => {
  let returnedObject = {}

  userIds.forEach(userid => {
    returnedObject[userid]={}

    for(let timestampAndDifficulty of arrayOfTimestamps) {
      returnedObject[userid][timestampAndDifficulty.timestamp]={
        "errorsOnWholeGame": Math.floor(Math.random() * 50),//entre 0 et 50
        "gameDuration": Math.floor(Math.random() * 400) + 500, //entre 500sec et 900sec
        "difficulty": timestampAndDifficulty.difficulty//"simple", "medium", ou "hard"
      }
    }
  })

  //fs.writeFileSync(`${__dirname}/../database/${process.env.DB_FOLDER ?? ''}stats-per-games.data.json`, JSON.stringify(returnedObject, null, 2), 'utf8')
  return returnedObject
}