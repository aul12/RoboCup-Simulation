function GameObject(x,y) {
    this.x = x;
    this.y = y;

    this.v = new Vector(0,0);
    this.a = new Vector(0,0);

    this.phi = 0;
    this.omega = 0;
    this.alpha = 0;

    this.props = null;

    this.distanceTo = function(object){
        var delta_x = this.x-object.x;
        var delta_y = this.y-object.y;
        delta_x*=delta_x;
        delta_y*=delta_y;
        return Math.sqrt(delta_x + delta_y);
    };

    this.isTouching = function(object){
        return this.distanceTo(object) < (this.props.radius + object.props.radius);
    };

    this.angleTo = function(object){
        var delta_x=this.x-object.x;
        var delta_y=this.y-object.y;
        return Math.atan2(delta_y, delta_x);
    };

    this.moveOutOf = function(object){

        var alpha = object.angleTo(this);
        var delta = object.distanceTo(this) - (object.props.radius- this.props.radius);
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