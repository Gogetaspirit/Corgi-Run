let canvas = document.querySelector('canvas');
let contex = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// let images = {};
// images.dog = new Image();
// images.dog.src = ''

// the position where frame will be drawn
let x = 0;
let y = 0;

let srcX = 0;
let srcY = 0;

let sheetWidth = 1476
let sheetHeight = 149

let numberOfFrames = 10;

let widthOfIndivSprite = sheetWidth / numberOfFrames;


let startingFrame = 0;
let Imgs = {}
let dog = new Image();
dog.src = "src/assets/puppy_run.jpeg"
console.log(dog)

const updateFrame = () => {
    startingFrame = startingFrame + 1
    startingFrame = startingFrame % numberOfFrames;

     srcX = startingFrame * widthOfIndivSprite
     srcY = 0
}

const draw = () => {
    updateFrame();
    contex.drawImage(dog, srcX, srcY, widthOfIndivSprite, sheetHeight, x, y, widthOfIndivSprite, sheetHeight)
}

setInterval(function() {
    draw();
}, 100);