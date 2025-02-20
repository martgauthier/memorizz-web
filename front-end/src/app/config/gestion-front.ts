export class GestionFront{
    public setNbCard(value : number, maxValue : number){
      if(value >= maxValue){
        value = maxValue <= 8 ? maxValue : 8;
        (document.querySelector("#divPlus") as HTMLInputElement).classList.add("tooltip");
        (document.querySelector("#tooltiptext") as HTMLInputElement).style.display = "block";
        document.querySelector(".input-number-increment")!.classList.remove("clickable");
        document.querySelector(".input-number-increment")!.classList.remove("toHover");
        document.querySelector(".input-number-increment")!.classList.add("not_clickable");
      }else{
        document.querySelector(".input-number-increment")!.classList.add("toHover");
        (document.querySelector("#divPlus") as HTMLInputElement).classList.remove("tooltip");
        (document.querySelector("#tooltiptext") as HTMLInputElement).style.display = "none";
      }
      if(value >= 3 && value <= 8){
        (document.querySelector(".input-number") as HTMLInputElement).value = value +"";
        if(value == 3){
          document.querySelector(".input-number-decrement")!.classList.remove("clickable");
          document.querySelector(".input-number-decrement")!.classList.remove("toHover");
          document.querySelector(".input-number-decrement")!.classList.add("not_clickable");
        }
        else{
          document.querySelector(".input-number-decrement")!.classList.add("toHover");
          document.querySelector(".input-number-decrement")!.classList.remove("not_clickable");
          document.querySelector(".input-number-decrement")!.classList.add("clickable");
        }
        if(value == 8){
          document.querySelector(".input-number-increment")!.classList.remove("clickable");
          document.querySelector(".input-number-increment")!.classList.add("not_clickable");
        }
        else if(value != 8 && value < maxValue){
          document.querySelector(".input-number-increment")!.classList.remove("not_clickable");
          document.querySelector(".input-number-increment")!.classList.add("clickable");
        } 
        
        if(value <= 4 ){
          this.changementFrontDifficultyGauche("facile");
        }
        if(value >= 5 && value <= 6){
          this.changementFrontDifficultyGauche("moyen");
        }
        if(value >= 7){
          this.changementFrontDifficultyGauche("difficile");
        }
      }
    }
    public changementFrontDifficultyGauche(id : string){
        //Affichage gauche
        let difficulties: string[] = ['facile', 'moyen', 'difficile'];
        let difficulty : string;
        for(difficulty in difficulties){
          if(difficulties[difficulty] == id ){
            (document.querySelector("#"+id+" div") as HTMLDivElement)!.style.backgroundColor = "#01274a" ;
            document.querySelector("#"+id+">div>h3")!.classList.add("cocher");
            document.querySelector("#"+id+">div>h3")!.classList.remove("pas_cocher");
          }
          else{
            (document.querySelector("#"+difficulties[difficulty]+" div") as HTMLDivElement)!.style.backgroundColor = "#209188";
            document.querySelector("#"+difficulties[difficulty]+">div>h3")!.classList.add("pas_cocher");
            document.querySelector("#"+difficulties[difficulty]+">div>h3")!.classList.remove("cocher");
          }
        }
      }
    public setPosition(visibles : boolean){
      if(visibles){
        //Visibles
        document.querySelector("#visibles")!.classList.remove("pas_cocher");
        document.querySelector("#visibles")!.classList.add("cocher");
        document.querySelector("#cachees")!.classList.add("pas_cocher");
        document.querySelector("#cachees")!.classList.remove("cocher");
      }
      else{
        //Cachées
        document.querySelector("#cachees")!.classList.remove("pas_cocher");
        document.querySelector("#cachees")!.classList.add("cocher");
        document.querySelector("#visibles")!.classList.add("pas_cocher");
        document.querySelector("#visibles")!.classList.remove("cocher");
      }
  }
  public setType(img : boolean){
      if(img){
          document.querySelector("#img")?.classList.remove("pas_cocher");
          document.querySelector("#txt")?.classList.remove("cocher");
          document.querySelector("#img")?.classList.add("cocher");
          document.querySelector("#img #un")?.classList.remove("img_pas_cocher");
          document.querySelector("#img #deux")?.classList.remove("img_pas_cocher");
          document.querySelector("#txt")?.classList.add("pas_cocher");
          document.querySelector("#txt #un")?.classList.add("img_pas_cocher");
          document.querySelector("#text_george")?.classList.add("img_pas_cocher");
      }
      else{
          document.querySelector("#txt")?.classList.remove("pas_cocher");
          document.querySelector("#img")?.classList.remove("cocher");
          document.querySelector("#txt")?.classList.add("cocher");
          document.querySelector("#txt #un")?.classList.remove("img_pas_cocher");
          document.querySelector("#text_george")?.classList.remove("img_pas_cocher");
          document.querySelector("#img")?.classList.add("pas_cocher");
          document.querySelector("#img #un")?.classList.add("img_pas_cocher");
          document.querySelector("#img #deux")?.classList.add("img_pas_cocher");
      }
  }

  public affichageNonDispo(maxValue : number){
    if(maxValue < 3){
      //Tu peux pas jouer message vers Image
      (document.querySelector("#facile") as HTMLDivElement)!.style.filter = "grayscale(0.9)";
    }
    if(maxValue < 5){
      (document.querySelector("#moyen") as HTMLDivElement)!.style.filter = "grayscale(0.9)";
      (document.querySelector("#moyen div") as HTMLDivElement)!.style.cursor = "no-drop";
      (document.querySelector("#tooltip-text-moyen") as HTMLDivElement)!.style.display = "block";
    }
    if(maxValue < 7){
      (document.querySelector("#difficile") as HTMLDivElement)!.style.filter = "grayscale(0.9)";
      (document.querySelector("#difficile div") as HTMLDivElement)!.style.cursor = "no-drop";
      (document.querySelector("#tooltip-text-difficile") as HTMLDivElement)!.style.display = "block";
    }
  }
}