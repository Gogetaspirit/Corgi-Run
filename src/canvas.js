let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// let images = {};
// images.dog = new Image();
// images.dog.src = ''

// the position where frame will be drawn
let x = 0;
let y = 0;
let speed = 7;

let srcX = 0;
let srcY = 0;

let sheetWidth = 859
let sheetHeight = 64

let numberOfFrames = 10;

let widthOfIndivSprite = sheetWidth / numberOfFrames;


let startingFrame = 0;
let Imgs = {}
let dog = new Image();
dog.src = "src/assets/better_puppy_run.jpeg"


const drawSprite = (img, srcX, srcY, widthOfSprite, heightOfSprite, x, y, dW, dH) => {
    ctx.drawImage(img, srcX, srcY, widthOfSprite, heightOfSprite, x, y, dW, dH)
}

const animationLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawSprite(dog, widthOfIndivSprite * srcX, sheetHeight * srcY, widthOfIndivSprite, sheetHeight, x, y, widthOfIndivSprite, sheetHeight);
    
    if (srcX < 9) srcX++;
    else srcX = 1;

    //code below makes dog move across the screen
    if (x < canvas.width + widthOfIndivSprite) x += speed;
    else x = 0 - widthOfIndivSprite;
}

window.onload = setInterval(animationLoop, 1000/30) 