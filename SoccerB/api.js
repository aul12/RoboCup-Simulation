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

        if(speed > SPEED)
            speed = SPEED;
        else if(speed < -SPEED)
            speed = -SPEED;

        robot[this.robotn].acceleration.x = (Math.cos(angle)*speed + robot[this.robotn].acceleration.x*39)/40;
        robot[this.robotn].acceleration.y= (Math.sin(angle)*speed+ robot[this.robotn].acceleration.y*39)/40;

    };

    this.moveToXY = function(xPos, yPos) {
        var xdiff = this.realDistance(this.distance.RIGHT)- xPos;
        var ydiff = yPos - this.realDistance(this.distance.BACK);

        if(Math.abs(xdiff) < 2 && Math.abs(ydiff) < 2){
            this.move(0, 0);
        }else{
            var angle = Math.atan2(xdiff, ydiff)*180/Math.PI;

            var dist = Math.sqrt(xdiff*xdiff + ydiff*ydiff) / 40;

            if(dist>1)
                dist = 1;

            this.move(angle, SPEED*dist);
        }
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

        var dist = Math.sqrt(delta_x*delta_x+delta_y*delta_y)-ROBOT_SIZE;

        if(dist < 1)
            dist = 1;
        return dist-ROBOT_SIZE;
    };

    this.ballIntensity = function(){
        var ints = Math.log((this.ballDistanceCM()+10)/150) * -2000;
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
        if ((robot[this.robotn].x - ROBOT_SIZE) <= LEFT)
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


    this.realDistance = function(direction){
        var dist = this.distanceToWall(direction);

        switch(direction)
        {
            case this.distance.FRONT:
            case this.distance.BACK:
                if(this.distanceToWall(this.distance.LEFT) > 30 && this.distanceToWall(this.distance.RIGHT) > 30)
                    dist -= 5;
                break;
            case this.distance.RIGHT:
                if(this.distanceToWall(this.distance.BACK) < 50 || this.distanceToWall(this.distance.FRONT) < 50){
                    if(this.distanceToWall(this.distance.RIGHT) > 80)
                        dist -= 60;
                }
                break;
            case this.distance.LEFT:
                if(this.distanceToWall(this.distance.BACK) < 50 || this.distanceToWall(this.distance.FRONT) < 50){
                    if(this.distanceToWall(this.distance.LEFT) > 80)
                        dist -= 60;
                }
                break;
        }

        return dist + Math.random() * 8 - 4;
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