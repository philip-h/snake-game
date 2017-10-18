class Snake {
    constructor(x, y, s) {
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.s = s;
        this.history = [];
        this.length = 1;
    }

    ate(food) {
        return dist(this.pos.x, this.pos.y, food.x, food.y) == 0;
    }

    update() {
        this.history.push(this.pos.copy());
        this.pos.add(this.vel);

        if (this.history.length > this.length - 1) {
            this.history.splice(0,1);
        }
    }

    wentOutOfBounds() {
        return this.pos.x*this.s < 0 || 
               this.pos.x*this.s > width - this.s || 
               this.pos.y*this.s < 0 || 
               this.pos.y*this.s > height - this.s;
    }

    died() {
        let hasDied = false;
        for (var i = 0; i < this.history.length; i++) {
            if (dist(this.pos.x, this.pos.y, this.history[i].x, this.history[i].y) == 0) {
                hasDied = true;
                break;
            }

        }
        return hasDied;
    }


    display() {
        fill(255);
        rect(this.pos.x*this.s, this.pos.y*this.s, this.s, this.s);

        for (var i = 0; i < this.history.length; i++) {
            rect(this.history[i].x*this.s, this.history[i].y*this.s, this.s, this.s);
            
        }
    }
}
