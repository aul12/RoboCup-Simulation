/**
 * Created by paul on 11.03.15.
 */
function move_robot(angle, robotn, speed, degree)
{

    if(degree)
        angle=angle/180*Math.PI;
    if(robotn>=2) {
        angle += Math.PI;
        angle *= -1;
    }
    if(angle>2*Math.PI)
        angle-=2*Math.PI;
    if(angle<0)
        angle+=2*Math.PI;
    var delta_x= Math.cos(angle)*speed;
    var delta_y= Math.sin(angle)*speed;
    if(angle>Math.PI)
    {
        angle-=2*Math.PI;
    }

    angle=(angle+robot_driving_angle[robotn]*19)/20;
    speed=(speed+robot_driving_speed[robotn]*199)/200;
    if(Math.abs((robot_driving_angle[robotn]+Math.PI)-(angle+Math.PI))>Math.PI*0.5)
    {
        robot[robotn].speed.x=SPEED_SLOW;
        robot[robotn].speed.y=SPEED_SLOW;
    }
    else
    {
        robot[robotn].speed.x*=ACCELERATION;
        robot[robotn].speed.y*=ACCELERATION;
        if(robot[robotn].speed.x>1)
            robot[robotn].speed.x=1;
        if(robot[robotn].speed.y>1)
            robot[robotn].speed.y=1;
    }
    delta_x*=robot[robotn].speed.x;
    delta_y*=robot[robotn].speed.y;
    robot[robotn].x+=delta_x;
    robot[robotn].y+=delta_y;

    robot_driving_speed[robotn]=speed;
    robot_driving_angle[robotn]=angle;

}

function robot_ball_angle(robotn, degree)
{
    var delta_x = ball.x-robot[robotn].x;
    var delta_y = ball.y-robot[robotn].y;
    var angle=Math.atan(delta_y/delta_x);
    if(robotn>=2)
    {
        angle+=Math.PI;
        angle*=-1;
    }
    if((delta_x<0))
        angle-=Math.PI;
    if(angle>2*Math.PI)
        angle-=2*Math.PI;
    if(angle<0)
        angle+=2*Math.PI;
    if(degree)
        angle=angle*180/Math.PI;
    return angle;
}

function robot_ball_distance(robotn)
{
    var delta_x = ball.x-robot[robotn].x;
    var delta_y = ball.y-robot[robotn].y;
    return (Math.sqrt(delta_x*delta_x+delta_y*delta_y)-ROBOT_SIZE-14)/4;
}

function robot_line(robotn)
{
    if ((robot[robotn].x - ROBOT_SIZE) <= LEFT)																	//Linie
        return 180;
    else if ((robot[robotn].x + ROBOT_SIZE) >= RIGHT)
        return 0;
    else if ((robot[robotn].y - ROBOT_SIZE) <= TOP)
        return 270;
    else if ((robot[robotn].y + ROBOT_SIZE) >= BOTTOM)
        return 90;
    else
        return -1;
}

function enable_dribbler(robotn, power)
{
    robot_dribbler[robotn]=power;
}

function shoot(robotn)
{
    robot_shoot[robotn]=true;
}

Distance = {
    FRONT : 1,
    RIGHT : 2,
    BACK  : 3,
    LEFT  : 4
};

function robot_distance(robotn, direction)
{
    if(robotn<=2)
    {
        switch(direction)
        {
            case 1:
                return ctx.canvas.width-robot[robotn].x;
            case 2:
                return ctx.canvas.height-robot[robotn].y;
            case 3:
                return robot[robotn].x;
            case 4:
                return robot[robotn].y;
        }
    }
    else
    {
        switch(direction)
        {
            case 1:
                return robot[robotn].x;
            case 2:
                return robot[robotn].y;
            case 3:
                return ctx.canvas.width-robot[robotn].x;
            case 4:
                return ctx.canvas.height-robot[robotn].y;
        }
    }
    return 0;
}

function robot_ball_in_dribbler(robotn) {
    var delta_x = ball.x - robot[robotn].x;
    var delta_y = ball.y - robot[robotn].y;


    if (Math.sqrt(delta_x * delta_x + delta_y * delta_y) < ROBOT_SIZE + 14){
        if(robot_ball_angle(robotn,true)>345||robot_ball_angle(robotn,true)<15)
            return true;
    }
    return false;
}