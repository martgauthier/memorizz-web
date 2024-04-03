import {Card, Identification, PresetDict} from "src/models/user.model";

const JACQUELINE_IDENTIFICATION : Identification = {
    nom : "STADCAT",
    prenom : "Jacqueline",
    id : 0
}


const JEANMICHEL_IDENTIFICATION: Identification = {
  nom: "STADECISSE",
  prenom: "Jean-michel",
  id: 1
}

export const USER_IDENTIFICATIONS=[JACQUELINE_IDENTIFICATION, JEANMICHEL_IDENTIFICATION];
export const AVAILABLE_CARDS: Card[][]=[

  [{
    textValue: "premiere carte jacqueline",
    imgValue: "srcPremiereImage",
    id: 1
  },
    {
      textValue: "deuxieme carte jacqueline",
      imgValue: "srcDeuxiemeImage",
      id: 2
    }],//jacqueline
  [{
    textValue: "premiere carte jean michel",
    imgValue: "src1JeanMichel",
    id: 1
  },
    {
      textValue: "deuxieme carte jean michel",
      imgValue: "src2JeanMichel",
      id: 2
    }]//jean michel
]

export const PRESET_DICTS: PresetDict[] = [
  {
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
  },
  {
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
      pairsNumber: 9
    }
  }
]
