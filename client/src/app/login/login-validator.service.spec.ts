import { TestBed } from "@angular/core/testing";

import { LoginValidatorService } from "./login-validator.service";

describe("LoginValidatorService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: LoginValidatorService = TestBed.get(LoginValidatorService);
    expect(service).toBeTruthy();
  });

  it("should check if a username is unique", () => {
    const service: LoginValidatorService = TestBed.get(LoginValidatorService);
    service._usernames.push("name1");
    service._usernames.push("name2");
    expect(service.checkIfUnique("name3")).toBeTruthy();
  });

  it("should check if a username already exists", () => {
    const service: LoginValidatorService = TestBed.get(LoginValidatorService);
    service._usernames.push("name1");
    service._usernames.push("name2");
    expect(service.checkIfUnique("name1")).toBeFalsy();
  });

  // it("should refuse other character than alphanumericals", () => {
  //   const service: LoginValidatorService = TestBed.get(LoginValidatorService);
  //   service.usernameFormControl.value = "BadName@";
  //   expect(service.addUsername()).toBeFalsy();
  // });
});
