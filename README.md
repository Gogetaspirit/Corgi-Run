# Dog-Run

## Checkout the Live Game Here! [Dog Run](https://clee1996.github.io/Dog-Run/)

## Background
* Dog Run is a web game inspired by temple run. Users will play as a "dog" and will have to navigate through obstacles by jumping.
Similar to temple run, the User will be able to run and jump. Points are based on time and stored via local storage. Once a user hits an obstacle, the game will then be over.

![corgigif](src/assets/corgirun.gif)

## Functionality & MVP

* Start functionality
* User will be able to to slide using "left shift" and jump using "w" or "spacebar". 
* Game will be able to keep a tally of the score and store the high score in local storage.
* Obstacles will be of random height and appear from the side closing in.

## Architecture and Technologies 

* Javascript (Majority of the project is rendered with JavaScript)
* Canvas
* Webpack

## Challenges

* While trying to complete my first game within a week time frame, I had trouble 
making a dog run across the canvas during the start screen. I managed to accomplish this by setting a loop using source x.

```
ctx.drawImage(dogImg, this.widthOfIndivSprite * srcX, this.sheetHeight * srcY, this.widthOfIndivSprite, this.sheetHeight, this.imgx, this.imgy,this.widthOfIndivSprite, this.sheetHeight)
            if (srcX < 9) srcX++;
            else srcX = 1;
            if (this.imgx < canvas.width + this.widthOfIndivSprite) this.imgx += imageSpeed;
            else this.imgx = 0 - this.widthOfIndivSprite
        }
```


## Bonus MVPS

* Boosting.
* Collecting treats.

