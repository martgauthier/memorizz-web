import {Card, Identification, PresetDict} from "src/models/user.model";

const JACQUELINE_IDENTIFICATION : Identification = {
    nom : "STADCAT",
    prenom : "Jacqueline",
    id : 0,
    src : "/assets/marine.png"
}


const JEANMICHEL_IDENTIFICATION: Identification = {
  nom: "STADECISSE",
  prenom: "Jean-michel",
  id: 1,
  src: "/assets/icon.png"
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
    }]//jean michel
]

export const PROFILS_LIST : Identification[][] = [
  [JACQUELINE_IDENTIFICATION,JEANMICHEL_IDENTIFICATION,
  ],//Soignante 0 à ces trois profils
  [
    JACQUELINE_IDENTIFICATION,JEANMICHEL_IDENTIFICATION,
    {
      nom: "RICHARD",
      prenom: "Jules",
      id: 0,
      src: "/assets/icon.png"
    },
    {
      nom: "JULES",
      prenom: "Richard",
      id: 1,
      src: "/assets/icon.png"
    }
  ] //Soignant 1 à ces profils
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
