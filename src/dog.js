let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')

let obstacles = [];
let gameSpeed;
let gravity;
let score;
let highscore;
let dog;
let scoreText;
let highscoreText;
let keys = {};
let catImg = new Image();
catImg.src = 'src/assets/cat.png'
let puppySlideImg = new Image();
puppySlideImg.src = 'src/assets/puppy_slide.png'
let dogImg = new Image();
dogImg.src = 'src/assets/better_puppy_run.png';
let backgroundImg = new Image();
backgroundImg.src = 'src/assets/swamp.png';
let srcX = 0;
let srcY = 0;
let sheetWidth = 859
let sheetHeight = 64
let numberOfFrames = 10;
let widthOfIndivSprite = sheetWidth / numberOfFrames;
let imgx = 0;
let imgy = 0;

let puppySheetWidth = 248;
let puppySheetHeight = 37;
let widthOfIndivPuppy = puppySheetWidth / 3;

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
        this.ogHeight = sheetHeight;
        this.widthOfIndivSprite = widthOfIndivSprite;
        this.sheetHeight = sheetHeight
        this.imgx = imgx
        this.imgy = imgy
    }


    Draw(){
        // ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        // ctx.closePath();
       
        ctx.drawImage(dogImg, widthOfIndivSprite * srcX, this.sheetHeight * srcY, widthOfIndivSprite, this.sheetHeight, this.imgx, this.imgy, this.widthOfIndivSprite, this.sheetHeight)
        console.log(this.sheetHeight) //64
        if (srcX < 9) srcX++;
        else srcX = 1;

    }

    DrawSlide(){
        ctx.drawImage(puppySlideImg, widthOfIndivPuppy * srcX, puppySheetHeight * srcY, widthOfIndivPuppy, puppySheetHeight, this.imgx, this.imgy, widthOfIndivPuppy, 32)
        console.log('hi')
        if (srcX < 1) srcX++;
        else srcX = 1;
    }

    Animation () {
        if (keys['Space'] || keys['KeyW']) {
            this.JumpFunction()
        } 
        else {
            this.jumpTimer = 0;
        
        }

        // if (keys['ShiftLeft'] || keys['KeyS']) {
        //     this.sheetHeight = this.ogHeight / 2;
        // }
        // else {
        //     this.sheetHeight = this.ogHeight;
        // }

        this.imgy += this.dy

        if (this.imgy + this.sheetHeight < canvas.height - 80) {
            this.dy += gravity
            this.onGround = false;
        }
        else {
            this.dy = 0;
            this.onGround = true;
            this.imgy = canvas.height - this.sheetHeight - 80
        }
        if (keys['ShiftLeft'] || keys['KeyS']) {
            this.DrawSlide();
        }
        else {
            this.Draw();
        }
        
        
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
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        

        this.dx = -gameSpeed;
    }

    Update() {
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }
    
    Draw(){
        // ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        // ctx.closePath();
        ctx.drawImage(catImg, this.x, this.y, this.width, this.height)
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
    let obstacle = new Obstacle(canvas.width + sizeOfObstacle, canvas.height - sizeOfObstacle - 80,
        sizeOfObstacle, sizeOfObstacle);

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

    gameSpeed = 6;
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

    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)

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
            dog.imgx < indivObstacle.x + indivObstacle.width && 
            dog.imgx + dog.widthOfIndivSprite > indivObstacle.x &&
            dog.imgy < indivObstacle.y + indivObstacle.height && 
            dog.imgy + dog.sheetHeight > indivObstacle.y
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


