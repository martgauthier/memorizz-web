const StatsPerCardData=require("../../../database/stats-per-cards.data.json");
const StatsPerGameData=require("../../../database/stats-per-games.data.json");


const CARDS_STATS_TYPES=["errorsPerGame", "timeToDiscoverFullPair"]
const GAMES_STATS_TYPES=["preferredDifficultyMode", "errorsOnWholeGame", "gameDuration"]

/**
 *
 * @param userid
 * @param idcarte
 * @param stattype
 * @param duration number in months
 * @returns {{nowMeans: {simple: {denominateur: number, mean: number}, medium: {denominateur: number, mean: number}, hard: {denominateur: number, mean: number}}, lastTimeMeans: {simple: {denominateur: number, mean: number}, medium: {denominateur: number, mean: number}, hard: {denominateur: number, mean: number}}}}
 */
const getCardStat = (userid, idcarte, stattype, duration) => {
    let lastTimeDatasKeys=[];
    let nowDatasKeys=[];

    userid=userid.toString()
    idcarte=idcarte.toString()
    duration=duration.toString()

    let nowDateRange=[new Date(), new Date()]
    let lastTimeDateRange=[new Date(), new Date()]
    lastTimeDateRange[0].setDate(lastTimeDateRange[0].getDate() - duration * 31 - 14)//set it to last time minus two weeks
    lastTimeDateRange[1].setDate(lastTimeDateRange[1].getDate() - duration * 31)//set it to last time

    nowDateRange[0].setDate(nowDateRange[0].getDate() - 14)//set it to now time minus two weeks

    if(!Object.keys(StatsPerCardData).includes(userid)) {
        return {
            "message": "Specified user doesn't have stat !"
        }
    }
    if(!Object.keys(StatsPerCardData[userid]).includes(idcarte)) {
        return {
            "message": "Specified user doesn't have stat for this card !"
        }
    }
    if(!CARDS_STATS_TYPES.includes(stattype)) {
        return {
            "message": "Specified stat type doesn't exist !"
        }
    }


    //keep only keys that are in the two-week-range around last time and now
    lastTimeDatasKeys=Object.keys(StatsPerCardData[userid][idcarte]).filter(value => lastTimeDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= lastTimeDateRange[1].getTime())
    nowDatasKeys=Object.keys(StatsPerCardData[userid][idcarte]).filter(value => nowDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= nowDateRange[1].getTime())

    let lastTimeMeans = {
        simple: {
            mean: 0,
            denominateur: 0
        },
        medium: {
            mean: 0,
            denominateur: 0
        },
        hard: {
            mean: 0,
            denominateur: 0
        }
    }

    for(let key of lastTimeDatasKeys) {
        let selectedStat=StatsPerCardData[userid][idcarte][key]

        lastTimeMeans[selectedStat.difficulty].mean=(lastTimeMeans[selectedStat.difficulty].mean*lastTimeMeans[selectedStat.difficulty].denominateur + selectedStat[stattype])/++(lastTimeMeans[selectedStat.difficulty].denominateur)
    }

    let nowMeans = {
        simple: {
            mean: 0,
            denominateur: 0
        },
        medium: {
            mean: 0,
            denominateur: 0
        },
        hard: {
            mean: 0,
            denominateur: 0
        }
    }

    for(let key of nowDatasKeys) {
        let selectedStat=StatsPerCardData[userid][idcarte][key]

        nowMeans[selectedStat.difficulty].mean=(nowMeans[selectedStat.difficulty].mean * nowMeans[selectedStat.difficulty].denominateur + selectedStat[stattype])/++(nowMeans[selectedStat.difficulty].denominateur)
    }

    let returnedObject = {
        simple: {
            lastTimeValue: lastTimeMeans.simple.mean / lastTimeMeans.simple.denominateur,
            nowValue: nowMeans.simple.mean / nowMeans.simple.denominateur
        },
        medium: {
            lastTimeValue: lastTimeMeans.medium.mean / lastTimeMeans.medium.denominateur,
            nowValue: nowMeans.medium.mean / nowMeans.medium.denominateur
        },
        hard: {
            lastTimeValue: lastTimeMeans.hard.mean / lastTimeMeans.hard.denominateur,
            nowValue: nowMeans.hard.mean / nowMeans.hard.denominateur
        }
    }

    return {
        statType: stattype,
        duration: parseInt(duration),
        difficulty: {
            ...returnedObject
        }
    }
};

