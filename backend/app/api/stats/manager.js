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



function getDateString(date) {
    //FOR DEBUG PURPOSES ONLY
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const currentDate = date ?? new Date();
    const dayOfMonth = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    return dayOfMonth + " " + months[monthIndex] + " " + date.getFullYear();
}

function respondWithFullGameCourbe(res, userid, stattype, duration) {
    if(!Object.keys(StatsPerGamesManager.getData()).includes(userid)) {
        res.status(400).json({
            "message": "Specified user doesn't have stat !"
        });
        return;
    }


    let currentTimestamp=new Date()

    currentTimestamp.setHours(23, 59)//set current timestamp hour to maximum hour of the current day

    let lastDateTimestamp=new Date()
    lastDateTimestamp.setDate(lastDateTimestamp.getDate()-1)
    lastDateTimestamp.setMonth(lastDateTimestamp.getMonth() - duration)
    lastDateTimestamp.setHours(0,1)

    let numbersOfIndexes=Math.ceil((currentTimestamp.getTime() - lastDateTimestamp.getTime()) / 86400000);//un index par jour

    let results = {
        simple: [],
        medium: [],
        hard: []
    };

    for(let i=0; i < numbersOfIndexes; i++) {
        //set min timestamp to 00h01 and max timestamp to 23h59 for the same day, to retrieve all games in this range
        let minDayTimestamp=new Date(lastDateTimestamp);
        minDayTimestamp.setDate(lastDateTimestamp.getDate()+i);
        let maxDayTimestamp=new Date(minDayTimestamp);
        maxDayTimestamp.setHours(23,59);
        let todaySum = {//variable used if there are more than one game this day
            simple: 0,
            medium: 0,
            hard: 0
        }

        for(let timestampKey of Object.keys(StatsPerGamesManager.getData()[userid])) {//pour toutes les parties (on filtrera pour garder celles du jour uniquement)
            if(minDayTimestamp.getTime() <= parseInt(timestampKey) && parseInt(timestampKey) <= maxDayTimestamp.getTime()) {//if game is in the day range
                let gameData=StatsPerGamesManager.getData()[userid][timestampKey];
                todaySum[gameData.difficulty]+=gameData[stattype];
            }
        }

        Object.entries(todaySum).forEach(entry => {//ajouter le résultat de ce jour au tableau
            results[entry[0]][i]=(entry[1] !== 0) ? entry[1] : 0;//si il n'y a pas eu de parties pour ce jour, renvoyer undefined
        });
    }


    res.status(200).json(results);
}


