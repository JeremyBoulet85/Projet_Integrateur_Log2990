import { ElementRef, Injectable } from "@angular/core";
import {
  IArenaResponse,
  IClickMessage,
  IOriginalPixelCluster,
  IPosition2D,
  IReplacementPixel
 } from "../../../../../common/communication/iGameplay";
import { CCommon } from "../../../../../common/constantes/cCommon";

@Injectable({
  providedIn: "root",
})

export class GameViewSimpleService {

  private canvasModified:        CanvasRenderingContext2D;
  private successSound:          ElementRef;
  private failSound:             ElementRef;

  public onArenaResponse(data: IArenaResponse<IOriginalPixelCluster>): void {
    if (data.status === CCommon.ON_SUCCESS) {
      this.playSuccessSound();
      if (data.response) {
        data.response.cluster.forEach((pixel: IReplacementPixel) => {
          this.canvasModified.fillStyle = "rgb(" + pixel.color.R + ", " + pixel.color.G + ", " + pixel.color.B + ")";
          this.canvasModified.fillRect(pixel.position.x, pixel.position.y, 1, 1);
        });
      }
    }
  }

  public playFailSound(): void {
    this.failSound.nativeElement.currentTime = 0;
    this.failSound.nativeElement.play();
  }

  private playSuccessSound(): void {
    this.successSound.nativeElement.currentTime = 0;
    this.successSound.nativeElement.play();
  }

  public setCanvas(modified: CanvasRenderingContext2D): void {
    this.canvasModified = modified;
  }

  public setSounds(success: ElementRef, fail: ElementRef): void {
    this.successSound = success;
    this.failSound    = fail;
  }

  public onCanvasClick(pos: IPosition2D, id: number, username: string): IClickMessage<IPosition2D> {

    return {
      value:        pos,
      arenaID:      id,
      username:     username,
    };
  }
}
