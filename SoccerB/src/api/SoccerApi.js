Angle = {
    DEGREE : 1,
    RADIAN : 0
};

Accuracy = {
    PERFECT : 0,
    PRECISE : 1,
    MEDIUM  : 2,
    LOW     : 3,
    REALISTIC : 4
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


    this.accuracy = Accuracy.PERFECT;

    this.motorPower = function (motorID, power) {
        if(Math.abs(power)>1)
            power /= Math.abs(power);

        if(motorID >= robot[this.robotn].props.motors.length)
            return -1;
        else
            return robot[this.robotn].props.motors[motorID].status = power;
    };

    //@Deprecated
    this.move = function(angle, speed) {
        if(this.degree)
            angle=angle/180*Math.PI;
        if(this.robotn>=2) {
            angle += Math.PI;
            angle *= -1;
        }

        angle += robot[this.robotn].phi /180 * Math.PI;

        if(speed > SPEED)
            speed = SPEED;
        else if(speed < -SPEED)
            speed = -SPEED;

        robot[this.robotn].a.x = Math.cos(angle)*speed;
        robot[this.robotn].a.y = Math.sin(angle)*speed;

        //@TODO fix Physics

    };

    this.moveToXY = function(xPos, yPos) {
        var xdiff = this.realDistance(this.distance.RIGHT)- xPos;
        var ydiff = this.realDistance(this.distance.BACK) - yPos;

        if(Math.abs(xdiff) < 0.02 && Math.abs(ydiff) < 0.02){
            this.move(0, 0);
        }else{
            var angle = Math.atan2(xdiff, -ydiff)*180/Math.PI;

            var dist = Math.sqrt(xdiff*xdiff + ydiff*ydiff) / 0.40;

            if(dist>1)
                dist = 1;

            this.move(angle, SPEED*dist);
        }
    };

    this.ballAngle = function() {
        return this.ballAngleAbsolute() + this.currentRotation();
    };

    this.ballAngleAbsolute = function () {
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



    this.ballDistance = function() {
        var delta_x = (ball.x-robot[this.robotn].x)*100;
        var delta_y = (ball.y-robot[this.robotn].y)*100;

        var dist = (Math.sqrt(delta_x*delta_x+delta_y*delta_y))-robot[this.robotn].props.radius*100+ball.props.radius*2*100;

        if(dist < 1)
            dist = 1;
        return (dist/100)-robot[this.robotn].props.radius;
    };

    this.ballIntensity = function(){
        var ints = Math.log(((this.ballDistance()*100)+10)/150) * -2000;
        if(ints<0)
            ints = 0;

        return ints;
    };

    this.lineAngle = function() {
        if ((robot[this.robotn].x - robot[this.robotn].props.radius) <= LEFT)
            return this.robotn>=2?0:180;
        else if ((robot[this.robotn].x + robot[this.robotn].props.radius) >= RIGHT)
            return this.robotn>=2?180:0;
        else if ((robot[this.robotn].y - robot[this.robotn].props.radius) <= TOP)
            return 270;
        else if ((robot[this.robotn].y + robot[this.robotn].props.radius) >= BOTTOM)
            return 90;

        return 0;
    };

    this.onLine = function(){
        if ((robot[this.robotn].x - robot[this.robotn].props.radius) <= LEFT)
            return true;
        else if ((robot[this.robotn].x + robot[this.robotn].props.radius) >= RIGHT)
            return true;
        else if ((robot[this.robotn].y - robot[this.robotn].props.radius) <= TOP)
            return true;
        else if ((robot[this.robotn].y + robot[this.robotn].props.radius) >= BOTTOM)
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


    this.realDistance = function(direction){
        var dist = this.distanceToWall(direction);

        switch(direction)
        {
            case this.distance.FRONT:
            case this.distance.BACK:
                if(this.distanceToWall(this.distance.LEFT) > 0.30 && this.distanceToWall(this.distance.RIGHT) > 0.30)
                    dist -= 0.05;
                break;
            case this.distance.RIGHT:
                if(this.distanceToWall(this.distance.BACK) < 0.50 || this.distanceToWall(this.distance.FRONT) < 0.50){
                    if(this.distanceToWall(this.distance.RIGHT) > 0.80)
                        dist -= 0.60;
                }
                break;
            case this.distance.LEFT:
                if(this.distanceToWall(this.distance.BACK) < 0.50 || this.distanceToWall(this.distance.FRONT) < 0.50){
                    if(this.distanceToWall(this.distance.LEFT) > 0.80)
                        dist -= 0.60;
                }
                break;
        }

        return dist; //+ Math.random() * 0.8 - 0.4; @TODO Fix noise generation
    };

    this.distanceToWall = function(direction) {
        if(this.robotn<2)
        {
            switch(direction)
            {
                case this.distance.FRONT:
                    return WIDTH-robot[this.robotn].x;
                case this.distance.RIGHT:
                    return HEIGHT-robot[this.robotn].y;
                case this.distance.BACK:
                    return robot[this.robotn].x;
                case this.distance.LEFT:
                    return robot[this.robotn].y;
            }
        }
        else
        {
            switch(direction)
            {
                case this.distance.FRONT:
                    return robot[this.robotn].x;
                case this.distance.LEFT:
                    return robot[this.robotn].y;
                case this.distance.BACK:
                    return WIDTH-robot[this.robotn].x;
                case this.distance.RIGHT:
                    return HEIGHT-robot[this.robotn].y;
            }
        }
        return 0;
    };

    this.ballInDribbler = function() {
        if (this.ballDistance() < 0){
            var diff = this.ballAngle() % 360;

            if(diff > 180)
                diff -= 360;

            //Ball in the Front
            if(diff < robot[this.robotn].props.capturingAngle)
                return true;
        }
        return false;
    };

    this.rotate = function(speed) {
        robot[this.robotn].alpha = -speed;
    };

    this.currentRotation = function() {
        var angle = robot[this.robotn].phi % 360;


        if(angle > 180)
            angle -= 360;


        return this.degree==Angle.DEGREE?(-angle):(-angle/180*Math.PI);
    };

    this.omega = function() {
        return -robot[this.robotn].omega;
    };

    this.goalAngle = function() {
        var goal = new Vector();

        goal.y = HEIGHT/2;

        if(this.robotn >= 2){
            goal.x = LEFT;
        }else{
            goal.x = RIGHT;
        }

        var delta_x = goal.x-robot[this.robotn].x;
        var delta_y = goal.y-robot[this.robotn].y;
        var angle=Math.atan2(delta_y, delta_x);

        if(this.robotn>=2)
        {
            angle+=Math.PI;
            angle*=-1;
        }


        return this.degree==Angle.DEGREE?(-angle*180/Math.PI):(-angle);
    }

}