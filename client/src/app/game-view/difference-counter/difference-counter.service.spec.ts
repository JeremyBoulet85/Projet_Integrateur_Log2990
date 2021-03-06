import { TestBed } from "@angular/core/testing";

import { DifferenceCounterService } from "./difference-counter.service";

// tslint:disable:no-magic-numbers

describe("DifferenceCounterService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DifferenceCounterService = TestBed.get(DifferenceCounterService);
    expect(service).toBeTruthy();
  });
});

describe("DifferenceCounterService tests", () => {
  let differenceCounterService: DifferenceCounterService;
  const maxError: number = 7;

  beforeEach(() => {
    differenceCounterService = new DifferenceCounterService();
  });

  it("should return the right percentage given 2 errors", () => {
    const errorFound:     number = 4;
    const expectedAnswer: number = 58;
    let answer:           number = 0;

    differenceCounterService.setNbErrorMax(maxError);
    answer = differenceCounterService.convertErrorToPercent(errorFound);

    expect(answer).toBeLessThan(expectedAnswer);
  });

  it("should return the right percentage given 7 errors", () => {
    const errorFound:     number = 7;
    const expectedAnswer: number = 100;
    let answer:           number = 0;

    differenceCounterService.setNbErrorMax(maxError);
    answer = differenceCounterService.convertErrorToPercent(errorFound);

    expect(answer).toBeLessThanOrEqual(expectedAnswer);
  });

  it("should return maxError equal to given number to setNbErrorMax", () => {
    differenceCounterService.setNbErrorMax(maxError);

    expect(differenceCounterService["maxError"]).toEqual(maxError);
  });

  it("should convert error to percent", () => {
    const errorFound:       number = 2;
    const expectedPercent:  number = 50;

    differenceCounterService.setNbErrorMax(4);

    expect(differenceCounterService.convertErrorToPercent(errorFound)).toEqual(expectedPercent);
  });
});
