const StatPerGamesData = require("./stats-per-games.data.json");

module.exports = class {
    static items = StatPerGamesData

    static addStatForGame(userid) {
        //TODO: receive POST data and add it to items
    }

    static getData() {
        return this.items
    }
}