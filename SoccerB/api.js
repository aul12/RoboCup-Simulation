Angle = {
    DEGREE : 1,
    RADIAN : 0
};

function SoccerAPI(angle){

    this.robotn = 0;
    this.degree = angle;
    this.distance = {
        FRONT : 1,
        RIGHT : 2,
        BACK  : 3,
        LEFT  : 4
    };


    this.move = function(angle, speed) {

        if(this.degree)
            angle=angle/180*Math.PI;
        if(this.robotn>=2) {
            angle += Math.PI;
            angle *= -1;
        }

        angle += this.currentRotation();

        robot[this.robotn].acceleration.x = (Math.cos(angle)*speed + robot[this.robotn].acceleration.x*39)/40;
        robot[this.robotn].acceleration.y= (Math.sin(angle)*speed+ robot[this.robotn].acceleration.y*39)/40;

    };

    this.ballAngle = function() {
        var delta_x = ball.x-robot[this.robotn].x;
        var delta_y = ball.y-robot[this.robotn].y;
        var angle=Math.atan2(delta_y, delta_x);
        if(this.robotn>=2)
        {
            angle+=Math.PI;
            angle*=-1;
        }

        if(angle>Math.PI)
            angle-=2*Math.PI;
        else if(angle<-Math.PI)
            angle+=2*Math.PI;
        if(this.degree)
            angle=angle*180/Math.PI;
        return angle;
    };



    this.ballDistanceCM = function() {
        var delta_x = ball.x-robot[this.robotn].x;
        var delta_y = ball.y-robot[this.robotn].y;
        return (Math.sqrt(delta_x*delta_x+delta_y*delta_y)-ROBOT_SIZE-14)/4;
    };

    this.ballIntensity = function(){
        var ints = Math.log((this.ballDistanceCM()+10)/140) * -2000;
        if(ints<0)
            ints = 0;
        return ints;
    };

    this.lineAngle = function() {
        if ((robot[this.robotn].x - ROBOT_SIZE) <= LEFT)
            return this.robotn>=2?0:180;
        else if ((robot[this.robotn].x + ROBOT_SIZE) >= RIGHT)
            return this.robotn>=2?180:0;
        else if ((robot[this.robotn].y - ROBOT_SIZE) <= TOP)
            return 270;
        else if ((robot[this.robotn].y + ROBOT_SIZE) >= BOTTOM)
            return 90;

        return 0;
    };

    this.onLine = function(){
        if ((robot[this.robotn].x - ROBOT_SIZE) <= LEFT)																	//Linie
            return true;
        else if ((robot[this.robotn].x + ROBOT_SIZE) >= RIGHT)
            return true;
        else if ((robot[this.robotn].y - ROBOT_SIZE) <= TOP)
            return true;
        else if ((robot[this.robotn].y + ROBOT_SIZE) >= BOTTOM)
            return true;
        else
            return false;
    };

    this.setDribbler = function(power) {
        robotDribblerEnabled[this.robotn]=power;
    };

    this.shoot = function() {
        robotShoot[this.robotn]=true;
    };


    this.distance = function(direction) {
        if(this.robotn<=2)
        {
            switch(direction)
            {
                case 1:
                    return ctx.canvas.width-robot[this.robotn].x;
                case 2:
                    return ctx.canvas.height-robot[this.robotn].y;
                case 3:
                    return robot[this.robotn].x;
                case 4:
                    return robot[this.robotn].y;
            }
        }
        else
        {
            switch(direction)
            {
                case 1:
                    return robot[this.robotn].x;
                case 2:
                    return robot[this.robotn].y;
                case 3:
                    return ctx.canvas.width-robot[this.robotn].x;
                case 4:
                    return ctx.canvas.height-robot[this.robotn].y;
            }
        }
        return 0;
    };

    this.ballInDribbler = function() {
        if (this.ballDistanceCM() < 1){
            var diff = Math.abs(robot[this.robotn].rotation - this.ballAngle()) % 360;

            //Ball in the Front
            if(diff < 15)
                return true;
        }
        return false;
    };

    this.rotate = function(speed) {
        robot[this.robotn].rotationAcceleration = speed;
    };

    this.currentRotation = function() {
        var angle = robot[this.robotn].rotation % 360;
        if(angle > 180)
            angle -= 360;
        return this.degree==Angle.DEGREE?(angle):(angle/180*Math.PI);
    };

}