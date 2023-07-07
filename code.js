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
const config = {
    dvdQuant: 500,
    size: 16,
    randomVelocity: true,
    colisionBetween: true,
};
class colisionObject {
    constructor(x, y, width, height, vx, vy) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = vx;
        this.vy = vy;
        const i = 1 / Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vNormalized = [this.vx * i, this.vy * i];
    }
    isColided(obj) {
        if (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y) {
            return true;
        }
        return false;
    }
    isBorderColided(width, height) {
        if (this.x >= width - this.width || this.x <= 0 ||
            this.y >= height - this.height || this.y <= 0) {
            return true;
        }
        return false;
    }
    calculateNormilized() {
        const i = 1 / Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vNormalized = [this.vx * i, this.vy * i];
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
    borderColision(width, height) {
        if (this.x > width - this.width) {
            this.x = width - this.width;
            this.vx = -Math.abs(this.vx);
        }
        if (this.x < 0) {
            this.x = 0;
            this.vx = Math.abs(this.vx);
        }
        if (this.y > height - this.height) {
            this.y = height - this.height;
            this.vy = -Math.abs(this.vy);
        }
        if (this.y < 0) {
            this.y = 0;
            this.vy = Math.abs(this.vy);
        }
    }
    boxColision(obj) {
        //Overlap
        this.x += (this.x - obj.x) / 2;
        this.y += (this.y - obj.y) / 2;
        if (Math.sign(obj.vx) + Math.sign(this.vx) === 0) {
            this.vx *= -1;
            obj.vx *= -1;
        }
        if (Math.sign(obj.vy) + Math.sign(this.vy) === 0) {
            this.vy *= -1;
            obj.vy *= -1;
        }
        /*
        while(this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y &&
        ){

            if(this.x > obj.x){
                obj.x--;
            } else if(this.x < obj.x){
                obj.x++;
            }
        
            if(this.y > obj.y){
                obj.y--;
            } else if(this.y < obj.y){
                obj.y++;
            }
        }*/
    }
}
class DvDObject {
    constructor() {
        // creating div
        this.div = document.createElement("div");
        // configurating div
        this.div.className = "animated";
        this.div.style.width = `${config.size}px`;
        // creating svg has a child of div
        this.svg = this.div.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
        // configurating svg
        this.svg.innerHTML = `<path fill-rule="evenodd" clip-rule="evenodd" d="M469.9 212.1h-14.7l-.4 2.2h6.2l-2.2 17.3h2.6l2.3-17.3h5.7zM480.1 224.9l-3.1-12.8h-1.8l-6.7 19.5h2.2l5.4-15.1 3.1 15.1 8-15.1v15.1h2.6v-19.5h-2.6zM76.2 282.1 59 249.7H44.3l27.1 49.7h8.4l27.5-49.7H92.2zM141 275.4v24h13.3v-49.7H141zM285 299.4h36.8V291h-23v-13.3h21.7v-8.5h-21.7v-11h23v-8.5H285zM472 188.1c0-18.6-105.6-33.7-236-33.7S0 169.5 0 188.1s105.7 33.7 236 33.7 236-15 236-33.7zm-298.7.5c0-6.2 24.2-11.1 54.1-11.1s54 5 54 11-24.1 11.1-54 11.1-54-5-54-11zM392.3 249.5c-19.3 0-35 11.1-35 24.8s15.7 24.8 35 24.8 35-11 35-24.8c0-13.7-15.7-24.8-35-24.8zm0 40.6c-11.5 0-20.8-7-20.8-15.8 0-8.7 9.3-15.7 20.8-15.7s20.8 7 20.8 15.7-9.3 15.8-20.8 15.8zM214.8 249.7h-21v49.7h21s33.4 0 33.4-24.6-33.4-25-33.4-25zm-7 41.2v-32.7s26.2-1.7 26.2 16.5c0 18.1-26.1 16.2-26.1 16.2zM192 54.3a78 78 0 0 0-4-26.2h1.7L234.5 154 344.5 28h59.3S450 26.8 450 56.5s-38.4 41.2-63 41.2h-10.6l13.8-59.4h-48.3l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4C500 1.3 418.9.6 418.9.6h-102l-64.7 81.6L227 .6H43l-6.7 27.5h61.5c8.7.2 44 2.4 44 28.4 0 29.7-38.4 41.2-62.9 41.2H68.3L82 38.3H33.7l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4z"/>`;
        this.svg.setAttribute("viewBox", "0 0 500 300");
        this.svg.setAttribute('fill', this.randomColor());
        // rendering in DOM
        document.body.appendChild(this.div);
        const v = this.genVelocity();
        // properties from the dom
        [this.div.style.left, this.div.style.top] = this.randomPosition();
        this.obj = new colisionObject(this.div.offsetLeft, this.div.offsetTop, this.div.offsetWidth, this.div.offsetHeight, v[0], v[1]);
    }
    setPositionInDom() {
        this.div.style.left = `${this.obj.x}px`;
        this.div.style.top = `${this.obj.y}px`;
    }
    changeColor() {
        this.svg.setAttribute('fill', this.randomColor());
    }
    invertVelocity() {
        this.obj.vx *= -1;
        this.obj.vy *= -1;
        const i = 1 / Math.sqrt(this.obj.vx * this.obj.vx + this.obj.vy * this.obj.vy);
        this.obj.vNormalized = [this.obj.vx * i, this.obj.vy * i];
    }
    randomPosition() {
        return [
            `${Math.ceil(Math.random() * (viewScreen.width - this.div.offsetWidth))}px`,
            `${Math.ceil(Math.random() * (viewScreen.height - this.div.offsetHeight))}px`
        ];
    }
    randomColor() {
        return `#${Math.floor(Math.random() * 10000000 + 6777215).toString(16)}`;
    }
    genVelocity() {
        let v_m;
        if (config.randomVelocity) {
            v_m = Math.ceil(Math.random() * 6) + 4;
        }
        v_m = 5;
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
    simpleEntityColision(obj) {
        if (this.obj.isColided(obj)) {
            if (this.obj.vx > 0) {
                if (obj.vx <= 0) {
                    this.obj.vx *= -1;
                    obj.vx *= -1;
                }
            }
            else {
                if (obj.vx > 0) {
                    this.obj.vx *= -1;
                    obj.vx *= -1;
                }
            }
            if (this.obj.vy > 0) {
                if (obj.vy <= 0) {
                    this.obj.vy *= -1;
                    obj.vy *= -1;
                }
            }
            else {
                if (obj.vy > 0) {
                    this.obj.vy *= -1;
                    obj.vy *= -1;
                }
            }
            this.changeColor();
        }
    }
    simpleBorderColision() {
        if (this.obj.x > viewScreen.width - this.obj.width || this.obj.x < 0) {
            // this.obj.borderCorrection(viewScreen.width, viewScreen.height);
            this.obj.vx *= -1;
            this.changeColor();
        }
        if (this.obj.y > viewScreen.height - this.obj.height || this.obj.y < 0) {
            // this.obj.borderCorrection(viewScreen.width, viewScreen.height);
            this.obj.vy *= -1;
            this.changeColor();
        }
        this.obj.calculateNormilized();
    }
}
const dvds = [];
for (let i = 0; i < config.dvdQuant; i++) {
    dvds.push(new DvDObject);
}
const updateDVDs = () => __awaiter(void 0, void 0, void 0, function* () {
    // Colision System
    let i;
    for (i = 0; i < dvds.length; i++) {
        dvds[i].obj.move();
    }
    if (config.colisionBetween) {
        for (i = 0; i < dvds.length; i++) {
            for (let j = 0; j < dvds.length; j++) {
                if (j !== i && dvds[i].obj.isColided(dvds[j].obj)) {
                    dvds[i].changeColor();
                    dvds[j].changeColor();
                    dvds[i].obj.boxColision(dvds[j].obj);
                }
            }
        }
    }
    for (i = 0; i < dvds.length; i++) {
        if (dvds[i].obj.isBorderColided(viewScreen.width, viewScreen.height)) {
            dvds[i].changeColor();
            dvds[i].obj.borderColision(viewScreen.width, viewScreen.height);
        }
    }
    // Plot Canvas
    for (i = 0; i < dvds.length; i++) {
        dvds[i].setPositionInDom();
    }
});
window.setInterval(updateDVDs, 16.67); //60 fps
