export class Utils {
    async waitForElement(selector: string): Promise<boolean> {
        return new Promise ((resolve) => {
            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(interval);
                    resolve(true);
                }
            }, 10);
        });
    }

    hexToRgb(hex: string): string {
        // Remove the hash at the start if it's there
        hex = hex.replace(/^#/, '');

        // Parse the r, g, b values
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return `${r}, ${g}, ${b}`;
    }

    force() {
        let searchbarForm = document.querySelector(".ODl7TwNawIfBwiZv1Czg")!.parentElement as HTMLElement;
        searchbarForm.style.borderRadius = "50px";

        console.log("forced");
    }
}