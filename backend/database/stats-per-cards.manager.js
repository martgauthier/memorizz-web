const StatPerCardsData = require("./stats-per-cards.data.json");

module.exports = class {
    static items = StatPerCardsData

    static addStatForCard(userid, cardid) {
        //TODO: receive POST data and add it to items
    }

    static getData() {
        return this.items
    }
}