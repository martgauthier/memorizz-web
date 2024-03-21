import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-nbcard',
    templateUrl: './nbCard.component.html',
    styleUrls: ['./nbCard.component.scss']
})

export class NbCard implements OnInit {
    ngOnInit(): void {}

    public changeInput(op : string){
        let element : HTMLInputElement;
        element = (document.querySelector(".input-number") as HTMLInputElement);
        switch (op) {
            case '+':
                element.value = element.valueAsNumber + 1 +"";
                break;
            case '-':
                element.value = element.valueAsNumber - 1 +"";
                break;
        }
        //alert(op);
    }
}