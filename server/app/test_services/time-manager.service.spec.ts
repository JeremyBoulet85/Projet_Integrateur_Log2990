import { expect } from "chai";
import sinon = require("sinon");
import {TimeManagerService } from "../services/time-manager.service";

// tslint:disable:no-magic-numbers no-any

let timeManagerService: TimeManagerService;
let clock: any;

beforeEach(() => {
    clock = sinon.useFakeTimers();
    timeManagerService = new TimeManagerService();
});

afterEach(() => {
    clock.restore();
});

describe("TimeManagerService Tests", () => {

    it ("should return string length of 8 characters from now", (done: Function) => {
        const result: string = timeManagerService.getTimeNow();

        expect(result.length).to.be.equal(8);
        done();
    });

    it ("should return string length of 8 characters with tick 1010", (done: Function) => {
        clock.tick(1010);
        const result: string = timeManagerService.getTimeNow();

        expect(result.length).to.be.equal(8);
        done();
    });

    it ("should return string length of 8 characters with tick 999999999", (done: Function) => {
        clock.tick(999999999);
        const result: string = timeManagerService.getTimeNow();

        expect(result.length).to.be.equal(8);
        done();
    });

    it ("should return string length of 8 characters with tick 888888888", (done: Function) => {
        clock.tick(888888888);
        const result: string = timeManagerService.getTimeNow();

        expect(result.length).to.be.equal(8);
        done();
    });

    it ("should return string length of 8 characters with tick 888888888999", (done: Function) => {
        clock.tick(888888888999);
        const result: string = timeManagerService.getTimeNow();

        expect(result.length).to.be.equal(8);
        done();
    });

    it ("should return string length of 8 characters with tick 123098", (done: Function) => {
        clock.tick(123098);
        const result: string = timeManagerService.getTimeNow();

        expect(result.length).to.be.equal(8);
        done();
    });

    it ("should return string length of 8 characters with tick 123123098", (done: Function) => {
        clock.tick(123123098);
        const result: string = timeManagerService.getTimeNow();

        expect(result.length).to.be.equal(8);
        done();
    });

    it ("should return string length of 8 characters with tick 123144444", (done: Function) => {
        clock.tick(123144444);
        const result: string = timeManagerService.getTimeNow();

        expect(result.length).to.be.equal(8);
        done();
    });

});
