const generateStatsPerCards = require("./generate-stats-per-cards")
const generateStatsPerGames = require("./generate-stats-per-games")
const IDENTIFICATIONS=require("../identification.data")

const FIRST_TIMESTAMP_TO_GENERATE_FROM = 1684234879533 // 16 mai 2023, il y a plus d'un an

const POSSIBLE_DIFFICULTIES = ["simple", "medium", "hard"]


const arrayOfTimestamps=[
    {
        timestamp: FIRST_TIMESTAMP_TO_GENERATE_FROM,
        difficulty: "simple"
    }];

//crééons 400 parties, jouées depuis 1 an
for(let i = 0; i < 400; i++) {
    let lastTimestamp=arrayOfTimestamps[arrayOfTimestamps.length-1].timestamp

    let randomTimestampSurplus=(Math.random() > 0.8) ? 64800000 : 86400000 //1/5 chance of adding 18hours, 4/5 chance of adding a full day before next game
    let newLastTimestamp=Math.min(new Date().getTime(), lastTimestamp + randomTimestampSurplus)
    arrayOfTimestamps.push({
        timestamp: newLastTimestamp,
        difficulty: POSSIBLE_DIFFICULTIES[Math.floor(Math.random() * 3)]
    })
}


const USER_IDS = []
IDENTIFICATIONS.forEach(id => {
    USER_IDS.push(id.userId)
})

module.exports={
    StatsPerCardsData: generateStatsPerCards(arrayOfTimestamps, USER_IDS),
    StatsPerGamesData: generateStatsPerGames(arrayOfTimestamps, USER_IDS)
}