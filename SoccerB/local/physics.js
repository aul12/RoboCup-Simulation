/**
 * Created by paul on 11.03.15.
 */
//######################Physic-Engine#########################################
function physics()
{
    var delta_x, delta_y, alpha, not_robot_counter;
    var robotsTouching=false;
    var ballInDribbler = false;

    for(var robot_counter= 0; robot_counter<ROBOTS; robot_counter++)
    {
        //Rotate the robots
        robot[robot_counter].rotationVelocity += robot[robot_counter].rotationAcceleration;
        robot[robot_counter].rotationVelocity *= 0.8;
        robot[robot_counter].rotation += robot[robot_counter].rotationVelocity;

        //Move the robots
        //F=m*a ; v'=a ; s'=v
        robot[robot_counter].speed.x += robot[robot_counter].acceleration.x;
        robot[robot_counter].speed.y += robot[robot_counter].acceleration.y;
        robot[robot_counter].speed.x *= 0.4;
        robot[robot_counter].speed.y *= 0.4;
        robot[robot_counter].x += robot[robot_counter].speed.x;
        robot[robot_counter].y += robot[robot_counter].speed.y;

        //Check Maximum Speed
        if(robot[robot_counter].speed.abs() > 1)
        {
            robot[robot_counter].speed.x /= robot[robot_counter].speed.abs();
            robot[robot_counter].speed.y /= robot[robot_counter].speed.abs();
        }

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

        //Check if the robots are touching
        robotsTouching=false;

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
                    robotsTouching=true;
                    delta_x=ball.x-robot[robot_counter].x;
                    delta_y=ball.y-robot[robot_counter].y;
                    pushing[robot_counter] = Math.sqrt(delta_x * delta_x + delta_y * delta_y) < 14+ROBOT_SIZE;
                    delta_x=ball.x-robot[not_robot_counter].x;
                    delta_y=ball.y-robot[not_robot_counter].y;
                    pushing[not_robot_counter] = Math.sqrt(delta_x * delta_x + delta_y * delta_y) < 14+ROBOT_SIZE;
                    //continue;
                }
            }
        }



        //Check if the robot is touching the ball
        if(robot[robot_counter].isTouching(ball))
        {
            alpha = ball.angleTo(robot[robot_counter]);

            //Correct the Speed of the Ball
            ball.speed.x = ball.speed.x + Math.cos(alpha);
            ball.speed.y = ball.speed.y + Math.sin(alpha);

            api.robotn = robot_counter;
            var diff = Math.abs(robot[robot_counter].rotation - api.ballAngle()) % 360;

            //Ball in the Front
            if(diff < 15)
            {
                if(robot_shoot[robot_counter])
                {
                    ball.speed.x = ball.speed.x + robot[robot_counter].speed.x * SHOOT_POWER;
                    ball.speed.y = ball.speed.y + robot[robot_counter].speed.y * SHOOT_POWER;

                    robot_shoot[robot_counter]=false;
                }
                else if(robot_dribbler[robot_counter])
                {
                    ball.speed.x = ball.speed.x + (robot[robot_counter].x +30 - ball.x)*0.2;
                    ball.speed.y = ball.speed.y + (robot[robot_counter].y - ball.y)*0.2;
                }
            }
        }
    }

    //Ball Rolling
    ball.speed.x *= 0.98;
    ball.speed.y *= 0.98;
    ball.x+=ball.speed.x;
    ball.y+=ball.speed.y;


    if(ballInDribbler)
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

