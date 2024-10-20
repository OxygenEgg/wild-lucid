export class AccentColorChanger {
    constructor() {
        // this. = this..bind(this);
        this.getVibrantColorOfCurrentSong = this.getVibrantColorOfCurrentSong.bind(this);
        this.setNewAccentColorInstant = this.setNewAccentColorInstant.bind(this);
        this.setNewAccentColorAnimated = this.setNewAccentColorAnimated.bind(this);
        this.hexToRgb = this.hexToRgb.bind(this);
        this.rgbToHex = this.rgbToHex.bind(this);
        this.interpolateColor = this.interpolateColor.bind(this);
        this.transitionColor = this.transitionColor.bind(this);
    }

    async setNewAccentColorInstant() {
        const root = document.documentElement;
        let vibrantColor = await this.getVibrantColorOfCurrentSong();
        root.style.setProperty("--spice-accent", vibrantColor);
        root.style.setProperty("--spice-button-active", vibrantColor);
        root.style.setProperty("--spice-button", vibrantColor);
    }

    async setNewAccentColorAnimated() {
        const root = document.documentElement;
        let rootHex = root.style.getPropertyValue("--spice-accent");
        let currentSongVibrantColorHex = await this.getVibrantColorOfCurrentSong();
        this.transitionColor(rootHex, currentSongVibrantColorHex, 80);
    }

    async getVibrantColorOfCurrentSong(): Promise<string>{
        let extractedColors = await Spicetify.colorExtractor(Spicetify.Player.data?.item.uri);
        let vibrantColor: string = extractedColors.LIGHT_VIBRANT;
        return vibrantColor;
    }

    // thanks to gpt-4o
    transitionColor(startColor: string, endColor: string, duration: number) {
        const start = this.hexToRgb(startColor);
        const end = this.hexToRgb(endColor);
        const frameRate = 60;  // 60 frames per second
        const frameDuration = 1000 / frameRate;
        const totalFrames = Math.round(duration / frameDuration);
        let currentFrame = 0;

        const interval = setInterval(() => {
            const progress = currentFrame / totalFrames;
            const intermediateColor = this.interpolateColor(start, end, progress);
            const intermediateHex = this.rgbToHex(intermediateColor.r, intermediateColor.g, intermediateColor.b);
            document.documentElement.style.setProperty("--spice-accent", intermediateHex);
            document.documentElement.style.setProperty("--spice-button-active", intermediateHex);
            document.documentElement.style.setProperty("--spice-button", intermediateHex);
            currentFrame++;

            if (currentFrame > totalFrames) {
                clearInterval(interval);
            }
        }, frameDuration);
    }

    hexToRgb(hex: string): { r: number, g: number, b: number } {
        let r = 0, g = 0, b = 0;
        if (hex.length == 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length == 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return { r, g, b };
    }

    rgbToHex(r: number, g: number, b: number): string {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    interpolateColor(color1: { r: number, g: number, b: number }, color2: { r: number, g: number, b: number }, factor: number): { r: number, g: number, b: number } {
        const r = Math.round(color1.r + factor * (color2.r - color1.r));
        const g = Math.round(color1.g + factor * (color2.g - color1.g));
        const b = Math.round(color1.b + factor * (color2.b - color1.b));
        return { r, g, b };
    }
}