function respondWithCardCourbe(res, userid, cardid, stattype, duration) {
    if(!Object.keys(StatsPerCardsManager.getData()).includes(userid)) {
        res.status(400).json({
            "message": "Specified user doesn't have stat !"
        });
        return;
    }
    if(cardid !=="0" && !Object.keys(StatsPerCardsManager.getData()[userid]).includes(cardid)) {
        res.status(400).json({
            "message": "Specified user doesn't have stat for this card !" + cardid
        });
        return;
    }
    if(!CARDS_STATS_TYPES.includes(stattype)) {
        res.status(400).json({
            "message": "Specified stat type doesn't exist ! " + stattype
        })
        return;
    }

    let results={
        simple: [],
        medium: [],
        hard: []
    }

    let currentTimestamp=new Date()

    currentTimestamp.setHours(23, 59)//set current timestamp hour to maximum hour of the current day

    let lastDateTimestamp=new Date()
    lastDateTimestamp.setDate(lastDateTimestamp.getDate()-1)
    lastDateTimestamp.setMonth(lastDateTimestamp.getMonth() - duration)
    lastDateTimestamp.setHours(0,1)

    let numbersOfIndexes=Math.ceil((currentTimestamp.getTime() - lastDateTimestamp.getTime()) / 86400000);//un index par jour

    if(cardid==="0") {//cas "en moyenne"
        for(let i=0; i < numbersOfIndexes; i++) {
            //set min timestamp to 00h01 and max timestamp to 23h59 for the same day, to retrieve all games in this range
            let minDayTimestamp=new Date(lastDateTimestamp);
            minDayTimestamp.setDate(lastDateTimestamp.getDate()+i);
            let maxDayTimestamp=new Date(minDayTimestamp);
            maxDayTimestamp.setHours(23,59);
            let todaySum = {//variable used if there are more than one game this day
                simple: {
                    sum: 0,
                    denominateur: 0
                },
                medium: {
                    sum: 0,
                    denominateur: 0
                },
                hard: {
                    sum: 0,
                    denominateur: 0
                }
            }

            for(let cardkey of Object.keys(StatsPerCardsManager.getData()[userid])) {
                for (let timestampKey of Object.keys(StatsPerCardsManager.getData()[userid][cardkey])) {//pour toutes les parties (on filtrera pour garder celles du jour uniquement)
                    if (minDayTimestamp.getTime() <= parseInt(timestampKey) && parseInt(timestampKey) <= maxDayTimestamp.getTime()) {//if game is in the day range
                        let gameData = StatsPerCardsManager.getData()[userid][cardkey][timestampKey];
                        todaySum[gameData.difficulty].sum += gameData[stattype];
                        todaySum[gameData.difficulty].denominateur++;
                    }
                }
            }

            Object.keys(todaySum).forEach(key => {
                todaySum[key]=(todaySum[key].denominateur !== 0) ? todaySum[key].sum / todaySum[key].denominateur : 0;//on remplace les "sum" et "denominateur" par la moyenne effectivement calculée
            })

            Object.entries(todaySum).forEach(entry => {//ajouter le résultat de ce jour au tableau
                results[entry[0]][i]=(entry[1] !== 0) ? entry[1] : 0;//si il n'y a pas eu de parties pour ce jour, renvoyer undefined
            });
        }
    }
    else {
        for(let i=0; i < numbersOfIndexes; i++) {
            //set min timestamp to 00h01 and max timestamp to 23h59 for the same day, to retrieve all games in this range
            let minDayTimestamp=new Date(lastDateTimestamp);
            minDayTimestamp.setDate(lastDateTimestamp.getDate()+i);
            let maxDayTimestamp=new Date(minDayTimestamp);
            maxDayTimestamp.setHours(23,59);
            let todaySum = {//variable used if there are more than one game this day
                simple: 0,
                medium: 0,
                hard: 0
            }

            for(let timestampKey of Object.keys(StatsPerCardsManager.getData()[userid][cardid])) {//pour toutes les parties (on filtrera pour garder celles du jour uniquement)
                if(minDayTimestamp.getTime() <= parseInt(timestampKey) && parseInt(timestampKey) <= maxDayTimestamp.getTime()) {//if game is in the day range
                    let gameData=StatsPerCardsManager.getData()[userid][cardid][timestampKey];
                    todaySum[gameData.difficulty]+=gameData[stattype];
                }
            }

            Object.entries(todaySum).forEach(entry => {//ajouter le résultat de ce jour au tableau
                results[entry[0]][i]=(entry[1] !== 0) ? entry[1] : 0;//si il n'y a pas eu de parties pour ce jour, renvoyer undefined
            });
        }
    }

    res.status(200).json(results)
}




function respondToPostGameData(req, res) {
    let bodyKeys=Object.keys(req.body)
    if(!bodyKeys.includes("userid") || !bodyKeys.includes("gameDuration") || !bodyKeys.includes("difficulty")) {
        res.status(400).json({
            "message": "Incorrect request ! You're either missing 'userid' or 'duration' or 'difficulty' in JSON Body !"
        });
        return;
    }

    console.log("POST BODY:", req.body)

    StatsPerCardsManager.addStatForCards(req.body);
    StatsPerGamesManager.addStatForGame(req.body);
    res.status(201).json()
}

module.exports = {respondWithCardStat, respondWithGameStat, respondToPostGameData, respondWithFullGameCourbe, respondWithCardCourbe}