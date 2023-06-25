/* angular */
import { AfterViewInit, Component, ViewChild } from '@angular/core';


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 700;
const MAIN_SPRITE_SRC = './assets/img/dino-sprite.png';
const DINO_FRAME_WIDTH = 88;
const DINO_FRAME_HEIGHT = 90;
const DINO_X_START_POSITION = 1678;
const DINO_Y_START_POSITION = 5;
const DINO_FRAME_NUMBER = 4;
const BACKGROUND_WIDTH = 2400;
const BACKGROUND_HEIGHT = 30;
@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss'],
})
export class GameWrapperComponent implements AfterViewInit {
  @ViewChild('gameArea') public gameArea: any;

  private gameSpeed: number = 5;

  private gameCanvas!: HTMLCanvasElement;
  private gameCtx!: CanvasRenderingContext2D;
  private dinoImg: HTMLImageElement;
  private gameFrame = 0;
  private staggerFrames = 5;

  // dino parameters
  private dinoCanvasXposition = 0;
  private dinoCanvasYposition = CANVAS_HEIGHT - 300;
  private dinoCanvasWidth = 150;
  private dinoCanvasHeight = 150;

  // backgrounds position
  private bgX: number = 0;
  private bgX2: number = BACKGROUND_WIDTH - 100;
  private bgCanvasYposition = this.dinoCanvasYposition + 115;
  private bgCanvasXposition = 0;

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

    // Drawing background
    this.gameCtx.drawImage(
      this.dinoImg, 
      this.bgX, 
      100, 
      BACKGROUND_WIDTH, 
      BACKGROUND_HEIGHT,
      this.bgCanvasXposition,
      this.bgCanvasYposition,
      BACKGROUND_WIDTH,
      BACKGROUND_HEIGHT
    );
    this.gameCtx.drawImage(
      this.dinoImg, 
      this.bgX2, 
      100, 
      BACKGROUND_WIDTH, 
      BACKGROUND_HEIGHT,
      this.bgCanvasXposition,
      this.bgCanvasYposition,
      BACKGROUND_WIDTH,
      BACKGROUND_HEIGHT
    );
    this.bgX = this.bgX > BACKGROUND_WIDTH ? - BACKGROUND_WIDTH + this.bgX2 + this.gameSpeed : this.bgX + this.gameSpeed;
    this.bgX2 = this.bgX2 > BACKGROUND_WIDTH ? - BACKGROUND_WIDTH + this.bgX + this.gameSpeed : this.bgX2 + this.gameSpeed;

    // Drawing dino
    const dinoPosition = Math.floor(this.gameFrame / this.staggerFrames) % (DINO_FRAME_NUMBER - 1);
    const dinoFrameX = (dinoPosition + 1) * DINO_FRAME_WIDTH + DINO_X_START_POSITION;
    const dinoFrameY = DINO_Y_START_POSITION;
    this.gameCtx.drawImage(
      this.dinoImg,
      dinoFrameX,
      dinoFrameY,
      DINO_FRAME_WIDTH,
      DINO_FRAME_HEIGHT,
      this.dinoCanvasXposition,
      this.dinoCanvasYposition,
      this.dinoCanvasWidth,
      this.dinoCanvasHeight
    );

    this.gameFrame++;
    requestAnimationFrame(() => this.animate());
  }
}
