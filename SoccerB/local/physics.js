/**
 * Created by paul on 11.03.15.
 */
//######################Physic-Engine#########################################
function physics()
{
    var delta_x, delta_y, alpha, not_robot_counter, einfall;
    var touch_robot=false;
    var ballinDribbler = false;

    for(var robot_counter= 0; robot_counter<ROBOTS; robot_counter++)
    {
        //Move the robots
        //F=m*a ; v'=a ; s'=v
        robot[robot_counter].speed.x += robot[robot_counter].acceleration.x;
        robot[robot_counter].speed.y += robot[robot_counter].acceleration.y;
        robot[robot_counter].speed.x *= 0.6;
        robot[robot_counter].speed.y *= 0.6;
        robot[robot_counter].x += robot[robot_counter].speed.x;
        robot[robot_counter].y += robot[robot_counter].speed.y;

        if(robot[robot_counter].speed.x>1)
            robot[robot_counter].speed.x=1;
        else if(robot[robot_counter].speed.x<-1)
            robot[robot_counter].speed.x=-1;
        if(robot[robot_counter].speed.y>1)
            robot[robot_counter].speed.y=1;
        else if(robot[robot_counter].speed.y<-1)
            robot[robot_counter].speed.y=-1;
        //Check if the robots are standing in the goal
        if(robot[robot_counter].y>(ctx.canvas.height/2)-(GOAL_WIDTH/2)&&robot[robot_counter].y<(ctx.canvas.height/2)+(GOAL_WIDTH/2)&&robot[robot_counter].x<LEFT+40)
        {
            robot[robot_counter].x = LEFT + ROBOT_SIZE;
            robot[robot_counter].speed.x = 0;
            robot[robot_counter].speed.y = 0;
            robot[robot_counter].acceleration.x = 0;
            robot[robot_counter].acceleration.y = 0;
            continue;
        }
        else if(robot[robot_counter]>(ctx.canvas.height/2).y-(GOAL_WIDTH/2)&&robot[robot_counter].y<(ctx.canvas.height/2)+(GOAL_WIDTH/2)&&robot[robot_counter].x>RIGHT-40)
        {
            robot[robot_counter].x = RIGHT - ROBOT_SIZE;
            robot[robot_counter].speed.x = 0;
            robot[robot_counter].speed.y = 0;
            robot[robot_counter].acceleration.x = 0;
            robot[robot_counter].acceleration.y = 0;
            continue;
        }
        touch_robot=false;

        //Check if the robots are touching
        for(not_robot_counter=0; not_robot_counter<ROBOTS ; not_robot_counter++)
        {
            if(robot_counter!=not_robot_counter)
            {
                if(robot[robot_counter].isTouching(robot[not_robot_counter]))
                {
                    alpha = robot[not_robot_counter].angleTo(robot[robot_counter]);

                    robot[not_robot_counter].x=robot[robot_counter].x+Math.cos(alpha)*ROBOT_SIZE*2;
                    robot[not_robot_counter].y=robot[robot_counter].y+Math.sin(alpha)*ROBOT_SIZE*2;
                    var speed = new Vector(0,0);
                    //Inelastic collision
                    speed.x = (robot[robot_counter].speed.x + robot[not_robot_counter].speed.x)/2;
                    speed.y = (robot[robot_counter].speed.y + robot[not_robot_counter].speed.y)/2;
                    robot[robot_counter].speed.x=speed.x;
                    robot[robot_counter].speed.y=speed.y;
                    robot[not_robot_counter].speed.x=speed.x;
                    robot[not_robot_counter].speed.y=speed.y;
                    robot[robot_counter].acceleration.x = 0;
                    robot[robot_counter].acceleration.y = 0;
                    robot[not_robot_counter].acceleration.x = 0;
                    robot[not_robot_counter].acceleration.y = 0;
                    touch_robot=true;
                    delta_x=ball.x-robot[robot_counter].x;
                    delta_y=ball.y-robot[robot_counter].y;
                    pushing[robot_counter] = Math.sqrt(delta_x * delta_x + delta_y * delta_y) < 14+ROBOT_SIZE;
                    delta_x=ball.x-robot[not_robot_counter].x;
                    delta_y=ball.y-robot[not_robot_counter].y;
                    pushing[not_robot_counter] = Math.sqrt(delta_x * delta_x + delta_y * delta_y) < 14+ROBOT_SIZE;
                    continue;
                }
            }
        }

        //Check if the robot is touching the ball
        if(robot[robot_counter].isTouching(ball))
        {
            alpha = ball.angleTo(robot[robot_counter]);
            ball.moveOutOf(robot[robot_counter]);

            //Dribbler/Shoot
            var factor=1;


            api.robotn = robot_counter;
            if(api.ballAngle()>345||api.ballAngle(true)<15)
            {
                if(robot_dribbler[robot_counter])
                {
                    factor=0.5;
                    ball.x=(99*(robot[robot_counter].x+Math.cos(alpha)*(ROBOT_SIZE+5))+(robot[robot_counter].x+(ROBOT_SIZE+5)))/100;
                    ball.y=robot[robot_counter].y+Math.sin(alpha)*ROBOT_SIZE;
                    ballinDribbler = true;
                }
                if(robot_shoot[robot_counter])
                    factor+=SHOOT_POWER;
            }

            robot_shoot[robot_counter]=false;
            ball.speed.x=Math.cos(alpha)*SPEED*factor*robot[robot_counter].speed.x;
            ball.speed.y=Math.sin(alpha)*SPEED*factor*robot[robot_counter].speed.y;
            continue;
        }
    }

    //Ball Rolling
    ball.speed.x *= 0.98;
    ball.speed.y *= 0.98;
    ball.x+=ball.speed.x;
    ball.y+=ball.speed.y;


    if(ballinDribbler)
        ball.rotation += 14;
    else
        ball.rotation = (ball.x + ball.y)*Math.PI;

    //Ball reflection
    if((ball.x-14)<0)
    {
        ball.x=14;
        ball.speed.x*=-0.7;
    }
    else if((ball.x+14)>ctx.canvas.width)
    {
        ball.x=ctx.canvas.width-14;
        ball.speed.x*=-0.7;
    }
    if((ball.y-14)<0)
    {
        ball.speed.y*=-0.7;
        ball.y=14;
    }
    else if((ball.y+14)>ctx.canvas.height)
    {
        ball.speed.y*=-0.7;
        ball.y=ctx.canvas.height-14;
    }

}

