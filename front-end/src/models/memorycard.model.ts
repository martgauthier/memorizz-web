export interface MemoryCard{
  src : string;
  cardId : number;
  state : 'default' | 'flipped' | 'matched' | 'falsely-matched';
  description? : string;
}
