import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { Card, Identification } from 'src/models/user.model';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrl: './client-selector.component.scss'
})
export class ClientSelector implements AfterViewInit {
  public isFocused: boolean=false;
  public clientList: Identification[]=[];
  @ViewChild('ul') ul!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  public cardSelectedIndex: number = 0;//"en moyenne" card selected
  public scrollTopValue: number=0;
  public choosedUser : number;

  constructor(public userService : UserService) {
    userService.availableProfil$.subscribe((profils) => {
      this.clientList=profils;
    });
    this.choosedUser= -1;
    userService.identification$.subscribe((identification) => {
      this.choosedUser=identification.id;
    });
    userService.setProfilsList(1);//A changer
  }

  ngAfterViewInit() {
    this.setCardSelected(0);
  }

  onClick(index: number) {
    console.log("on click called index : "+index);
    if(this.cardSelectedIndex != index && index == 0){
      (document.querySelector("#pageNavMain") as HTMLDivElement).classList.remove("animation-slide");
    }
    this.cardSelectedIndex=index>=0?index : this.cardSelectedIndex;
    console.log("on click called index : "+this.cardSelectedIndex);
    if(this.isFocused) {
      document.body.focus();
      setTimeout(() => {
        this.ul.nativeElement.blur()
      }, 10);//bad practice, but did not found better to prevent click from re-focusing over blur
      console.log(document.activeElement)
    }
    else {
      this.isFocused=true;
      this.ul.nativeElement.focus()
    }
    if(this.cardSelectedIndex != 0){
      (document.querySelector(".menu-button") as HTMLDivElement).style.marginTop = "14px";
      (document.querySelector("#pageNavMain") as HTMLDivElement).classList.add("animation-slide");
    }
    else if(this.cardSelectedIndex == 0) {
      (document.querySelector(".menu-button") as HTMLDivElement).style.marginTop = "0px";
    }
    this.choosedUser = this.cardSelectedIndex-1;
    this.userService.setFullDataForUser(this.cardSelectedIndex-1);
  }

  onBlur() {
    this.isFocused=false;
    this.setCardSelected(this.cardSelectedIndex);
  }

  setCardSelected(index: number) {
    let childNode=this.ul.nativeElement.childNodes[(index===0) ? 0 : index+1];

    this.ul.nativeElement.style.height=childNode.offsetHeight + "px";
    this.scrollTopValue = childNode.offsetTop;//index 0 is the first children of ul, but index 1 is the hr.

    this.cardSelectedIndex=index;
  }
}
