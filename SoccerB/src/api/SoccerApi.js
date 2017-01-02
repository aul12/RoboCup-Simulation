Angle = {
    DEGREE : 1,
    RADIAN : 0
};


var Api = {
    robotn: 0,
    degree: Angle.DEGREE,
    distance: {
        FRONT : 1,
        RIGHT : 2,
        BACK  : 3,
        LEFT  : 4
    },

    //@TODO motorPower
    motorPower: function (motorID, power) {
        if(Math.abs(power)>1)
            power /= Math.abs(power);

        if(motorID >= robot[this.robotn].props.motors.length)
            return -1;
        else
            return robot[this.robotn].props.motors[motorID].status = power;
    },

    move: function(angle, speed) {
        if(this.degree)
            angle=angle/180*Math.PI;
        if(this.robotn>=2) {
            angle += Math.PI;
            angle *= -1;
        }

        angle += robot[this.robotn].phi /180 * Math.PI;

        if(speed > MAX_SPEED)
            speed = MAX_SPEED;
        else if(speed < -MAX_SPEED)
            speed = -MAX_SPEED;

        robot[this.robotn].a.x = Math.cos(angle)*speed;
        robot[this.robotn].a.y = Math.sin(angle)*speed;

        //@TODO find a realistic but useful solution
    },

    moveToXY: function(xPos, yPos) {
        var xDiff = this.realDistance(this.distance.RIGHT)- xPos;
        var yDiff = this.realDistance(this.distance.BACK) - yPos;

        if(Math.abs(xDiff) < 0.02 && Math.abs(yDiff) < 0.02){
            this.move(0, 0);
        }else{
            var angle = Math.atan2(xDiff, -yDiff)*180/Math.PI;

            var dist = Math.sqrt(xDiff*xDiff + yDiff*yDiff) / 0.40;

            if(dist>1)
                dist = 1;

            this.move(angle, MAX_SPEED*dist);
        }
    },

    ballAngle: function() {
        return this.ballAngleAbsolute() + this.currentRotation();
    },

    ballAngleAbsolute: function () {
        var deltaX = ball.x-robot[this.robotn].x;
        var deltaY = ball.y-robot[this.robotn].y;
        var angle = Math.atan2(deltaY, deltaX);
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
    },

    ballDistance: function() {
        var delta_x = (ball.x-robot[this.robotn].x)*100;
        var delta_y = (ball.y-robot[this.robotn].y)*100;

        var dist = (Math.sqrt(delta_x*delta_x+delta_y*delta_y))-robot[this.robotn].props.radius*100+ball.props.radius*2*100;

        if(dist < 1)
            dist = 1;
        return (dist/100)-robot[this.robotn].props.radius;
    },

    ballIntensity: function(){
        var intensity = Math.log(((this.ballDistance()*100)+10)/150) * -2000;
        if(intensity<0)
            intensity = 0;

        return intensity;
    },

    lineAngle: function() {
        if ((robot[this.robotn].x - robot[this.robotn].props.radius) <= LEFT)
            return this.robotn>=2?0:180;
        else if ((robot[this.robotn].x + robot[this.robotn].props.radius) >= RIGHT)
            return this.robotn>=2?180:0;
        else if ((robot[this.robotn].y - robot[this.robotn].props.radius) <= TOP)
            return 270;
        else if ((robot[this.robotn].y + robot[this.robotn].props.radius) >= BOTTOM)
            return 90;

        return 0;
    },

    onLine: function(){
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
    },

    setDribbler: function(power) {
        robotDribblerEnabled[this.robotn]=power;
    },

    shoot: function() {
        robotShoot[this.robotn]=true;
    },


    realDistance: function(direction){
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

        return dist;
    },

    distanceToWall: function(direction) {
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
    },

    ballInDribbler: function() {
        if (this.ballDistance() < 0){
            var diff = this.ballAngle() % 360;

            if(diff > 180)
                diff -= 360;

            //Ball in the Front
            if(diff < robot[this.robotn].props.capturingAngle)
                return true;
        }
        return false;
    },

    rotate: function(speed) {
        robot[this.robotn].alpha = -speed;
    },

    currentRotation: function() {
        var angle = robot[this.robotn].phi % 360;


        if(angle > 180)
            angle -= 360;


        return this.degree==Angle.DEGREE?(-angle):(-angle/180*Math.PI);
    },

    omega: function() {
        return -robot[this.robotn].omega;
    },

    goalAngle: function() {
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
};