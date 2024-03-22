export interface MemoryCard{
  src : string;
  cardId : number;
  state : 'default' | 'flipped' | 'matched';
  description? : string;
}
