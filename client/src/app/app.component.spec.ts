// tslint:disable:no-any les attributs sont des types any
// tslint:disable:no-floating-promises pour le before each
import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { MatButtonModule, MatFormFieldModule, MatInputModule } from "@angular/material";
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { LoginValidatorComponent } from "./login/login-validator/login-validator.component";
import { LoginViewComponent } from "./login/login-view/login-view.component";

import { AdminComponent } from "./admin/admin.component";
import { AppRoutingModule } from "./app-routing.module";
import { GameListComponent } from "./game-list/game-list.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { TestingImportsModule } from "./testing-imports/testing-imports.module";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent,
        AppComponent,
        LoginValidatorComponent,
        LoginViewComponent,
        GameListComponent,
        LoginPageComponent,
        MainNavComponent,
      ],
      imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        LayoutModule,
        RouterModule,
        TestingImportsModule,
      ],
      providers: [BasicService],
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'client'`, async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("LOG2990");
  }));
});
