export interface Identification {
    nom : string;
    prenom : string;
    id : number;
    src : string;
}

export interface PresetDict {
  simple: Preset,
  medium: Preset,
  hard: Preset
}

export interface Preset {
  /**
   * Number of pairs in the games. Must be positive integer
   */
  pairsNumber: number,
  /**
   * true if cards are both on their visible sides. false otherwise
   */
  cardsAreVisible: boolean,
  /**
   * true if a pair is constituted of two images cards. if false, one card is the image, and the other is text
   */
  cardsAreBothImage: boolean
}

export function createEmptyPresetStart() {
  return {pairsNumber: 0, cardsAreVisible: false, cardsAreBothImage: false};
}

export function createEmptyPresetDict() {
  return {
    simple: {
      pairsNumber: 0,
      cardsAreVisible: false,
      cardsAreBothImage: false
    },
    medium: {
      pairsNumber: 0,
      cardsAreVisible: false,
      cardsAreBothImage: false
    },
    hard: {
      pairsNumber: 0,
      cardsAreVisible: false,
      cardsAreBothImage: false
    }
  }
}

export interface Card {
  id: number
  /**
   * The text that represents what's on the card
   */
  textValue: string,
  /**
   * The url of the image of the card (that could be used in the "src" attribute of an img)
   */
  imgValue: string,

}
