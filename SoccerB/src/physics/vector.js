function Vector(x,y){
    this.x = x;
    this.y = y;

    this.abs = function(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    };

    this.multiply = function (factor) {
        this.x *= factor;
        this.y *= factor;
    }
}
