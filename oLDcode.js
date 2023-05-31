console.log("Hello World!");

//
// Const
//
const animatedDiv = document.body.appendChild(document.createElement("div"));
const viewport = {width: window.innerWidth, height: window.innerHeight};
window.addEventListener("resize", () => {
    viewport.width = window.innerWidth;
    viewport.height = window.innerHeight;
});

animatedDiv.id = "animated";
[animatedDiv.style.left, animatedDiv.style.top] = initRandomPosition();

const aniObj = {
    width: animatedDiv.offsetWidth,   //px
    height: animatedDiv.offsetHeight,  //px
    position: [animatedDiv.offsetLeft, animatedDiv.offsetTop],
    velocity: [5, 5],
}
console.log(aniObj);

//
// Functions
//
const update = () => {
    animatedDiv.style.left = animatedDiv.offsetLeft + aniObj.velocity[0];
    animatedDiv.style.top = animatedDiv.offsetTop + aniObj.velocity[1];
}
window.setInterval(update, 16.67); //60 fps


function initRandomPosition() {
    return [
        `${Math.ceil(Math.random()*(viewport.width-animatedDiv.offsetWidth))}px`,
        `${Math.ceil(Math.random()*(viewport.height-animatedDiv.offsetHeight))}px`
    ];   
}