const StatsPerCardsManager=require("../../../database/stats-per-cards.manager");
const StatsPerGamesManager=require("../../../database/stats-per-games.manager");


const CARDS_STATS_TYPES=["errorsPerGame", "timeToDiscoverFullPair"]
const GAMES_STATS_TYPES=["preferredDifficultyMode", "errorsOnWholeGame", "gameDuration"]

const respondWithCardStat = (res, userid, idcarte, stattype, duration) => {
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

    if(userid==="0") {
        userid="1"//replace the first user calculus by the first user. SUITABLE FOR DEVELOPMENT ONLY TODO remove it
    }



    if(!Object.keys(StatsPerCardsManager.getData()).includes(userid)) {
        res.status(400).json({
            "message": "Specified user doesn't have stat !"
        });
        return;
    }
    if(idcarte!=="0" && !Object.keys(StatsPerCardsManager.getData()[userid]).includes(idcarte)) {
        res.status(400).json({
            "message": "Specified user doesn't have stat for this card !" + idcarte
        });
        return;
    }
    if(!CARDS_STATS_TYPES.includes(stattype)) {
        res.status(400).json({
            "message": "Specified stat type doesn't exist ! " + stattype
        })
        return;
    }

    if(idcarte!=="0") {
        //keep only keys that are in the two-week-range around last time and now
        lastTimeDatasKeys = Object.keys(StatsPerCardsManager.getData()[userid][idcarte]).filter(value => lastTimeDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= lastTimeDateRange[1].getTime())
        nowDatasKeys = Object.keys(StatsPerCardsManager.getData()[userid][idcarte]).filter(value => nowDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= nowDateRange[1].getTime())
    }
    else {//cas "en moyenne"
        for(let indexCarte of Object.keys(StatsPerCardsManager.getData()[userid])) {
            lastTimeDatasKeys = [...lastTimeDatasKeys, {
                indexCarte: indexCarte,
                timestamps: Object.keys(StatsPerCardsManager.getData()[userid][indexCarte]).filter(value => lastTimeDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= lastTimeDateRange[1].getTime())
            }];
            nowDatasKeys = [...nowDatasKeys, {
                indexCarte: indexCarte,
                timestamps: Object.keys(StatsPerCardsManager.getData()[userid][indexCarte]).filter(value => nowDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= nowDateRange[1].getTime())
            }];
        }
    }

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

    if(idcarte!=="0") {
        for (let key of lastTimeDatasKeys) {
            let selectedStat = StatsPerCardsManager.getData()[userid][idcarte][key]

            lastTimeMeans[selectedStat.difficulty].mean = lastTimeMeans[selectedStat.difficulty].mean + selectedStat[stattype]
            lastTimeMeans[selectedStat.difficulty].denominateur++;
        }
    }
    else {//cas "en moyenne"
        for(let cardIndexAndTimestamps of Object.values(lastTimeDatasKeys)) {
            for(let key of cardIndexAndTimestamps.timestamps) {
                let selectedStat = StatsPerCardsManager.getData()[userid][cardIndexAndTimestamps.indexCarte][key]

                lastTimeMeans[selectedStat.difficulty].mean = lastTimeMeans[selectedStat.difficulty].mean + selectedStat[stattype]
                lastTimeMeans[selectedStat.difficulty].denominateur++;
            }
        }
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

    if(idcarte!=="0") {
        for (let key of nowDatasKeys) {
            let selectedStat = StatsPerCardsManager.getData()[userid][idcarte][key]
            if(userid==="1" && idcarte==="6") {
                console.log("nowMeans selected stat for key : " + key)
                console.log(selectedStat[stattype])
            }

            nowMeans[selectedStat.difficulty].mean = nowMeans[selectedStat.difficulty].mean + selectedStat[stattype]
            nowMeans[selectedStat.difficulty].denominateur++;
        }
    }
    else {//cas "en moyenne"
        for(let cardIndexAndTimestamps of Object.values(nowDatasKeys)) {
            for(let key of cardIndexAndTimestamps.timestamps) {
                let selectedStat = StatsPerCardsManager.getData()[userid][cardIndexAndTimestamps.indexCarte][key]

                nowMeans[selectedStat.difficulty].mean = nowMeans[selectedStat.difficulty].mean + selectedStat[stattype]
                nowMeans[selectedStat.difficulty].denominateur++;
            }
        }
    }

    if(userid==="1" && idcarte==="6") {
        console.log("DEBUG nowMeans")
        console.log(nowMeans)
    }

    let returnedObject = {
        simple: {
            lastTimeValue: (lastTimeMeans.simple.denominateur !== 0) ? lastTimeMeans.simple.mean / lastTimeMeans.simple.denominateur : 0,
            nowValue: (nowMeans.simple.denominateur !== 0) ? nowMeans.simple.mean / nowMeans.simple.denominateur : 0
        },
        medium: {
            lastTimeValue: (lastTimeMeans.medium.denominateur !== 0) ? lastTimeMeans.medium.mean / lastTimeMeans.medium.denominateur : 0,
            nowValue: (nowMeans.medium.denominateur !== 0) ? nowMeans.medium.mean / nowMeans.medium.denominateur : 0
        },
        hard: {
            lastTimeValue: (lastTimeMeans.hard.denominateur !== 0) ? lastTimeMeans.hard.mean / lastTimeMeans.hard.denominateur : 0,
            nowValue: (nowMeans.hard.denominateur !== 0) ? nowMeans.hard.mean / nowMeans.hard.denominateur : 0
        }
    }

    if(stattype==="timeToDiscoverFullPair") {
        for(let key of Object.keys(returnedObject)) {
            for(let valueIndex of ["lastTimeValue", "nowValue"]) {
                returnedObject[key][valueIndex]/=60
            }
        }
    }

    res.status(200).json({
        statType: stattype,
        duration: duration,//as front end needs minutes stored with decimals
        difficulty: {
            ...returnedObject
        }
    });
};

const respondWithGameStat = (res, userid, stattype, duration) => {
    if(userid==="0") {
        userid="1"//replace the first user calculus by the first user. SUITABLE FOR DEVELOPMENT ONLY TODO remove it
    }

    if(!Object.keys(StatsPerGamesManager.getData()).includes(userid)) {
        res.status(400).json({
            "message": "Specified user doesn't have stat !"
        });
        return;
    }
    if(!GAMES_STATS_TYPES.includes(stattype)) {
        res.status(400).json({
            "message": "Specified stat type doesn't exist ! " + stattype
        });
        return;
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
        lastTimeDatasKeys = Object.keys(StatsPerGamesManager.getData()[userid]).filter(value => lastTimeDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= lastTimeDateRange[1].getTime())
        nowDatasKeys = Object.keys(StatsPerGamesManager.getData()[userid]).filter(value => nowDateRange[0].getTime() <= parseInt(value) && parseInt(value) <= nowDateRange[1].getTime())

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
            let selectedStat=StatsPerGamesManager.getData()[userid][key]

            lastTimeMeans[selectedStat.difficulty].mean=lastTimeMeans[selectedStat.difficulty].mean + selectedStat[stattype]
            lastTimeMeans[selectedStat.difficulty].denominateur++;
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
            let selectedStat=StatsPerGamesManager.getData()[userid][key]

            nowMeans[selectedStat.difficulty].mean=nowMeans[selectedStat.difficulty].mean + selectedStat[stattype]
            nowMeans[selectedStat.difficulty].denominateur++;
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

        if(stattype==="gameDuration") {
            for(let key of Object.keys(returnedObject)) {
                for(let valueIndex of ["lastTimeValue", "nowValue"]) {
                    returnedObject[key][valueIndex]/=60
                }
            }
        }

        res.status(200).json({
            statType: stattype,
            duration: parseInt(duration),
            difficulty: {
                ...returnedObject
            }
        });
    }
    else {//we are in the specific case "preferred difficulty mode"
        let nowTimestamp=Date.now()
        let lastTimestamp=new Date()
        lastTimestamp.setDate(lastTimestamp.getDate() - 31 * duration)
        lastTimestamp=lastTimestamp.getTime()

        let keysInRange=Object.keys(StatsPerGamesManager.getData()[userid]).filter(value => lastTimestamp <= parseInt(value) && parseInt(value) <= nowTimestamp)

        let difficultiesCounterMap = {
            simple: 0,
            medium: 0,
            hard: 0,
        }

        for(let key of keysInRange) {
            difficultiesCounterMap[StatsPerGamesManager.getData()[userid][key].difficulty]++
        }

        res.status(200).json(difficultiesCounterMap)
    }
}





function respondToPostGameData(req, res) {
    let bodyKeys=Object.keys(req.body)
    if(!bodyKeys.includes("userid") || !bodyKeys.includes("gameDuration") || !bodyKeys.includes("difficulty")) {
        res.status(400).json({
            "message": "Incorrect request ! You're either missing 'userid' or 'duration' or 'difficulty' in JSON Body !"
        });
        return;
    }

    StatsPerCardsManager.addStatForCards(req.body);
    StatsPerGamesManager.addStatForGame(req.body);
    res.status(201).json()
}

module.exports = {respondWithCardStat, respondWithGameStat, respondToPostGameData}