const getGameStat = (userid, stattype, duration) => {
    if(!Object.keys(StatsPerGameData).includes(userid)) {
        return {
            "message": "Specified user doesn't have stat !"
        }
    }
    if(stattype!=="preferredDifficultyMode") {
        let lastTimeDatasKeys = [];
        let nowDatasKeys = [];

        let nowDateRange = [new Date(), new Date()]
        let lastTimeDateRange = [new Date(), new Date()]
        lastTimeDateRange[0].setDate(lastTimeDateRange[0].getDate() - duration * 31 - 14)//set it to last time minus two weeks
        lastTimeDateRange[1].setDate(lastTimeDateRange[1].getDate() - duration * 31)//set it to last time

        nowDateRange[0].setDate(nowDateRange[0].getDate() - 14)//set it to now time minus two weeks

        //keep only keys that are in the two-week-range around last time and now
        lastTimeDatasKeys = Object.keys(StatsPerGameData[userid]).filter(value => lastTimeDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= lastTimeDateRange[1].getTime())
        nowDatasKeys = Object.keys(StatsPerGameData[userid]).filter(value => nowDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= nowDateRange[1].getTime())

        let lastTimeMeans = {
            simple: {
                mean: 0,
                denominateur: 0
            },
            medium: {
                mean: 0,
                denominateur: 0
            },
            hard: {
                mean: 0,
                denominateur: 0
            }
        }

        for(let key of lastTimeDatasKeys) {
            let selectedStat=StatsPerGameData[userid][key]

            lastTimeMeans[selectedStat.difficulty].mean=(lastTimeMeans[selectedStat.difficulty].mean*lastTimeMeans[selectedStat.difficulty].denominateur + selectedStat[stattype])/++(lastTimeMeans[selectedStat.difficulty].denominateur)
        }

        let nowMeans = {
            simple: {
                mean: 0,
                denominateur: 0
            },
            medium: {
                mean: 0,
                denominateur: 0
            },
            hard: {
                mean: 0,
                denominateur: 0
            }
        }

        for(let key of nowDatasKeys) {
            let selectedStat=StatsPerGameData[userid][key]

            nowMeans[selectedStat.difficulty].mean=(nowMeans[selectedStat.difficulty].mean * nowMeans[selectedStat.difficulty].denominateur + selectedStat[stattype])/++(nowMeans[selectedStat.difficulty].denominateur)
        }

        let returnedObject = {
            simple: {
                lastTimeValue: lastTimeMeans.simple.mean / lastTimeMeans.simple.denominateur,
                nowValue: nowMeans.simple.mean / nowMeans.simple.denominateur
            },
            medium: {
                lastTimeValue: lastTimeMeans.medium.mean / lastTimeMeans.medium.denominateur,
                nowValue: nowMeans.medium.mean / nowMeans.medium.denominateur
            },
            hard: {
                lastTimeValue: lastTimeMeans.hard.mean / lastTimeMeans.hard.denominateur,
                nowValue: nowMeans.hard.mean / nowMeans.hard.denominateur
            }
        }

        return {
            statType: stattype,
            duration: parseInt(duration),
            difficulty: {
                ...returnedObject
            }
        }
    }
    else {//we are in the specific case "preferred difficulty mode"
        let nowTimestamp=Date.now()
        let lastTimestamp=new Date()
        lastTimestamp.setDate(lastTimestamp.getDate() - 31 * duration)
        lastTimestamp=lastTimestamp.getTime()
        console.log(lastTimestamp)

        let keysInRange=Object.keys(StatsPerGameData[userid]).filter(value => lastTimestamp <= parseInt(value) && parseInt(value) <= nowTimestamp)

        let difficultiesCounterMap = {
            simple: 0,
            medium: 0,
            hard: 0,
        }

        for(let key of keysInRange) {
            difficultiesCounterMap[StatsPerGameData[userid][key].difficulty]++
        }

        return difficultiesCounterMap
    }
}

module.exports = {getCardStat, getGameStat}