let snake;
let food;
let globalSize = 20;
let numCols, numRows;

function setup() {
    createCanvas(600,600);

    numCols = width / globalSize;
    numRows = height / globalSize;
    
    snake = new Snake(floor(numCols / 2), floor(numRows / 2), globalSize);
    food = new Food();
    frameRate(10);

}

function draw() {
    background(127);
    food.display();

    snake.update();
    snake.display();

    if (snake.wentOutOfBounds()) {
        youLose();
        return;
    }

    if (snake.died()) {
        youLose();
        return;
    }
    
    if (snake.ate(food)) {
        food.placeFood();
        snake.length += 5;

    }

    if (snake.length == numCols * numRows -1) {
        console.log("You win!");
        noLoop();
        return;
    }
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        snake.vel.x = 0;
        snake.vel.y = -1;
    } else if (keyCode == RIGHT_ARROW) {
        snake.vel.x = 1;
        snake.vel.y = 0;
    } else if (keyCode == DOWN_ARROW) {
        snake.vel.x = 0;
        snake.vel.y = 1;
    } else if (keyCode == LEFT_ARROW) {
        snake.vel.x = -1;
        snake.vel.y  = 0;
    }
}

function youLose() {
    console.log("You lost!");
    noLoop();
}

function Food() {
    this.x = floor(random(numCols));
    this.y = floor(random(numRows));

    this.display = function() {
        fill(255,0,255);
        rect(this.x*globalSize, this.y*globalSize, globalSize, globalSize);

    }

    this.placeFood = function() {
        this.x = floor(random(numCols));
        this.y = floor(random(numRows));

        while (get(this.x * globalSize - 1, this.y  * globalSize - 1) == 127) {
            this.x = floor(random(numCols));
            this.y = floor(random(numCols));
        }

    }
}
