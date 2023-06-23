/* angular */
import { AfterViewInit, Component, ViewChild } from '@angular/core';


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const MAIN_SPRITE_SRC = './assets/img/dino-sprite.png';
const DINO_FRAME_WIDTH = 88;
const DINO_FRAME_HEIGHT = 90;
const DINO_X_START_POSITION = 1678;
const DINO_Y_START_POSITION = 5;
const DINO_FRAME_NUMBER = 4;
@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss'],
})
export class GameWrapperComponent implements AfterViewInit {
  @ViewChild('gameArea') public gameArea: any;

  private gameCanvas!: HTMLCanvasElement;
  private gameCtx!: CanvasRenderingContext2D;
  private dinoImg: HTMLImageElement;
  private gameFrame = 0;
  private staggerFrames = 5;

  constructor() {
    this.dinoImg = new Image();
    this.dinoImg.src = MAIN_SPRITE_SRC;
  }

  ngAfterViewInit() {
    this.gameCanvas = this.gameArea.nativeElement as HTMLCanvasElement;
    this.gameCanvas.width = CANVAS_WIDTH;
    this.gameCanvas.height = CANVAS_HEIGHT;
    this.gameCtx = this.gameCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.animate();
  }
  animate() {
    this.gameCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const dinoPosition = Math.floor(this.gameFrame / this.staggerFrames) % (DINO_FRAME_NUMBER - 1);
    const dinoFrameX = (dinoPosition + 1) * DINO_FRAME_WIDTH + DINO_X_START_POSITION;
    const dinoFrameY = DINO_Y_START_POSITION;
    const dinoCanvasXposition = 0;
    const dinoCanvasYposition = CANVAS_HEIGHT - 400;
    const dinoCanvasWidth = 150;
    const dinoCanvasHeight = 150;
    this.gameCtx.drawImage(
      this.dinoImg,
      dinoFrameX,
      dinoFrameY,
      DINO_FRAME_WIDTH,
      DINO_FRAME_HEIGHT,
      dinoCanvasXposition,
      dinoCanvasYposition,
      dinoCanvasWidth,
      dinoCanvasHeight
    );

    this.gameFrame++;
    requestAnimationFrame(() => this.animate());
  }
}
