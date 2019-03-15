import { GameMode } from "./iCard";
import { ISceneObject } from "./iSceneObject";

export interface IPosition2D {
    x:  number;
    y:  number;
}

export interface IColorRGB {
    R:  number;
    G:  number;
    B:  number;
}

export interface IClickMessage {
    position:       IPosition2D;
    arenaID:        number;
    username:       string;
}

export interface IReplacementPixel {
    color:          IColorRGB;
    position:       IPosition2D;
}

export interface IOriginalPixelCluster {
    differenceKey:  number;
    cluster:        IReplacementPixel[];
}

export interface ISceneObjectUpdate {
    actionToApply:  ActionType;
    sceneObject?:   ISceneObject;
}

export interface IArenaResponse<RES_T> {
    status:         string;
    response?:      RES_T;
    arenaType?:     GameMode;
}
