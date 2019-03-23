import * as THREE from "three";
import { ActionType, ISceneObjectUpdate } from "../../../../../../../common/communication/iGameplay";
import { ThreejsGenerator } from "./threejs-generator";
import { ThreejsThemeGenerator } from "./threejs-themeGenerator";

export class ThreejsRaycast {

    private readonly NORMALIZE_FACTOR: number = 2;

    private renderer:           THREE.WebGLRenderer;
    private camera:             THREE.PerspectiveCamera;
    private scene:              THREE.Scene;
    private mouse:              THREE.Vector3;
    private raycaster:          THREE.Raycaster;
    private idBySceneId:        Map<number, number>;
    private threejsGenerator:   ThreejsGenerator | ThreejsThemeGenerator;

    public constructor(
        camera:   THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        scene:    THREE.Scene) {
        this.camera   = camera;
        this.renderer = renderer;
        this.scene    = scene;

        this. mouse     = new THREE.Vector3();
        this.raycaster  = new THREE.Raycaster();
    }

    public setMaps(idBySceneId: Map<number, number>): void {
        this.idBySceneId = idBySceneId;
    }

    public setThreeGenerator(threejsGenerator: ThreejsGenerator | ThreejsThemeGenerator): void {
        this.threejsGenerator = threejsGenerator;
    }

    public detectObject(mouseEvent: MouseEvent): number {
        mouseEvent.preventDefault();
        this.mouse.x =   ( mouseEvent.offsetX / this.renderer.domElement.clientWidth ) * this.NORMALIZE_FACTOR - 1;
        this.mouse.y = - ( mouseEvent.offsetY / this.renderer.domElement.clientHeight ) * this.NORMALIZE_FACTOR + 1;
        this.mouse.z = 0;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const objectsIntersected: THREE.Intersection[] = this.raycaster.intersectObjects(this.scene.children);
        if (objectsIntersected.length > 0) {
          const firstIntersectedId: number = objectsIntersected[0].object.id;

          return this.idBySceneId.get(firstIntersectedId) as number;
        }

        return -1;
    }

    public updateSceneWithNewObject(object: ISceneObjectUpdate): void {

        if (!object.sceneObject) {
            return;
        }

        switch (object.actionToApply) {

            case ActionType.ADD:
              this.threejsGenerator.initiateObject(object.sceneObject);
              break;

            case ActionType.DELETE:
              this.threejsGenerator.deleteObject(object.sceneObject.id);
              break;

            case ActionType.CHANGE_COLOR:
              this.threejsGenerator.changeObjectColor(object.sceneObject.id, object.sceneObject.color);
              break;

            default:
              break;
          }
    }

}