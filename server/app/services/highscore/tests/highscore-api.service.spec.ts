import { expect } from "chai";
import { HighscoreApiService } from "../highscore-api.service";
import { Highscore, HighscoreValidationMessage, HighscoreValidationResponse, Mode } from "../utilities/interfaces";

// tslint:disable:no-magic-numbers no-any

const UNDEFINED:                number = 4;
const INVALID_MODE:             string = "invalidMode";
const INVALID_PARAMS_VALUE:     string = "invalidParamsValue";
const INVALID_PARAMS:           string = "invalidParams";

let highscoreService: HighscoreApiService;
let mockHighscore: Highscore;

describe("Highscore micro service tests", () => {

    beforeEach(() => {
        mockHighscore = {
            id:             1,
            timesSingle:    [{username: "cpu", time: 2}, {username: "cpu", time: 4}, {username: "cpu", time: 6}],
            timesMulti:     [{username: "cpu", time: 2}, {username: "cpu", time: 4}, {username: "cpu", time: 6}],
        };
        highscoreService = new HighscoreApiService();
   });

    it("Should not update the times when the new value is negative", () => {
        const newHighscore: Highscore = highscoreService.checkScore({username: "cpu", time: -1}, mockHighscore, Mode.Singleplayer);
        expect(newHighscore).to.be.equal(mockHighscore);
    });

    it("Should update the times when the new value is smaller than any of the previous highscores (singleplayer)", () => {
        const newHighscore: Highscore = highscoreService.checkScore({username: "cpu", time: 1}, mockHighscore, Mode.Singleplayer);
        expect(newHighscore.timesSingle[0].time).to.be.equal(1);
    });

    it("Should update the times when the new value is smaller than any of the previous highscores (multiplayer)", () => {
        const newHighscore: Highscore = highscoreService.checkScore({username: "cpu", time: 1}, mockHighscore, Mode.Multiplayer);
        expect(newHighscore.timesMulti[0].time).to.be.equal(1);
    });

    it("Should fail quietly if the mode is undefined", () => {
        const newHighscore: Highscore = highscoreService.checkScore({username: "cpu", time: 1}, mockHighscore, UNDEFINED);
        expect(newHighscore).to.be.equal(mockHighscore);
    });
});
