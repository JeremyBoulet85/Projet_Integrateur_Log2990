import { IUser } from "../../../../../common/communication/iUser";

export interface IArenaInfos<IInfos> {
    arenaId:            number;
    users:              IUser[];
    dataUrl:            IInfos;
}

export interface I3DInfos {
    sceneData: string;
}

export interface I2DInfos {
    original:   string;
    difference: string;
}
export interface IPlayerInput<EVT_T> {
    event:              string;
    arenaId:            number;
    user:               IUser;
    eventInfo:          EVT_T;
}

export interface IHitToValidate<EVT_T> {
    eventInfo:          EVT_T;
    differenceDataURL:  string;
    colorToIgnore?:     number;
}

export interface IHitConfirmation {
    isAHit:             Boolean;
    differenceIndex:    number;
}
