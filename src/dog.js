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
let obstacles = [];
let gameSpeed;
let gravity;
let score;
let highscore;
let dog;
let scoreText;
let highscoreText;
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
        this.onGround = false;
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

        if (keys['ShiftLeft'] || keys['KeyS']) {
            this.height = this.originalHeight / 2;
        }
        else {
            this.height = this.originalHeight;
        }

        this.y += this.dy

        if (this.y + this.height < canvas.height) {
            this.dy += gravity
            this.onGround = false;
        }
        else {
            this.dy = 0;
            this.onGround = true;
            this.y = canvas.height - this.height
        }
       
        
        this.Draw();
    }

    JumpFunction() {
        if (this.onGround === true && this.jumpTimer === 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        }
        else if (this.jumpTimer > 0 && this.jumpTimer < 15){
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50)
        }
    }
}

class Obstacle {
    constructor(x, y, width, height , color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.dx = -gameSpeed;
    }

    Update() {
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }
    
    Draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.closePath();
    }
}

class ScoreBoard {
    constructor(text, x, y, alignment, color, size) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.alignment = alignment;
        this.color = color;
        this.size = size;
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.size + "px sans-serif";
        ctx.textAlign = this.alignment;
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath()
    }

}





//game controls 

function makeObstacles() {
    let sizeOfObstacle = randomNumber(20, 70)

    //0 is ground unit, 1 is in air unit
    let type = randomNumber(0, 1)
    let obstacle = new Obstacle(canvas.width + sizeOfObstacle, canvas.height - sizeOfObstacle,
        sizeOfObstacle, sizeOfObstacle, '#2484E4');

    if (type === 1) {
        obstacle.y -= dog.originalHeight - 10;
    }
    obstacles.push(obstacle)
}



function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function start (){
    canvas.width = 1100;
    canvas.height = 600;
    canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid black";

    gameSpeed = 3;
    gravity = 1;
    score = 0;
    highscore = 0;
    if (localStorage.getItem('highscore')) {
        highscore = localStorage.getItem('highscore')
    }

    dog = new Dog(25, 0, 50, 50, '#FF5858')

    scoreText = new ScoreBoard("Score: " + score, 25, 25, "left", '#212121', "20")
    highscoreText = new ScoreBoard("Highscore: " + highscore, canvas.width - 30, 30, "right", "#212121", "20")
    requestAnimationFrame(update);
}

let initialObstacleSpawn = 100;
let spawnTimer = initialObstacleSpawn;


const update = () => {
    requestAnimationFrame(update);
    // clears canvas before drawing every time
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    spawnTimer--;
    if (spawnTimer <= 0) {
        makeObstacles();
        spawnTimer = initialObstacleSpawn - gameSpeed * 8;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    for (i = 0; i < obstacles.length; i++) {
        let indivObstacle = obstacles[i];

        if (indivObstacle.x + indivObstacle.width < 0) {
            //delete it will help will memory and frame issues
            obstacles.splice(i, 1);
        } 

        if (
            dog.x < indivObstacle.x + indivObstacle.width && 
            dog.x + dog.width > indivObstacle.x &&
            dog.y < indivObstacle.y + indivObstacle.height && 
            dog.y + dog.height > indivObstacle.y
            ) 
            {
                obstacles = [];
                score = 0;
                spawnTimer = initialObstacleSpawn;
                gameSpeed = 3;
            window.localStorage.setItem('highscore', highscore)
            }

        indivObstacle.Update()
    }

    dog.Animation();
    score++;
    scoreText.text = "Score: " + score
    scoreText.Draw();

    if (score > highscore) {
        highscore = score;
        highscoreText.text = "Highscore: " + highscore;
       
    }

    highscoreText.Draw()


    gameSpeed += 0.003;
}


window.onload = start;


