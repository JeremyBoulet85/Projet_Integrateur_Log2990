import "reflect-metadata";

import * as chai from "chai";
import * as spies from "chai-spies";
import { GameMode, ICard } from "../../../common/communication/iCard";
import { Message } from "../../../common/communication/message";
import { Constants } from "../constants";
import { AssetManagerService } from "../services/asset-manager.service";
import { CardOperations } from "../services/card-operations.service";
import { HighscoreService } from "../services/highscore.service";

/*tslint:disable no-magic-numbers no-any */

const FAKE_PATH: string = Constants.BASE_URL + "/image";
const CARD_NOT_FOUND: string = "Erreur de suppression, carte pas trouvée";

let highscoreService: HighscoreService;
let cardOperations: CardOperations;

describe("Card-operations tests", () => {
    chai.use(spies);
    const c1: ICard = {
        gameID: 4,
        title: "Default 2D",
        subtitle: "default 2D",
        avatarImageUrl: FAKE_PATH + "/elon.jpg",
        gameImageUrl: FAKE_PATH + "/elon.jpg",
        gamemode: GameMode.simple,
    };

    const c2: ICard = {
        gameID: 2,
        title: "Default 3D",
        subtitle: "default 3D",
        avatarImageUrl: FAKE_PATH + "/moutain.jpg",
        gameImageUrl: FAKE_PATH + "/moutain.jpg",
        gamemode: GameMode.free,
    };

    const c3: ICard = {
        gameID: 3,
        title: "Default 3D 2.0",
        subtitle: "default 3D",
        avatarImageUrl: FAKE_PATH + "/poly.jpg",
        gameImageUrl: FAKE_PATH + "/poly.jpg",
        gamemode: GameMode.free,
    };

    beforeEach(() => {
        highscoreService = new HighscoreService();
        cardOperations = new CardOperations(highscoreService);
    });

    it("should return true when adding a new 2D card", () => {
        chai.expect(cardOperations.addCard2D(c1)).to.equal(true);
    });

    it("should return true when adding a new 3D card", () => {
        chai.expect(cardOperations.addCard3D(c2)).to.equal(true);
    });

    it("should return false when adding an existing 3D card", () => {
        cardOperations.addCard3D(c2);
        chai.expect(cardOperations.addCard3D(c2)).to.equal(false);
    });

    it("should return false when trying to add an existing 2d card", () => {
        cardOperations.addCard2D(c1);
        chai.expect(cardOperations.addCard2D(c1)).to.equal(false);
    });

    it("should return the existing card free mode", () => {
        cardOperations.addCard3D(c3);
        chai.expect(cardOperations.getCardById("3", GameMode.free)).to.deep.equal(c3);
    });

    it("should return the existing card simple mode", () => {
        cardOperations.addCard2D(c1);
        chai.expect(cardOperations.getCardById("4", GameMode.simple)).to.deep.equal(c1);
    });

    it("should return an error message because path image doesnt exist", () => {
        cardOperations.addCard2D(c1);
        chai.expect(cardOperations.removeCard2D(4)).to.equal("error while deleting file");
    });

    it("should return an error message because path image doesnt exist", () => {
        cardOperations.addCard3D(c3);
        chai.expect(cardOperations.removeCard3D(3)).to.equal("error while deleting file");
    });

    it("should return an error while deleting the default 2D card", () => {
        chai.expect(cardOperations.removeCard2D(1)).deep.equal(Constants.DELETION_ERROR_MESSAGE);
    });

    it("should return an error while deleting the default 3D card", () => {
        chai.expect(cardOperations.removeCard3D(1)).deep.equal(Constants.DELETION_ERROR_MESSAGE);
    });

    it("should return false because the card doesnt exist", () => {
        chai.expect(cardOperations.removeCard2D(0)).to.equal(CARD_NOT_FOUND);
    });

    it("should return false because the card doesnt exist", () => {
        chai.expect(cardOperations.removeCard3D(0)).to.equal(CARD_NOT_FOUND);
    });

    it("should return the existing card", () => {
        cardOperations.addCard3D(c3);
        chai.expect(cardOperations.getCardById("3", GameMode.free)).to.deep.equal(c3);
    });

    it("should return an error message because path image doesnt exist", () => {
        cardOperations.addCard2D(c1);
        chai.expect(cardOperations.removeCard2D(4)).to.equal("error while deleting file");
    });

    it("should return an error message because path image doesnt exist", () => {
        cardOperations.addCard3D(c3);
        chai.expect(cardOperations.removeCard3D(3)).to.equal("error while deleting file");
    });

    it("should return an error while deleting the default 2D card", () => {
        chai.expect(cardOperations.removeCard2D(1)).deep.equal(Constants.DELETION_ERROR_MESSAGE);
    });

    it("should return an error while deleting the default 3D card", () => {
        chai.expect(cardOperations.removeCard3D(1)).deep.equal(Constants.DELETION_ERROR_MESSAGE);
    });

    it("should return false because the card doesnt exist", () => {
        chai.expect(cardOperations.removeCard2D(0)).to.equal(CARD_NOT_FOUND);
    });

    it("should return false because the card doesnt exist", () => {
        chai.expect(cardOperations.removeCard3D(0)).to.equal(CARD_NOT_FOUND);
    });

    it("should delete card 2D", () => {
        const assetManager: AssetManagerService = new AssetManagerService();
        cardOperations.addCard2D(c1);
        const originalImagePath: string = Constants.IMAGES_PATH + "/" + 4 + Constants.ORIGINAL_FILE;
        const modifiedImagePath: string = Constants.IMAGES_PATH + "/" + 4 + Constants.MODIFIED_FILE;
        const generatedImagePath: string =  Constants.IMAGES_PATH + "/" + 4 + Constants.GENERATED_FILE;
        assetManager.saveImage(originalImagePath, "test");
        assetManager.saveImage(modifiedImagePath, "test");
        assetManager.saveImage(generatedImagePath, "test");
        chai.expect(cardOperations.removeCard2D(4)).to.equal(Constants.CARD_DELETED);
    });

    it("should delete card 3D", () => {
        const assetManager: AssetManagerService = new AssetManagerService();
        cardOperations.addCard3D(c2);
        const snapshot: string = Constants.IMAGES_PATH + "/" + 2 + Constants.GENERATED_SNAPSHOT;
        const generatedScene: string = Constants.SCENE_PATH + "/" + 2 + Constants.SCENES_FILE;
        assetManager.saveImage(snapshot, "test");
        assetManager.saveGeneratedScene(generatedScene, "test");
        chai.expect(cardOperations.removeCard3D(2)).to.equal(Constants.CARD_DELETED);
    });

    it("should generate message with unknown error", () => {
        const error: SyntaxError = new SyntaxError();
        const result: Message = cardOperations.generateErrorMessage(error);
        chai.expect(result).to.deep.equal({title: Constants.ON_ERROR_MESSAGE, body: Constants.UNKNOWN_ERROR});
    });

});