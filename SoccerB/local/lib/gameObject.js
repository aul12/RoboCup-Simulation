function gameObject(x,y,radius) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.radius = radius;
    this.speed = new Vector(0,0);
    this.acceleration = new Vector(0,0);

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

        this.x += Math.sin(alpha)*delta;
        this.y += Math.cos(alpha)*delta;

    }
}

function Vector(x,y){
    this.x = x;
    this.y = y;
}
