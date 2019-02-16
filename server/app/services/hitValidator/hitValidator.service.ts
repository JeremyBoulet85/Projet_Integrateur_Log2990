import { AxiosInstance, AxiosResponse } from "axios";
import { injectable } from "inversify";
import { Cache } from "./cache";
import { IHitConfirmation, IHitToValidate, IImageToCache } from "./interfaces";

@injectable()
export class HitValidatorService {

    private readonly ERROR_ON_HTTPGET:      string =
    "Didn't succeed to get image buffer from URL given. File: hitValidator.service.ts. Line: 64.";
    private readonly BUFFER_OFFSET_WIDTH:   number = 18;
    private readonly BUFFER_OFFSET_HEIGHT:  number = 22;
    private readonly BUFFER_HEADER_SIZE:    number = 54;
    private readonly BUFFER_24BIT_SIZE:     number = 3;
    private readonly CACHE_SIZE:            number = 5;

    private cache: Cache;

    public constructor() {
        this.cache = new Cache(this.CACHE_SIZE);
    }

    public async confirmHit(hitToValidate: IHitToValidate): Promise<IHitConfirmation> {

        let buffer: Buffer;

        if (this.isStoredInCache(hitToValidate.imageUrl)) {
            buffer = this.cache.get(hitToValidate.imageUrl);
        } else {
            buffer = await this.getImageFromUrl(hitToValidate.imageUrl);
            this.insertElementInCache(hitToValidate.imageUrl, buffer);
        }
        const colorFound: number[] = this.findColorAtPoint(hitToValidate.posX, hitToValidate.posY, buffer);

        return {
            isAHit: this.isValidHit(hitToValidate, colorFound),
            hitPixelColor: colorFound,
        };
    }

    private findColorAtPoint(posX: number, posY: number, buffer: Buffer): number {

        // console.log();
        const trueX: number = posX;
        const imageWidth: number = 640;
        const imageHeight: number = 640;
        const trueY: number = imageHeight - posY;
        const headerSize: number = 54;
        const pixelSize: number = 3;
        const absolutePosition: number = trueX * pixelSize + trueY * imageWidth * pixelSize + headerSize;
        // console.log("absolutePosition " + absolutePosition );
        // console.log("buffer lenght " + buffer.length );

        return buffer[absolutePosition];
    }

    private isStoredInCache(imageUrl: string): boolean {
        return this.cache.contains(imageUrl);
    }

    private cacheImageFromUrl(imageUrl: string): void {

        // let buffer: Buffer = Buffer.from("FUCK");

        const axios: Axios.AxiosInstance = require("axios");

        axios.get(imageUrl)
        .then( (response: Axios.AxiosResponse<Buffer>) => {
             return response.data;
        })
        .then(async (buffer: Buffer) => {
            this.cache.insert({ imageUrl: imageUrl, buffer: buffer });

            return buffer;
        })
        .catch((error: Error) => {
            // console.log(error);
        });

        // return buffer;
    }

}
