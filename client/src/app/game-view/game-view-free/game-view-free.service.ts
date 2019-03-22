import { ElementRef, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { GameConnectionService } from "src/app/game-connection.service";
import { IArenaResponse, IPosition2D, ISceneObjectUpdate } from "../../../../../common/communication/iGameplay";
import { CCommon } from "../../../../../common/constantes/cCommon";

@Injectable({
  providedIn: "root",
})
export class GameViewFreeService {

  private rightClickActive:      Subject<boolean>;
  private successSound:          ElementRef;
  private failSound:             ElementRef;
  public  position:              IPosition2D;

  public constructor (private gameConnectionService: GameConnectionService) {
    this.rightClickActive = new Subject<boolean>();
    this.position = {x: 0, y: 0};
  }

  public updateRightClick(newValue: boolean): void {
    this.rightClickActive.next(newValue);
  }

  public getRightClickListener(): Observable<boolean> {
    return this.rightClickActive.asObservable();
  }

  public onArenaResponse(data: IArenaResponse<ISceneObjectUpdate>): void {

    if (data.status === CCommon.ON_SUCCESS) {

      this.playSuccessSound();
      if (data.response) {
        this.gameConnectionService.updateModifiedScene(data.response);
      }
    }
  }

  public setPosition(posX: number, posY: number): void {
    this.position.x = posX;
    this.position.y = posY;
  }

  public playFailSound(): void {
    this.failSound.nativeElement.currentTime = 0;
    this.failSound.nativeElement.play();
  }

  private playSuccessSound(): void {
    this.successSound.nativeElement.currentTime = 0;
    this.successSound.nativeElement.play();
  }

  public setSounds(success: ElementRef, fail: ElementRef): void {
    this.successSound = success;
    this.failSound    = fail;
  }

}
