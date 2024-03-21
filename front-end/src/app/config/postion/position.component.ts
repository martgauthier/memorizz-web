import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.scss']
})

export class Position implements OnInit {
    ngOnInit(): void {
        this.onclick("cachees");
    }
    public onclick(etat : string){
        switch (etat) {
            case "cachees":
                document.querySelector("#cachees")!.classList.remove("pas_cocher");
                document.querySelector("#cachees")!.classList.add("cocher");
                document.querySelector("#visibles")!.classList.add("pas_cocher");
                document.querySelector("#visibles")!.classList.remove("cocher");
                break;
            case "visibles":
                document.querySelector("#visibles")!.classList.remove("pas_cocher");
                document.querySelector("#visibles")!.classList.add("cocher");
                document.querySelector("#cachees")!.classList.add("pas_cocher");
                document.querySelector("#cachees")!.classList.remove("cocher");
                break;
        }
    }
}