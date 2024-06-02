const {StatPerCardsData} = require("./database-mocks-generator/generate-stats-mocked-databases");


//https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

module.exports = class {
    static items = StatPerCardsData

    static addStatForCards(body) {
        let timestamp=new Date().getTime().toString()

        if(this.items[body.userid.toString()] === undefined) this.items[body.userid.toString()]={};

        for(let key of Object.keys(body)) {
            if(isNumeric(key)) {//then it's a card id
                if(this.items[body.userid.toString()][key] === undefined) this.items[body.userid.toString()][key]={};

                this.items[body.userid.toString()][key][timestamp]={
                    ...body[key],
                    "difficulty": body.difficulty
                }
            }
        }
    }

    static getData() {
        return this.items
    }
}