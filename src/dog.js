let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')


// canvas.width = 1100;
// canvas.height = 600;
// canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid black";

// let gamespeed = 2;
// // let images = {};

// images.dog = new Image();
// images.dog.src = ''
// let background = new Image();
// background.src = "src/assets/background.jpeg"

// const BG = {
//     //pos on horizontal x axis
//     x1: 0,
//     //pos on horizontal x for 2nd background
//     x2: canvas.width,
//     y: 0,
//     width: canvas.width,
//     height: canvas.height
// }

// const makeBG = () => {
//     // if (BG.x1 <= BG.width) BG.x1 = BG.width
//     // else BG.x1 -= gamespeed;
//     ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height)
// }



// //the position where frame will be drawn
// let x = 300;
// let y = 450;
// let speed = 15;

// let srcX = 0;
// let srcY = 0;

// let sheetWidth = 859
// let sheetHeight = 64

// let numberOfFrames = 10;

// let widthOfIndivSprite = sheetWidth / numberOfFrames;


// let startingFrame = 0;
// let Imgs = {}
// let dog = new Image();
// dog.src = "src/assets/better_puppy_run.png"


// const drawSprite = (img, srcX, srcY, widthOfSprite, heightOfSprite, x, y, dW, dH) => {
//     ctx.drawImage(img, srcX, srcY, widthOfSprite, heightOfSprite, x, y, dW, dH)
// }

// const animationLoop = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     makeBG()
//     drawSprite(dog, widthOfIndivSprite * srcX, sheetHeight * srcY, widthOfIndivSprite, sheetHeight, x, y, widthOfIndivSprite, sheetHeight);
    
//     if (srcX < 9) srcX++;
//     else srcX = 1;

//     //code below makes dog move across the screen
//     if (x < canvas.width + widthOfIndivSprite) x += speed;
//     else x = 0 - widthOfIndivSprite;
// }

// function moveDog() {
//     window.addEventListener("keydown", (e) => {
//         animationLoop();
//     })
// }

// function initialLoad() {
//     makeBG();
//     drawSprite(dog, widthOfIndivSprite * srcX, sheetHeight * srcY, widthOfIndivSprite, sheetHeight, 300, 450, widthOfIndivSprite, sheetHeight)
// }

// window.onload = initialLoad;
// moveDog();

//testing inital render on page

let gameSpeed;
let gravity;
let score;
let highscore;
let dog;
let keys = {};

//event listeners
document.addEventListener('keydown', function(e) {
    keys[e.code] = true;
})

document.addEventListener('keyup', function(e) {
    keys[e.code] = false;
})

class Dog {
    constructor(x, y, width, height , color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        
        this.dy = 0;
        this.jumpForce = 15;
        this.originalHeight = height;
        this.jumpTimer = 0;
        this.onGround = true;
    }


    Draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.closePath();
    }

    Animation () {
        if (keys['Space'] || keys['KeyW']) {
            this.JumpFunction()
        } 
        else {
            this.jumpTimer = 0;
        
        }
        this.y += this.dy
        this.y = canvas.height - this.height
        
        this.Draw();
    }

    JumpFunction() {
        if (this.onGround === true && this.jumpTimer === 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        }
        else if (this.jumpTimer > 0 && this.jumpTimer < 15){
            this.jumpTimer = this.jumpTimer + 1
            this.dy = -this.jumpForce - (this.jumpTimer / 50)
        }
    }
}




function start (){
    canvas.width = 1100;
    canvas.height = 600;
    canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid black";

    gameSpeed = 3;
    gravity = 1;
    score = 0;
    highscore = 0;

    dog = new Dog(25, canvas.height - 150, 50, 50, '#FF5858')
    requestAnimationFrame(update);
}

const update = () => {
    requestAnimationFrame(update);
    // clears canvas before drawing every time
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dog.Animation();
}

window.onload = start;


