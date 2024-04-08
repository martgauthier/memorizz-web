import { Component, Input, OnInit } from '@angular/core';
//import { ConfigService } from 'src/services/config-service.service';
import { NbCard } from './nbCard/nbCard.component';
/*import { Niveau } from 'src/models/niveau.models';*/
import { UserService } from 'src/services/user/user.service';
import { Preset, PresetDict, createEmptyPresetDict, createEmptyPresetStart } from 'src/models/user.model';
import { GestionFront } from './gestion-front';
import { Bouton } from '../bouton.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss']
})

export class Template extends GestionFront  implements OnInit {
    public beginning : boolean = true;
    public presets : PresetDict = createEmptyPresetDict();
    public config : Preset = createEmptyPresetStart();
    public choosedUser : number = 0;
    constructor(private router: Router, public userService : UserService){
      super();
      userService.presetDict$.subscribe((data) => {
        this.presets = data;
      });
      userService.identification$.subscribe((identification) => {
        this.choosedUser=identification.id;
      });
      userService.presetConfig$.subscribe((data) => {
        this.config=data;
      });
      if(this.choosedUser == -1){
        this.router.navigate(['nav']);
      }
      userService.setFullDataForUser(this.choosedUser);
    }
    ngOnInit(): void {}
    public onclick_jouer(){
      alert("Nombre de paires : "+this.config.pairsNumber+"\nCartes visibles ? "+this.config.cardsAreVisible+"\nCartes sont des images ? "+this.config.cardsAreBothImage);
      this.router.navigate(['memoryGame'])
    }
    public onclick_difficulties(id : string){
      if(this.beginning){
        (document.querySelector(".template") as HTMLDivElement)!.style.animationPlayState = "running";
        this.beginning = false;
        (document.querySelector("#jouer") as HTMLDivElement)!.style.display ="block";
        document.querySelector("#jouer div")!.classList.add("jouer");
        document.querySelector("#jouer div h3")!.classList.add("jouer_txt");
        document.querySelector("#jouer div h3")!.classList.add("cocher");
        document.querySelector("#jouer div h3")!.classList.remove("pas_cocher");
      }
      //new Niveau(id,this.configService);
      //this.configService.setFrontDifficulties(id);
      super.changementFrontDifficultyGauche(id);
      this.affichageDroite(id);
    }
    public affichageDroite(niveau : string){
      switch (niveau) {
        case 'facile':
          super.setNbCard(this.presets.simple.pairsNumber);
          super.setPosition(this.presets.simple.cardsAreVisible);
          super.setType(this.presets.simple.cardsAreBothImage);
          this.config = this.presets.simple;
          break;
        case 'moyen':
          super.setNbCard(this.presets.medium.pairsNumber);
          super.setPosition(this.presets.medium.cardsAreVisible);
          super.setType(this.presets.medium.cardsAreBothImage);
          this.config = this.presets.medium;
          break;
        case 'difficile':
          super.setNbCard(this.presets.hard.pairsNumber);
          super.setPosition(this.presets.hard.cardsAreVisible);
          super.setType(this.presets.hard.cardsAreBothImage);
          this.config = this.presets.hard;
          break;
      }
    }
  public onclick_enregistrement(){
    let currentPresetDict: PresetDict = this.presets;
    if((document.querySelector("#facile div h3") as HTMLElement).classList.contains("cocher")){
      currentPresetDict.simple.pairsNumber = parseInt((document.querySelector(".input-number") as HTMLInputElement).value);
      currentPresetDict.simple.cardsAreBothImage = (document.querySelector("#img") as HTMLHRElement).classList.contains("cocher");
      currentPresetDict.simple.cardsAreVisible = (document.querySelector("#visibles") as HTMLHRElement).classList.contains("cocher");
    }
    else if((document.querySelector("#moyen div h3") as HTMLElement).classList.contains("cocher")){
      currentPresetDict.medium.pairsNumber = parseInt((document.querySelector(".input-number") as HTMLInputElement).value);
      currentPresetDict.medium.cardsAreBothImage = (document.querySelector("#img") as HTMLHRElement).classList.contains("cocher");
      currentPresetDict.medium.cardsAreVisible = (document.querySelector("#visibles") as HTMLHRElement).classList.contains("cocher");
    }
    else if((document.querySelector("#difficile div h3") as HTMLElement).classList.contains("cocher")){
      currentPresetDict.hard.pairsNumber = parseInt((document.querySelector(".input-number") as HTMLInputElement).value);
      currentPresetDict.hard.cardsAreBothImage = (document.querySelector("#img") as HTMLHRElement).classList.contains("cocher");
      currentPresetDict.hard.cardsAreVisible = (document.querySelector("#visibles") as HTMLHRElement).classList.contains("cocher");
    }

    this.userService.setPresetDict(currentPresetDict);
  }
  public onclick_defaut(){
    let currentPresetDict: PresetDict = this.presets;
    if((document.querySelector("#facile div h3") as HTMLElement).classList.contains("cocher")){
      currentPresetDict.simple.pairsNumber = 4;
      currentPresetDict.simple.cardsAreBothImage = true;
      currentPresetDict.simple.cardsAreVisible = true;
      super.setNbCard(4);
      super.setPosition(true);
      super.setType(true);
      this.config = this.presets.simple;
    }
    else if((document.querySelector("#moyen div h3") as HTMLElement).classList.contains("cocher")){
      currentPresetDict.medium.pairsNumber = 6;
      currentPresetDict.medium.cardsAreBothImage = true;
      currentPresetDict.medium.cardsAreVisible = false;
      super.setNbCard(6);
      super.setPosition(false);
      super.setType(true);
      this.config = this.presets.medium;
    }
    else if((document.querySelector("#difficile div h3") as HTMLElement).classList.contains("cocher")){
      currentPresetDict.hard.pairsNumber = 8;
      currentPresetDict.hard.cardsAreBothImage = false;
      currentPresetDict.hard.cardsAreVisible = false;
      super.setNbCard(8);
      super.setPosition(false);
      super.setType(false);
      this.config = this.presets.hard;
    }

    this.userService.setPresetDict(currentPresetDict);
  }
}
