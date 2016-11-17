function GameObject(x,y,radius) {
    this.x = x;
    this.y = y;

    this.speed = new Vector(0,0);
    this.acceleration = new Vector(0,0);

    this.rotation = 0;
    this.rotationVelocity = 0;
    this.rotationAcceleration = 0;

    this.radius = radius;


    this.distanceTo = function(object){
        var delta_x = this.x-object.x;
        var delta_y = this.y-object.y;
        delta_x*=delta_x;
        delta_y*=delta_y;
        return Math.sqrt(delta_x + delta_y);
    };

    this.isTouching = function(object){
        return this.distanceTo(object) < (this.radius + object.radius);
    };

    this.angleTo = function(object){
        var delta_x=this.x-object.x;
        var delta_y=this.y-object.y;
        var alpha=Math.atan(delta_y/delta_x);
        if(delta_x<0)
            alpha-=Math.PI;
        if(alpha>=2*Math.PI)
            alpha-=2*Math.PI;

        return alpha;
    };

    this.moveOutOf = function(object){

        var alpha = object.angleTo(this);
        var delta = object.distanceTo(this) - (object.radius- this.radius);
        if(delta<=0)
            return;
        this.x -= Math.cos(alpha)*delta;
        this.y -= Math.sin(alpha)*delta;
    };

    this.isInArea = function(x, y, width, height){
        if(this.x > x && this.y > y){
            if(this.x < width+x && this.y<height+y)
                return true;
        }
        return false;
    };
}

function Vector(x,y){
    this.x = x;
    this.y = y;

    this.abs = function(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
}
