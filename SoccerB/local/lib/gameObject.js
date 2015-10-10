function gameObject(x,y,radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = new Speed();

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
        if((delta_x<0))
            alpha-=Math.PI;
        if(alpha>2*Math.PI)
            alpha-=2*Math.PI;
        if(alpha<0)
            alpha+=2*Math.PI;

        return alpha;
    }
}

function Speed(){
    this.x = 0;
    this.y = 0;
}
