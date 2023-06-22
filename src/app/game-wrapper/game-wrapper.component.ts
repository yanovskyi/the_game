import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss']
})
export class GameWrapperComponent implements AfterViewInit {
  @ViewChild('gameArea') public gameArea: any;

  constructor() {}

  ngAfterViewInit() {
    const gameCanvas = this.gameArea.nativeElement as HTMLCanvasElement;
    gameCanvas.width = 800;
    gameCanvas.height = 800;
    if (gameCanvas) {
      const gameCanvasContext: CanvasRenderingContext2D = gameCanvas.getContext('2d') as CanvasRenderingContext2D;
      if (gameCanvasContext) {
        const dinoImg = new Image();
        dinoImg.src = './assets/img/dino-sprite.png';
        gameCanvasContext.beginPath();
        gameCanvasContext.fillStyle = 'red';
        gameCanvasContext.arc(10, 10, 10, 0, Math.PI * 2);
        dinoImg.onload = () => {
          gameCanvasContext.drawImage(dinoImg, 100, 100, 200, 200);
        }
        gameCanvasContext.fill();
        gameCanvasContext.fillStyle = 'green';

        gameCanvasContext.fillRect(20, 20, 150, 100);

      }
    }
  }

}
