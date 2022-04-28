export interface Pixel {
    red: number,
    green: number,
    blue: number,
    alpha: number
}

export function pixelToAscii(pixel: Pixel, contrast?: number): string {
    const contrastFactor = (259 * ((contrast ? contrast : 128) + 255)) / (255 * (259 - (contrast ? contrast : 128) ));
   
    const contrastedPixel = {
        red: bound(Math.floor((pixel.red - 128) * contrastFactor) + 128, [0, 255]),
        green:bound(Math.floor((pixel.green - 128) * contrastFactor) + 128, [0, 255]),
        blue: bound(Math.floor((pixel.blue - 128) * contrastFactor) + 128, [0, 255]),
        alpha: bound(Math.floor((pixel.alpha - 128) * contrastFactor) + 128, [0, 255]),
    }

    const brightnessLevel = brightnessOf(contrastedPixel);
    const character = determineCharacter(brightnessLevel);

    return character;
}

function bound(value: number, interval: [number, number]) {
    return Math.max(interval[0], Math.min(interval[1], value));
}

function brightnessOf(pixel: Pixel) {
    return (0.299 * pixel.red + 0.587 * pixel.green + 0.114 * pixel.blue) / 255;
}

function determineCharacter(brightnessLevel: number) {
    const characters =  (" .,:;i1tfLCG08@").split("");

    return characters[(characters.length - 1) - Math.round(brightnessLevel * (characters.length - 1))];
}
 