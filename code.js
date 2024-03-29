"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("Hello World!");
//
// Const
//
const viewScreen = { width: window.innerWidth, height: window.innerHeight };
window.addEventListener("resize", () => {
    viewScreen.width = window.innerWidth;
    viewScreen.height = window.innerHeight;
});
const dvdPath = `<path fill-rule="evenodd" clip-rule="evenodd" d="M469.9 212.1h-14.7l-.4 2.2h6.2l-2.2 17.3h2.6l2.3-17.3h5.7zM480.1 224.9l-3.1-12.8h-1.8l-6.7 19.5h2.2l5.4-15.1 3.1 15.1 8-15.1v15.1h2.6v-19.5h-2.6zM76.2 282.1 59 249.7H44.3l27.1 49.7h8.4l27.5-49.7H92.2zM141 275.4v24h13.3v-49.7H141zM285 299.4h36.8V291h-23v-13.3h21.7v-8.5h-21.7v-11h23v-8.5H285zM472 188.1c0-18.6-105.6-33.7-236-33.7S0 169.5 0 188.1s105.7 33.7 236 33.7 236-15 236-33.7zm-298.7.5c0-6.2 24.2-11.1 54.1-11.1s54 5 54 11-24.1 11.1-54 11.1-54-5-54-11zM392.3 249.5c-19.3 0-35 11.1-35 24.8s15.7 24.8 35 24.8 35-11 35-24.8c0-13.7-15.7-24.8-35-24.8zm0 40.6c-11.5 0-20.8-7-20.8-15.8 0-8.7 9.3-15.7 20.8-15.7s20.8 7 20.8 15.7-9.3 15.8-20.8 15.8zM214.8 249.7h-21v49.7h21s33.4 0 33.4-24.6-33.4-25-33.4-25zm-7 41.2v-32.7s26.2-1.7 26.2 16.5c0 18.1-26.1 16.2-26.1 16.2zM192 54.3a78 78 0 0 0-4-26.2h1.7L234.5 154 344.5 28h59.3S450 26.8 450 56.5s-38.4 41.2-63 41.2h-10.6l13.8-59.4h-48.3l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4C500 1.3 418.9.6 418.9.6h-102l-64.7 81.6L227 .6H43l-6.7 27.5h61.5c8.7.2 44 2.4 44 28.4 0 29.7-38.4 41.2-62.9 41.2H68.3L82 38.3H33.7l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4z"/>`;
class DvDObject {
    constructor() {
        this.updateAnimation = () => __awaiter(this, void 0, void 0, function* () {
            this.position[0] = this.div.offsetLeft + this.velocity[0];
            this.position[1] = this.div.offsetTop + this.velocity[1];
            if (this.position[0] >= viewScreen.width - this.width || this.position[0] <= 0) {
                this.velocity[0] *= -1;
                this.svg.setAttribute('fill', this.randomColor());
            }
            if (this.position[1] >= viewScreen.height - this.height || this.position[1] <= 0) {
                this.velocity[1] *= -1;
                this.svg.setAttribute('fill', this.randomColor());
            }
            this.div.style.left = `${this.div.offsetLeft + this.velocity[0]}px`;
            this.div.style.top = `${this.div.offsetTop + this.velocity[1]}px`;
        });
        // creating div
        this.div = document.createElement("div");
        // configurating div
        this.div.className = "animated";
        // creating svg has a child of div
        this.svg = this.div.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
        // configurating svg
        this.svg.innerHTML = dvdPath;
        this.svg.setAttribute("viewBox", "0 0 500 300");
        this.svg.setAttribute('fill', this.randomColor());
        // rendering in DOM
        document.body.appendChild(this.div);
        // properties from the dom
        [this.div.style.left, this.div.style.top] = this.randomPosition();
        this.width = this.div.offsetWidth;
        this.height = this.div.offsetHeight;
        this.position = [this.div.offsetLeft, this.div.offsetTop];
        this.velocity = this.randomVelocity();
    }
    randomPosition() {
        return [
            `${Math.ceil(Math.random() * (viewScreen.width - this.div.offsetWidth))}px`,
            `${Math.ceil(Math.random() * (viewScreen.height - this.div.offsetHeight))}px`
        ];
    }
    randomColor() {
        return `#${Math.floor(Math.random() * 10000000 + 6777215).toString(16)}`;
        const rgb = [Math.random() * 256 - 1, Math.random() * 256 - 1, Math.random() * 256 - 1];
        const rgbDecimal = (rgb[2] * 256 + rgb[1]) * 256 + rgb[0];
        return `#${Math.floor(rgbDecimal).toString(16)}`;
    }
    randomVelocity() {
        const v_m = Math.ceil(Math.random() * 6) + 4;
        const direction = Math.ceil(Math.random() * 4);
        switch (direction) {
            case 1:
                return [v_m, v_m];
            case 2:
                return [v_m, -v_m];
            case 3:
                return [-v_m, v_m];
            default:
                return [-v_m, -v_m];
        }
    }
}
const dvds = [];
for (let i = 0; i < 100; i++) {
    dvds.push(new DvDObject);
}
const updateDVDs = () => __awaiter(void 0, void 0, void 0, function* () {
    dvds.map((dvd) => dvd.updateAnimation());
});
window.setInterval(updateDVDs, 16.67); //60 fps
