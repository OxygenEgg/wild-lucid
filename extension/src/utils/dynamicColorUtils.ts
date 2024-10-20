import type { Color, ColorPalette, WildColorPalette, ExtractedColors } from "@/types/colors";
import {
	contrastRatio,
	darkenColor,
	lightenColor,
	rgbToHex,
} from "@/utils/colorUtils";
import { logError } from "@/utils/logUtils";
import { createCanvas, loadImage } from "canvas";
import { AccentColorChanger } from "@/utils/accentColorChanger";

// Function to extract dominant colors from an image
async function extractDominantColorsFromImage(
	imageUrl: string,
): Promise<ExtractedColors | Error> {
	try {
		let extractedColors = await Spicetify.colorExtractor(Spicetify.Player.data?.item.uri);
        let vibrantColorHex: string = extractedColors.LIGHT_VIBRANT;
		let accentcolorRgb = hexToRgb(vibrantColorHex);

		let accentColor: Color = {
			r: accentcolorRgb.r,
			g: accentcolorRgb.g,
			b: accentcolorRgb.b,
			hex: vibrantColorHex
		}

		let baseColor = accentColor;
		let secondaryColor = accentColor;
		let tertiaryColor = accentColor;

		console.warn(accentColor);

		return {
			baseColor, secondaryColor, tertiaryColor
		};
	} catch (error) {
		logError("Error extracting colors: ", error);
		return error as Error;
	}
}

function hexToRgb(hex: string): { r: number, g: number, b: number } {
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

let colorExtractionTimeout: ReturnType<typeof setTimeout> | null = null;

export async function applyExtractedColorsToCSS(
	styleElement: HTMLElement,
	isDynamicColor: boolean,
	currentArtUrl: string,
): Promise<ExtractedColors | null> {
	if (!isDynamicColor || !currentArtUrl) return null;

	return new Promise<ExtractedColors | null>((resolve) => {
		if (colorExtractionTimeout) {
			clearTimeout(colorExtractionTimeout);
		}

		colorExtractionTimeout = setTimeout(async () => {
			try {
				const extractedColors =
					await extractDominantColorsFromImage(currentArtUrl);

				if (extractedColors instanceof Error) {
					logError(`Error extracting colors: ${extractedColors.message}`);
					resolve(null);
					return;
				}

				const colorPalette = generateDarkModePalette(extractedColors);

				applyColorPaletteToCSS(styleElement, colorPalette);

				resolve(extractedColors);
			} catch (error) {
				logError(
					"Error saving colors to style: ",
					error instanceof Error ? error.message : error,
				);
				resolve(null);
			}
		}, 200);
	});
}

export function applyColorPaletteToCSS(
	styleElement: HTMLElement,
	colorPalette: WildColorPalette,
) {
	let styleContent = `:root {${Object.entries(colorPalette)
		.map(
			([name, color]) =>
				`\n--spice-${name}: ${color.hex} !important;\n--spice-rgb-${name}: ${color.r}, ${color.g}, ${color.b} !important;`,
		)
		.join("")}\n}`;
	styleContent +=
		":root{\nwill-change: --spice-accent,--spice-rgb-accent,--spice-button,--spice-rgb-button,--spice-button-active,--spice-rgb-button-active,--spice-progress-bar,--spice-rgb-progress-bar,--spice-primary,--spice-rgb-primary,--spice-secondary,--spice-rgb-secondary,--spice-tertiary,--spice-rgb-tertiary;\ntransition: all 1s ease-in-out;\n}";

	styleElement.textContent = styleContent;
}

export async function resetCSSColorVariables(styleElement: HTMLElement) {
	styleElement.textContent =
		":root{\nwill-change: --spice-accent,--spice-rgb-accent,--spice-button,--spice-rgb-button,--spice-button-active,--spice-rgb-button-active,--spice-progress-bar,--spice-rgb-progress-bar,--spice-primary,--spice-rgb-primary,--spice-secondary,--spice-rgb-secondary,--spice-tertiary,--spice-rgb-tertiary;\ntransition: all 1s ease-in-out;\n}";
}

function generateDarkModePalette({
	baseColor,
	secondaryColor,
	tertiaryColor,
}: ExtractedColors): WildColorPalette {
	return {
		"progress-bar": secondaryColor,
		accent: baseColor,
		button: tertiaryColor,
		"button-active": tertiaryColor,
		primary: baseColor,
		secondary: secondaryColor,
		tertiary: tertiaryColor,
	};
}