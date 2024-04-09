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
    textValue: "Ma maison",
    imgValue: "assets/maison_jacqueline.png",
    id: 1
  },
    {
      textValue: "Rantanplan",
      imgValue: "assets/rantanplan.png",
      id: 2
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 3
    }],//jacqueline
  [{
    textValue: "Marine",
    imgValue: "assets/marine.png",
    id: 1
  },
    {
      textValue: "Ma voiture",
      imgValue: "assets/voitureJeanMich.png",
      id: 2
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 3
    },
    {
      textValue: "ma maison",
      imgValue: "assets/maison.png",
      id: 4
    },
    {
      textValue: "george",
      imgValue: "assets/george.png",
      id: 5
    },
    {
      textValue: "Mon chien, Rantanplan",
      imgValue: "assets/rantanplan.png",
      id: 6
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
      pairsNumber: 8
    }
  }
]
