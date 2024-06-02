import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {StatistiquesService} from "../../../../services/statistiques/statistiques.service";
import {Card} from "../../../../models/user.model";

@Component({
  selector: 'app-cards-selector',
  templateUrl: './cards-selector.component.html',
  styleUrl: './cards-selector.component.scss'
})
export class CardsSelectorComponent implements AfterViewInit {
  public isFocused: boolean=false;
  @ViewChild('ul') ul!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  public cardSelectedIndex: number = 0;//"en moyenne" card selected

  public availableCards: Card[]=[];

  private imageUrl = "http://localhost:9428/api/images/";

  constructor(private el: ElementRef, private statsService: StatistiquesService) {
    statsService.availableCards$.subscribe((availableCards) => {
      this.availableCards=availableCards;
    });
  }

  ngAfterViewInit() {
    this.setCardSelected(0);
  }

  onClick(index: number) {
    this.cardSelectedIndex=index;
    if(this.isFocused) {
      document.body.focus();
      setTimeout(() => {
        this.ul.nativeElement.blur()
      }, 10);//bad practice, but did not found better to prevent click from re-focusing over blur
    }
    else {
      this.isFocused=true;
      this.ul.nativeElement.focus()
    }
  }

  onBlur() {
    this.isFocused=false;
    this.setCardSelected(this.cardSelectedIndex);
  }

  setCardSelected(index: number) {
    this.statsService.updateSelectedCard((this.cardSelectedIndex === 0) ? 0 : this.availableCards[this.cardSelectedIndex-1].id);
    let childNode=this.ul.nativeElement.childNodes[(index===0) ? 0 : index+1];

    this.ul.nativeElement.style.height=childNode.offsetHeight + "px";
    this.el.nativeElement.style.height=this.ul.nativeElement.offsetHeight + 20 + "px";

    this.ul.nativeElement.scrollTo(0, childNode.offsetTop);
    this.cardSelectedIndex=index;
  }

  getImageUrlForCard(card:Card){
    return this.imageUrl+card.imgValue;
  }
}
