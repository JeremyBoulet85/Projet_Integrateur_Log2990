import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ICard } from "../../../../common/communication/iCard";
import { CardComponent } from "../card/card.component";

@Component({
  selector:     "app-game-list",
  templateUrl:  "./game-list.component.html",
  styleUrls:    ["./game-list.component.css"],
})
export class GameListComponent {

  public cardComponent:         CardComponent;

  @Input()  public cards:       ICard[];
  @Output() public cardDeleted: EventEmitter<string>;

  public updateCards(): void {
    this.cardDeleted.emit();
  }

  public constructor() {
    this.cardDeleted = new EventEmitter<string>();
  }
}
