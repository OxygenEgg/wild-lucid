import { Utils } from "./utils";

export class FullscreenTweaks {
    constructor() {
        this.editFsButton = this.editFsButton.bind(this);
    }

    async editFsButton(): Promise<void> {
        const utils = new Utils();
        await utils.waitForElement("#fs-button");

        const fsButton = document.getElementById("fs-button") as HTMLElement;

        while (fsButton?.firstChild) {
          fsButton.removeChild(fsButton.firstChild);
        }

        const fsIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        fsIcon.setAttribute("data-encore-id", "icon");
        fsIcon.setAttribute("role", "img");
        fsIcon.setAttribute("height", "16");
        fsIcon.setAttribute("width", "16");
        fsIcon.setAttribute("aria-hidden", "true");
        fsIcon.setAttribute("viewBox", "0 0 16 16");
        fsIcon.setAttribute("class", "Svg-sc-ytk21e-0 Svg-img-icon-small");
        fsIcon.innerHTML = `
        <path d="m4.75,16H.75c-.41,0-.75-.34-.75-.75s.34-.75.75-.75h4c.41,0,.75.34.75.75s-.34.75-.75.75Z"></path>
        <path d="m.75,16c-.41,0-.75-.34-.75-.75v-4c0-.41.34-.75.75-.75s.75.34.75.75v4c0,.41-.34.75-.75.75Z"></path>
        <path d="m15.25,1.5h-4c-.41,0-.75-.34-.75-.75s.34-.75.75-.75h4c.41,0,.75.34.75.75s-.34.75-.75.75Z"></path>
        <path d="m15.25,5.5c-.41,0-.75-.34-.75-.75V.75c0-.41.34-.75.75-.75s.75.34.75.75v4c0,.41-.34.75-.75.75Z"></path>
        <path d="m.75,5.5c-.41,0-.75-.34-.75-.75V.75c0-.41.34-.75.75-.75s.75.34.75.75v4c0,.41-.34.75-.75.75Z"></path>
        <path d="m4.75,1.5H.75c-.41,0-.75-.34-.75-.75s.34-.75.75-.75h4c.41,0,.75.34.75.75s-.34.75-.75.75Z"></path>
        <path d="m15.25,16c-.41,0-.75-.34-.75-.75v-4c0-.41.34-.75.75-.75s.75.34.75.75v4c0,.41-.34.75-.75.75Z"></path>
        <path d="m15.25,16h-4c-.41,0-.75-.34-.75-.75s.34-.75.75-.75h4c.41,0,.75.34.75.75s-.34.75-.75.75Z"></path>
        `;
        fsButton.appendChild(fsIcon);

        fsButton.setAttribute("class", "Button-sc-1dqy6lx-0 Button-small-small-buttonTertiary-iconOnly-isUsingKeyboard-useBrowserDefaultFocusStyle main-genericButton-button");
        fsButton.setAttribute("data-active", "false");
        fsButton.setAttribute("data-encore-id", "buttonTertiary");
    }
}