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

        robot[this.robotn].acceleration.x = (Math.cos(angle)*speed + robot[this.robotn].acceleration.x*49)/50;
        robot[this.robotn].acceleration.y= (Math.sin(angle)*speed+ robot[this.robotn].acceleration.y*49)/50;



        /*if(angle>Math.PI)
        {
            angle-=2*Math.PI;
        }
        ;


        angle=(angle+robot_driving_angle[this.robotn]*29)/30;
        speed=(speed+robot_driving_speed[this.robotn]*299)/300;


        robot[this.robotn].speed.x*=ACCELERATION;
        robot[this.robotn].speed.y*=ACCELERATION;
        if(robot[this.robotn].speed.x>1)
            robot[this.robotn].speed.x=1;
        if(robot[this.robotn].speed.y>1)
            robot[this.robotn].speed.y=1;
        delta_x*=robot[this.robotn].speed.x;
        delta_y*=robot[this.robotn].speed.y;
        robot[this.robotn].x+=delta_x;
        robot[this.robotn].y+=delta_y;

        robot_driving_speed[this.robotn]=speed;
        robot_driving_angle[this.robotn]=angle;*/

    };

    this.ballAngle = function() {
        var delta_x = ball.x-robot[this.robotn].x;
        var delta_y = ball.y-robot[this.robotn].y;
        var angle=Math.atan(delta_y/delta_x);
        if(this.robotn>=2)
        {
            angle+=Math.PI;
            angle*=-1;
        }
        if((delta_x<0))
            angle-=Math.PI;
        if(angle>Math.PI)
            angle-=2*Math.PI;
        if(this.degree)
            angle=angle*180/Math.PI;
        return angle;
    };

    this.ballDistance = function() {
        var delta_x = ball.x-robot[this.robotn].x;
        var delta_y = ball.y-robot[this.robotn].y;
        return (Math.sqrt(delta_x*delta_x+delta_y*delta_y)-ROBOT_SIZE-14)/4;
    };

    this.robot_line = function() {
        if ((robot[this.robotn].x - ROBOT_SIZE) <= LEFT)																	//Linie
            return this.robotn>=2?0:180;
        else if ((robot[this.robotn].x + ROBOT_SIZE) >= RIGHT)
            return this.robotn>=2?180:0;
        else if ((robot[this.robotn].y - ROBOT_SIZE) <= TOP)
            return 270;
        else if ((robot[this.robotn].y + ROBOT_SIZE) >= BOTTOM)
            return 90;
        else
            return -1;
    };

    this.setDribbler = function(power) {
        robot_dribbler[this.robotn]=power;
    };

    this.shoot = function() {
        robot_shoot[this.robotn]=true;
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
        var delta_x = ball.x - robot[this.robotn].x;
        var delta_y = ball.y - robot[this.robotn].y;


        if (Math.sqrt(delta_x * delta_x + delta_y * delta_y) < ROBOT_SIZE + 14){
            if(this.ballAngle()>345||this.ballAngle()<15)
                return true;
        }
        return false;
    };

}