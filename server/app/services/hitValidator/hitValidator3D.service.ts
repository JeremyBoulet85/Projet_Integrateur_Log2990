import { AxiosInstance, AxiosResponse } from "axios";
import { injectable } from "inversify";
import { IModification, ISceneVariablesMessage } from "../../../../common/communication/iSceneVariables";
import { Cache } from "./cache";
import { IDataToCache, IHitConfirmation, IHitToValidate } from "./interfaces";

@injectable()
export class HitValidatorService3D {

    private readonly ERROR_ON_HTTPGET:  string = "Didn't succeed to get scene buffer from URL given.";
    private readonly CACHE_SIZE:        number = 5;

    private cache: Cache<ISceneVariablesMessage>;

    public constructor() {
        this.cache = new Cache<ISceneVariablesMessage>(this.CACHE_SIZE);
    }

    public async confirmHit(hitToValidate: IHitToValidate<number>): Promise<IHitConfirmation> {

        let data: ISceneVariablesMessage;

        if (this.isStoredInCache(hitToValidate.differenceDataURL)) {
            data = this.cache.get(hitToValidate.differenceDataURL);
        } else {
            data = await this.getSceneDataFromUrl(hitToValidate.differenceDataURL);
            this.insertElementInCache(hitToValidate.differenceDataURL, data);
        }

        const isAHit: boolean = this.isValidHit(hitToValidate.eventInfo, data);

        return {
            isAHit:             isAHit,
            differenceIndex:    (isAHit) ? hitToValidate.eventInfo : -1,
        };
    }

    private isValidHit(objectId: number, sceneData: ISceneVariablesMessage): boolean {
        return sceneData.modifications.some((modification: IModification) => {
            return objectId === modification.id;
        });
    }

    private async getSceneDataFromUrl(url: string): Promise<ISceneVariablesMessage> {

        const axios: AxiosInstance = require("axios");

        return axios
            .get(url, {
                responseType: "arraybuffer",
            })
            .then((response: AxiosResponse) => {
                return JSON.parse(response.data.toString()) as ISceneVariablesMessage;
            })
            .catch((error: Error) => {
                throw new TypeError(this.ERROR_ON_HTTPGET);
            });
    }

    private insertElementInCache(imageUrl: string, data: ISceneVariablesMessage): void {
        const newCacheElement: IDataToCache<ISceneVariablesMessage> = {
            dataUrl:    imageUrl,
            data:       data,
        };
        this.cache.insert(newCacheElement);
    }

    private isStoredInCache(imageUrl: string): boolean {
        return this.cache.contains(imageUrl);
    }
}
