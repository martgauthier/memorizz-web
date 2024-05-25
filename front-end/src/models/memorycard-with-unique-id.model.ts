import {MemoryCard} from "./memorycard.model";

export interface MemoryCardWithUniqueId extends MemoryCard {
  uniqueId: number
}
