import {Card, Identification, PresetDict} from "src/models/user.model";

const JACQUELINE_IDENTIFICATION : Identification = {
    userId : 0,
    nom : "STADCAT",
    prenom : "Jacqueline",
    src : "/assets/marine.png"
}


const JEANMICHEL_IDENTIFICATION: Identification = {
  userId: 1,
  nom: "STADECISSE",
  prenom: "Jean-michel",
  src: "/assets/icon.png"
}

export const ID_SOIGNANT = 0;
//export const USER_IDENTIFICATIONS=[JACQUELINE_IDENTIFICATION, JEANMICHEL_IDENTIFICATION];
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
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 4
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 5
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 6
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 7
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 8
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 9
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 10
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 11
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 12
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 13
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 14
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 15
    },
    {
      textValue: "Arbre",
      imgValue: "assets/arbre.png",
      id: 16
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
    }],//jean michel
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
      },
      {
        textValue: "Mon chien, Rantanplan",
        imgValue: "assets/rantanplan.png",
        id: 6
      },
      {
        textValue: "moi",
        imgValue: "assets/icon.png",
        id: 3
      },//claude
    ],
    [
      {
        textValue: "moi",
        imgValue: "assets/icon.png",
        id: 3}
    ]
]

export const PROFILS_LIST : Identification[][] = [
  [JACQUELINE_IDENTIFICATION,JEANMICHEL_IDENTIFICATION,
  ],//Soignante 0 à ces trois profils
  [
    JACQUELINE_IDENTIFICATION,JEANMICHEL_IDENTIFICATION,
    {
      userId: 2,
      nom: "RICHARD",
      prenom: "Claude",
      src: "/assets/icon.png"
    },
    {
      userId: 3,
      nom: "JULES",
      prenom: "Richard",
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
