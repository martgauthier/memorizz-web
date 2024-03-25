import {Card, Identification, PresetDict} from "src/models/user.model";

export const JACQUELINE_IDENTIFICATION : Identification = {
    nom : "STADCAT",
    prenom : "Jacqueline",
    id : 1
}

export const JACQUELINE_PRESET_DICT : PresetDict = {
  simple: {
    cardsAreBothImage: true,
    cardsAreVisible: true,
    pairsNumber: 3
  },
  medium: {
    cardsAreBothImage: true,
    cardsAreVisible: false,
    pairsNumber: 5
  },
  hard: {
    cardsAreBothImage: false,
    cardsAreVisible: false,
    pairsNumber: 8
  }
}

export const JACQUELINE_AVAILABLE_CARDS: Card[] = [{
  textValue: "premiere carte jacqueline",
  imgValue: "srcPremiereImage"
},
  {
    textValue: "deuxieme carte jacqueline",
    imgValue: "srcDeuxiemeImage"
  },
]



export const JEANMICHEL_IDENTIFICATION: Identification = {
  nom: "STADECISSE",
  prenom: "Jean-michel",
  id: 2
}

export const JEANMICHEL_PRESET_DICT: PresetDict = {
  simple: {
    cardsAreBothImage: true,
    cardsAreVisible: true,
    pairsNumber: 4
  },
  medium: {
    cardsAreBothImage: true,
    cardsAreVisible: false,
    pairsNumber: 6
  },
  hard: {
    cardsAreBothImage: false,
    cardsAreVisible: false,
    pairsNumber: 8
  }
}

export const JEANMICHEL_AVAILABLE_CARDS: Card[] = [
  {
    textValue: "premiere carte jean michel",
    imgValue: "src1JeanMichel"
  },
  {
    textValue: "deuxieme carte jean michel",
    imgValue: "src2JeanMichel"
  }
]
