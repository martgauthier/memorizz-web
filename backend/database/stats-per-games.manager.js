const {StatPerGamesData} = require("./database-mocks-generator/generate-stats-mocked-databases");

//https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

module.exports = class {
    static items = StatPerGamesData

    static addStatForGame(body) {
        let currentTimestamp=new Date().getTime().toString()

        let userid=body.userid.toString()



        if(this.items[userid] === undefined) this.items[userid]={};

        let errorsSum=0

        for(let key of Object.keys(body)) {
            if(isNumeric(key)) {//then it's a card id
                errorsSum+=body[key].errorsPerGame
            }
        }

        this.items[userid][currentTimestamp]={
            "errorsOnWholeGame": errorsSum,
            "gameDuration": parseInt(body.gameDuration),
            "difficulty": body.difficulty
        }
    }

    static getData() {
        return this.items
    }
}