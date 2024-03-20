import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config-service.service';

@Component({
    selector: 'app-typeCard',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss']
})

export class Type implements OnInit {
    constructor(public configService: ConfigService){}
    ngOnInit(): void {
        this.onclick("img");
    }
    public onclick(type : string){
        switch (type) {
            case "img":
                document.querySelector("#img")?.classList.remove("pas_cocher");
                document.querySelector("#txt")?.classList.remove("cocher");
                document.querySelector("#img")?.classList.add("cocher");
                document.querySelector("#img #un")?.classList.remove("img_pas_cocher");
                document.querySelector("#img #deux")?.classList.remove("img_pas_cocher");
                document.querySelector("#txt")?.classList.add("pas_cocher");
                document.querySelector("#txt #un")?.classList.add("img_pas_cocher");
                document.querySelector("#text_george")?.classList.add("img_pas_cocher");
                this.configService.type_img = true;
                break;
            case "txt":
                document.querySelector("#txt")?.classList.remove("pas_cocher");
                document.querySelector("#img")?.classList.remove("cocher");
                document.querySelector("#txt")?.classList.add("cocher");
                document.querySelector("#txt #un")?.classList.remove("img_pas_cocher");
                document.querySelector("#text_george")?.classList.remove("img_pas_cocher");
                document.querySelector("#img")?.classList.add("pas_cocher");
                document.querySelector("#img #un")?.classList.add("img_pas_cocher");
                document.querySelector("#img #deux")?.classList.add("img_pas_cocher");
                this.configService.type_img = false;
                break;
        }
    }
}