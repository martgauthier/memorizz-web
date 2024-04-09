import {Component, ViewChild} from '@angular/core';
import {StatistiquesService} from "../../../../services/statistiques/statistiques.service";
import {OwlOptions, CarouselComponent, SlidesOutputData} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.scss'
})
export class TimeSelectorComponent {

  @ViewChild('carousel') carousel?: CarouselComponent;

  public duration: number=1;
  public carouselOptions: OwlOptions = {
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    center: true,
    loop: true,
    autoplay: false,
    responsive: {
      0: {//je pourrais préciser le nombre d'items à afficher en fonction d'une valeur de taille de window (ici 0). Ici, je ne mets que
        //0, donc quelque soit la dimension de la fenêtre, je n'afficherai que 1 item à la fois dans le carousel
        items: 1
      },
    }
  };



  constructor(private statsService: StatistiquesService) {}

  onArrowClicked(which: "left" | "right") {
    if(which==="left") this.carousel?.prev();
    else this.carousel?.next();
  }

  onCarouselChange(event: SlidesOutputData) {
    let duration: number=1;
    switch(event.startPosition!) {
      case 0:
        duration=1;
        break;
      case 1:
        duration=2;
        break;
      case 2:
        duration=3;
        break;
      case 3:
        duration=6;
        break;
    }
    this.statsService.setDuration(duration);
  }
}
