import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Constants } from "../../constants";
import { TestingImportsModule } from "../../testing-imports/testing-imports.module";
import { ChatViewComponent } from "../chat-view/chat-view.component";
import { MessageViewComponent } from "../chat-view/message-view/message-view.component";
import { GameViewSimpleComponent } from "./game-view-simple.component";

describe("GameViewSimpleComponent", () => {
  let component: GameViewSimpleComponent;
  let fixture: ComponentFixture<GameViewSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameViewSimpleComponent,
        ChatViewComponent,
        MessageViewComponent,
      ],
      imports: [
        TestingImportsModule,
      ],
    })
    .compileComponents()
    .catch(() => Constants.OBLIGATORY_CATCH);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameViewSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});