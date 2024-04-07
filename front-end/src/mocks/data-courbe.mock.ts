function generateRandomValuesAroundLog(ordonneeALorigine: number): number[] {
  let data: number[]=[];
  for(let i=0; i < 31; i++) {
    data[i]=ordonneeALorigine+8*Math.log(i+2)+getRandomInt(-6,6);
  }

  return data;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const COURBE_SIMPLE_MOCK=generateRandomValuesAroundLog(2);
export const COURBE_MOYEN_MOCK=generateRandomValuesAroundLog(10);
export const COURBE_DIFFICILE_MOCK=generateRandomValuesAroundLog(20);
export const COURBE_EN_MOYENNE_MOCK=generateRandomValuesAroundLog(15);
