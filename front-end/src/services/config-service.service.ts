import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    public nbCard : number = 4;
    public position_cachees : boolean = true;
    public type_img : boolean = true;
    onstructor() {}
    public setNbCard(value : number){
        this.nbCard = value;
        (document.querySelector(".input-number") as HTMLInputElement).value = value +"";
    }
    public setPosition(cachees : boolean){
        if(cachees){
            //Cachées
            document.querySelector("#cachees")!.classList.remove("pas_cocher");
            document.querySelector("#cachees")!.classList.add("cocher");
            document.querySelector("#visibles")!.classList.add("pas_cocher");
            document.querySelector("#visibles")!.classList.remove("cocher");
            this.position_cachees=true;
        }
        else{
            //Visibles
            document.querySelector("#visibles")!.classList.remove("pas_cocher");
            document.querySelector("#visibles")!.classList.add("cocher");
            document.querySelector("#cachees")!.classList.add("pas_cocher");
            document.querySelector("#cachees")!.classList.remove("cocher");
            this.position_cachees=false;
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
            this.type_img=true;
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
            this.type_img=false;
        }
    }
}