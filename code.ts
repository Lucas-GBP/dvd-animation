console.log("Hello World!");

const dvdPath = `<path fill-rule="evenodd" clip-rule="evenodd" d="M469.9 212.1h-14.7l-.4 2.2h6.2l-2.2 17.3h2.6l2.3-17.3h5.7zM480.1 224.9l-3.1-12.8h-1.8l-6.7 19.5h2.2l5.4-15.1 3.1 15.1 8-15.1v15.1h2.6v-19.5h-2.6zM76.2 282.1 59 249.7H44.3l27.1 49.7h8.4l27.5-49.7H92.2zM141 275.4v24h13.3v-49.7H141zM285 299.4h36.8V291h-23v-13.3h21.7v-8.5h-21.7v-11h23v-8.5H285zM472 188.1c0-18.6-105.6-33.7-236-33.7S0 169.5 0 188.1s105.7 33.7 236 33.7 236-15 236-33.7zm-298.7.5c0-6.2 24.2-11.1 54.1-11.1s54 5 54 11-24.1 11.1-54 11.1-54-5-54-11zM392.3 249.5c-19.3 0-35 11.1-35 24.8s15.7 24.8 35 24.8 35-11 35-24.8c0-13.7-15.7-24.8-35-24.8zm0 40.6c-11.5 0-20.8-7-20.8-15.8 0-8.7 9.3-15.7 20.8-15.7s20.8 7 20.8 15.7-9.3 15.8-20.8 15.8zM214.8 249.7h-21v49.7h21s33.4 0 33.4-24.6-33.4-25-33.4-25zm-7 41.2v-32.7s26.2-1.7 26.2 16.5c0 18.1-26.1 16.2-26.1 16.2zM192 54.3a78 78 0 0 0-4-26.2h1.7L234.5 154 344.5 28h59.3S450 26.8 450 56.5s-38.4 41.2-63 41.2h-10.6l13.8-59.4h-48.3l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4C500 1.3 418.9.6 418.9.6h-102l-64.7 81.6L227 .6H43l-6.7 27.5h61.5c8.7.2 44 2.4 44 28.4 0 29.7-38.4 41.2-62.9 41.2H68.3L82 38.3H33.7l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4z"/>`
//
// Const
//
const animatedDiv = document.body.appendChild(document.createElement("div"));
const viewScreen = {width: window.innerWidth, height: window.innerHeight};
window.addEventListener("resize", () => {
    viewScreen.width = window.innerWidth;
    viewScreen.height = window.innerHeight;
});

animatedDiv.id = "animated";
const dvdLogo = animatedDiv.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
dvdLogo.innerHTML = dvdPath;
dvdLogo.setAttribute("viewBox", "0 0 500 300");
dvdLogo.setAttribute('fill', randomColor());
[animatedDiv.style.left, animatedDiv.style.top] = randomPosition();

const aniObject = {
    width: animatedDiv.offsetWidth,   //px
    height: animatedDiv.offsetHeight,  //px
    position: [animatedDiv.offsetLeft, animatedDiv.offsetTop],
    velocity: randomVelocity(),
}
console.log(aniObject);

//
// Functions
//
const updateAnimation = () => {
    const x = animatedDiv.offsetLeft + aniObject.velocity[0];
    const y = animatedDiv.offsetTop + aniObject.velocity[1];

    if(x >= viewScreen.width - aniObject.width || x <= 0){
        aniObject.velocity[0] *= -1;
        dvdLogo.setAttribute('fill', randomColor());;
    }
    if(y >= viewScreen.height - aniObject.height || y <= 0){
        aniObject.velocity[1] *= -1;
        dvdLogo.setAttribute('fill', randomColor());;
    }

    animatedDiv.style.left = `${animatedDiv.offsetLeft + aniObject.velocity[0]}px`;
    animatedDiv.style.top = `${animatedDiv.offsetTop + aniObject.velocity[1]}px`;
}
window.setInterval(updateAnimation, 16.67); //60 fps


function randomPosition() {
    return [
        `${Math.ceil(Math.random()*(viewScreen.width-animatedDiv.offsetWidth))}px`,
        `${Math.ceil(Math.random()*(viewScreen.height-animatedDiv.offsetHeight))}px`
    ];   
}

function randomColor() {
    return `#${Math.floor(Math.random()*10000000+6777215).toString(16)}`;

    const rgb = [Math.random()*256-1, Math.random()*256-1, Math.random()*256-1];
    const rgbDecimal = (rgb[2]*256+rgb[1])*256+rgb[0];
    return `#${Math.floor(rgbDecimal).toString(16)}`;
}

function randomVelocity() {
    const v_m = Math.ceil(Math.random()*6)+4;
    const direction = Math.ceil(Math.random()*4);
    switch (direction){
        case 1:
            return [v_m, v_m]
        case 2:
            return [v_m, -v_m]
        case 3:
            return [-v_m, v_m]
        default:
            return [-v_m, -v_m]
    }
}