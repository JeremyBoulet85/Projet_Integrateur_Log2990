import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Constants } from "../../constants";
import { GameViewFreeComponent } from "./game-view-free.component";

describe("GameViewFreeComponent", () => {
  let component: GameViewFreeComponent;
  let fixture: ComponentFixture<GameViewFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameViewFreeComponent ],
    })
    .compileComponents()
    .catch(() => Constants.OBLIGATORY_CATCH);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameViewFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});