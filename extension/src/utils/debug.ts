export class Debug {
    constructor() {
        // this. = this..bind(this);
        this.addSquaresViewer = this.addSquaresViewer.bind(this);
        this.addColorSquare = this.addColorSquare.bind(this);
    }

    async addSquaresViewer() {
        let navbar = document.getElementById("Desktop_LeftSidebar_Id") as HTMLElement;
        let colors = await Spicetify.colorExtractor(Spicetify.Player.data?.item.uri);

        if ( document.getElementById("csq") ) {
            document.getElementById("csq")!.remove();
        }

        let colorSquares = document.createElement("div");
        colorSquares.id = "csq";
        this.addColorSquare(colorSquares, "DESATURATED", colors.DESATURATED);
        this.addColorSquare(colorSquares, "LIGHT_VIBRANT", colors.LIGHT_VIBRANT);
        this.addColorSquare(colorSquares, "VIBRANT", colors.VIBRANT);
        this.addColorSquare(colorSquares, "VIBRANT_NON_ALARMING", colors.VIBRANT_NON_ALARMING);

        navbar.prepend(colorSquares);
    }

    addColorSquare(element: HTMLDivElement, text: string, color: string) {
        const square = document.createElement("div");
        square.innerHTML = text;
        square.style.backgroundColor = color;
        square.style.color = "#ff00ff"
        element.appendChild(square);
    }
}