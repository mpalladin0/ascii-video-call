export class ImageProcessor {
    private _image: string

    constructor(image: string) {
        this._image = image;

    }

    public get image() {
        return this._image;
    }

    public set image(image: string) {
        if (!image) throw new Error("You must supply an image")
        
        this._image = image;
    } 
}
