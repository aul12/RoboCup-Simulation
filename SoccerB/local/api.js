/**
 * Created by paul on 11.03.15.
 */
function move_robot(angle, robot, speed, degree)
{
    if(degree)
        angle=angle/180*Math.PI;
    if(robot>2)
        angle+=Math.PI;
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
    angle=(angle+robot_driving_angle[robot]*19)/20;
    speed=(speed+robot_driving_speed[robot]*199)/200;
    if(Math.abs((robot_driving_angle[robot]+Math.PI)-(angle+Math.PI))>Math.PI*0.5)
    {
        robot_x_vect[robot]=SPEED_SLOW;
        robot_y_vect[robot]=SPEED_SLOW;
    }
    else
    {
        robot_x_vect[robot]*=ACCELERATION;
        robot_y_vect[robot]*=ACCELERATION;
        if(robot_x_vect[robot]>1)
            robot_x_vect[robot]=1;
        if(robot_y_vect[robot]>1)
            robot_y_vect[robot]=1;
    }
    delta_x*=robot_x_vect[robot];
    delta_y*=robot_y_vect[robot];
    robot_x[robot]+=delta_x;
    robot_y[robot]+=delta_y;
    robot_driving_speed[robot]=speed;
    robot_driving_angle[robot]=angle;
}

function robot_ball_angle(robot, degree)
{
    var delta_x = ball_x-robot_x[robot];
    var delta_y = ball_y-robot_y[robot];
    var angle=Math.atan(delta_y/delta_x);
    if(robot>=3)
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

function robot_ball_distance(robot)
{
    var delta_x = ball_x-robot_x[robot];
    var delta_y = ball_y-robot_y[robot];
    return (Math.sqrt(delta_x*delta_x+delta_y*delta_y)-ROBOT_SIZE-14)/4;
}

function robot_line(robot)
{
    if(robot_y[robot]>BOTTOM-20&&robot_y[robot]<BOTTOM+20)
        return 90;
    else if(robot_y[robot]>TOP-20&&robot_y[robot]<TOP+20)
        return 270;
    else if(robot_x[robot]>LEFT-20&&robot_x[robot]<LEFT+20)
        return 180;
    else if (robot_x[robot]>RIGHT-20&&robot_x[robot]<RIGHT+20)
        return 0;
    else
        return -1;
}

function enable_dribbler(robot, power)
{
    robot_dribbler[robot]=power;
}

function shoot(robot)
{
    robot_shoot[robot]=true;
}

Distance = {
    FRONT : 1,
    RIGHT : 2,
    BACK  : 3,
    LEFT  : 4
};

function robot_distance(robot, direction)
{
    if(robot<=2)
    {
        switch(direction)
        {
            case 1:
                return ctx.canvas.width-robot_x[robot];
            case 2:
                return ctx.canvas.height-robot_y[robot];
            case 3:
                return robot_x[robot];
            case 4:
                return robot_y[robot];
        }
    }
    else
    {
        switch(direction)
        {
            case 1:
                return robot_x[robot];
            case 2:
                return robot_y[robot];
            case 3:
                return ctx.canvas.width-robot_x[robot];
            case 4:
                return ctx.canvas.height-robot_y[robot];
        }
    }
    return 0;
}