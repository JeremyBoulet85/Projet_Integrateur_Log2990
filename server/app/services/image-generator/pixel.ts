
export class Pixel {

    public constructor(
        private red: number,
        private green: number,
        private blue: number,
        private alpha: number,
        ) {
        // default constructor
    }

    public isEqual(pixel: Pixel): Boolean {
        return this.red === pixel.getRed() &&
            this.green === pixel.getGreen() &&
            this.blue === pixel.getBlue() &&
            this.alpha === pixel.getAlpha();
    }

    public getRed(): number {
        return this.red;
    }

    public getGreen(): number {
        return this.green;
    }

    public getBlue(): number {
        return this.blue;
    }

    public getAlpha(): number {
        return this.alpha;
    }

}
