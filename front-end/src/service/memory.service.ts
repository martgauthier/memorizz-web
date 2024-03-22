import {Injectable} from "@angular/core";
import {MemoryCard} from "../models/memorycard.model";
import {MEMORYCARD_LIST} from "../mocks/card-list.mocks";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MemoryService {
  private memorycards : MemoryCard[] = MEMORYCARD_LIST;

  public memorycards$ : BehaviorSubject<MemoryCard[]> = new BehaviorSubject(MEMORYCARD_LIST);
  constructor(){

  }

}
