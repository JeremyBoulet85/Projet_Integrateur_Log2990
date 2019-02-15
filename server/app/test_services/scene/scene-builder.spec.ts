import * as chai from "chai";
import * as spies from "chai-spies";
import "reflect-metadata";
import * as sinon from "sinon";
import { SceneObjectType } from "../../../../common/communication/iSceneObject";
import { ISceneOptions } from "../../../../common/communication/iSceneOptions";
import { SceneBuilder } from "../../services/scene/scene-builder";
// import { ISceneVariables } from "../../../../common/communication/iSceneVariables";

/* tslint:disable:no-any */
let sceneBuilder: SceneBuilder;

describe("Scene builder tests", () => {

    const sceneOptions: ISceneOptions = {
        sceneName: "nouvelleScene",
        sceneObjectsType: SceneObjectType.Cube,
        sceneObjectsQuantity: 20,
    };

    beforeEach(() => {

        chai.use(spies);

        sceneBuilder = new SceneBuilder();
    });

    it("should call the generateRandomAxisValues function when generating scene", () => {
        const spy: any = chai.spy.on(sceneBuilder, "generateRandomAxisValues");
        sceneBuilder.generateScene(sceneOptions);
        chai.expect(spy).to.have.been.called();
    });

    it("should call the generateRandomRotationValues function when generating scene objects", () => {
        const spy: any = chai.spy.on(sceneBuilder, "generateRandomRotationValues");
        sceneBuilder.generateScene(sceneOptions);
        chai.expect(spy).to.have.been.called();
    });

    // it("should change position of a new sceneObject until there is no collision", () =>) {

    // });
});
