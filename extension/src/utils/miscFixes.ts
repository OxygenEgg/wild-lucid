import { Utils } from "./utils";

export class MiscFixes {
    async fixBackground() {
        const utils = new Utils();
        await utils.waitForElement("#Desktop_LeftSidebar_Id");

        const topContainer = document.querySelector("#Desktop_LeftSidebar_Id")!.parentElement as HTMLElement;
        topContainer.style.setProperty("background-color", "var(--spice-sidebar)", "important");
    }
}