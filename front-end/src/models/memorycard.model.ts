export interface MemoryCard{
  src : string;
  type : 'text' | 'image';
  cardId : number;
  state : 'default' |'visible'| 'flipped' | 'matched' | 'falsely-matched' | 'disappear';
  description? : string;
}
