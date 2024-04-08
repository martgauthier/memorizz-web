
import {Component, OnInit} from '@angular/core';
import {Chart, Tooltip} from "chart.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'Hello world!';
  public showSuccess = false;

  showHideSuccess() {
    this.showSuccess = !this.showSuccess;
  }

  constructor() {
    //https://stackoverflow.com/questions/34273254/styling-bars-and-lines-with-chart-js/54580284#54580284
    let boxShadowPlugin = {//plugin qui ajoute du box-shadow
      id: "boxShadowPlugin",
      beforeDraw : function(chartInstance: any)
      {
        let _stroke = chartInstance.ctx.stroke;
        chartInstance.ctx.stroke = function () {
          chartInstance.ctx.save();
          chartInstance.ctx.shadowColor = 'rgba(170,170,170,0.3)';
          chartInstance.ctx.shadowBlur = 10;
          chartInstance.ctx.shadowOffsetX = 0;
          chartInstance.ctx.shadowOffsetY = 0;
          _stroke.apply(this, arguments)
          chartInstance.ctx.restore();
        }

        let _fill = chartInstance.ctx.fill;
        chartInstance.ctx.fill = function () {

          chartInstance.ctx.save();
          chartInstance.ctx.shadowColor = 'rgba(0, 35, 89, 0.5)';
          chartInstance.ctx.shadowBlur = 10;
          chartInstance.ctx.shadowOffsetX = 0;
          chartInstance.ctx.shadowOffsetY = 0;
          _fill.apply(this, arguments)
          chartInstance.ctx.restore();
        }
      }
    };
    Chart.register(boxShadowPlugin);
    Chart.register([Tooltip]);

    Chart.defaults.color="rgba(255,255,255,0.8)";
    Chart.defaults.borderColor="rgba(255, 255, 255, 0.2)";
    Chart.defaults.font.family="Poppins";
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
}
