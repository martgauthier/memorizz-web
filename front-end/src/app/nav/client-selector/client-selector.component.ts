import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { ID_SOIGNANT } from 'src/mocks/user.mock';
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
  public idSoignant : number;

  constructor(public userService : UserService) {
    userService.availableProfil$.subscribe((profils) => {
      this.clientList=profils;
    });
    this.choosedUser= -1;
    userService.identification$.subscribe((identification) => {
      this.choosedUser=identification.userId;
    });
    this.idSoignant = -1;
    userService.idSoignant$.subscribe((id) => {
      this.idSoignant=id;
    });
    userService.setProfilsList();//A changer avec id soignant connecté
    //(document.querySelector("#boutonsNav .niveau h3:hover") as HTMLHRElement).style.color = "white";
    setTimeout(() => {
      if(this.userService.identification$.value.userId != -1){
        (document.querySelector("#pageNavMain") as HTMLDivElement).classList.add("animation-slide");
        document.querySelector("#jouer_nav h3")!.classList.remove("pas_cocher");
        document.querySelector("#jouer_nav h3")!.classList.add("cocher");
        document.querySelector("#image_nav h3")!.classList.remove("pas_cocher");
        document.querySelector("#image_nav h3")!.classList.add("cocher");
        document.querySelector("#stats_nav h3")!.classList.remove("pas_cocher");
        document.querySelector("#stats_nav h3")!.classList.add("cocher");
        (document.querySelector(".menu-button") as HTMLDivElement).style.marginTop = "14px";
      }
    }, 10); //Je n'ai pas trouvé d'autre solution
  }

  ngAfterViewInit() {
    if(this.userService.identification$.value.userId == -1){
      this.setCardSelected(0);
    }else{
      //rentre bien quand un user a été choisit
      this.setCardSelected(this.userService.identification$.value.userId+1);
    }
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
      this.ul.nativeElement.focus();
    }
    if(this.cardSelectedIndex != 0){
      (document.querySelector(".menu-button") as HTMLDivElement).style.marginTop = "14px";
      (document.querySelector("#pageNavMain") as HTMLDivElement).classList.add("animation-slide");
      document.querySelector("#jouer_nav h3")!.classList.remove("pas_cocher");
      document.querySelector("#jouer_nav h3")!.classList.add("cocher");
      document.querySelector("#image_nav h3")!.classList.remove("pas_cocher");
      document.querySelector("#image_nav h3")!.classList.add("cocher");
      document.querySelector("#stats_nav h3")!.classList.remove("pas_cocher");
      document.querySelector("#stats_nav h3")!.classList.add("cocher");
    }
    else if(this.cardSelectedIndex == 0) {
      (document.querySelector(".menu-button") as HTMLDivElement).style.marginTop = "0px";
    }
    this.choosedUser = this.cardSelectedIndex-1;
    this.userService.setFullDataForUser(this.clientList[this.cardSelectedIndex-1].userId);
  }

  onBlur() {
    this.isFocused=false;
    this.setCardSelected(this.cardSelectedIndex);
  }

  setCardSelected(index: number) {
    let childNode=this.ul.nativeElement.childNodes[(index===0) ? 0 : index+1];

    this.ul.nativeElement.style.height=childNode.offsetHeight + "px";
    this.ul.nativeElement.style.maxHeight ="273px";
    //this.el.nativeElement.style.height=this.ul.nativeElement.offsetHeight + 20 + "px";
    this.ul.nativeElement.scrollTo(0, childNode.offsetTop);
    this.cardSelectedIndex=index;

    setTimeout(() => {
      //attendre que les cartes soit lu par le back
      if( this.userService.availableCards$.value.length < 3){
        console.log(2);
        (document.querySelector("#tooltip-text") as HTMLDivElement).style.display = "block";
        (document.querySelector("#jouer_div") as HTMLDivElement).style.filter = "grayscale(0.9)";
        (document.querySelector("#jouer_div .niveau") as HTMLDivElement).style.cursor = "no-drop";
      }else{
        console.log(3);
        (document.querySelector("#tooltip-text") as HTMLDivElement).style.display = "none";
        (document.querySelector("#jouer_div") as HTMLDivElement).style.filter = "grayscale(0)";
        (document.querySelector("#jouer_div .niveau") as HTMLDivElement).style.cursor = "pointer";
      }
    }, 100);
  }

  getProfilePicUrl(user:Identification){
    return "http://localhost:9428/api/images/"+user.userId+"/pfp.png";
  }
}
