/**
 * Created by paul on 11.03.15.
 */
//######################Physic-Engine#########################################
function physics()
{
    var delta_x, delta_y, alpha, not_robot_counter, einfall;
    var touch_robot=false;
    var pushing= new Array(ROBOTS);
    for(var robot_counter= 0; robot_counter<ROBOTS; robot_counter++)
    {
        //Check if the robots are standing in the goal
        if(robot[robot_counter].y>(ctx.canvas.height/2)-(GOAL_WIDTH/2)&&robot[robot_counter].y<(ctx.canvas.height/2)+(GOAL_WIDTH/2)&&robot[robot_counter].x<LEFT+40)
        {
            robot[robot_counter].x = LEFT + ROBOT_SIZE;
            continue;
        }
        else if(robot[robot_counter]>(ctx.canvas.height/2).y-(GOAL_WIDTH/2)&&robot[robot_counter].y<(ctx.canvas.height/2)+(GOAL_WIDTH/2)&&robot[robot_counter].x>RIGHT-40)
        {
            robot[robot_counter].x = RIGHT - ROBOT_SIZE;
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
                    robot_x_vect[robot_counter]=SPEED_SLOW;
                    robot_y_vect[robot_counter]=SPEED_SLOW;
                    robot_x_vect[not_robot_counter]=SPEED_SLOW;
                    robot_y_vect[not_robot_counter]=SPEED_SLOW;
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

            if(ball_speed_x!=0&&ball_speed_y!=0)
            {
                einfall=Math.atan(ball_speed_y/ball_speed_x);
                if((ball_speed_x<0))
                    einfall-=Math.PI;
                if(einfall>2*Math.PI)
                    einfall-=2*Math.PI;
                if(einfall<0)
                    einfall+=2*Math.PI;
            }
            else
                einfall=alpha;
            einfall=alpha-einfall;
            if(alpha>2*Math.PI)
                alpha-=2*Math.PI;
            if(alpha<0)
                alpha+=2*Math.PI;

            //Dribbler/Shoot
            var factor=1;
            ball.x=robot[robot_counter].x+Math.cos(alpha)*54;
            ball.y=robot[robot_counter].y+Math.sin(alpha)*54;
            if(robot_ball_angle(robot_counter,true)>345||robot_ball_angle(robot_counter,true)<15)
            {
                if(robot_dribbler[robot_counter])
                {
                    factor=0.5;
                    ball.x=(99*(robot[robot_counter].x+Math.cos(alpha)*(ROBOT_SIZE+5))+(robot[robot_counter].x+(ROBOT_SIZE+5)))/100;
                    ball.y=robot[robot_counter].y+Math.sin(alpha)*ROBOT_SIZE;
                }
                if(robot_shoot[robot_counter])
                    factor+=SHOOT_POWER;
            }
            robot_shoot[robot_counter]=false;
            ball_speed_x=Math.cos(alpha)*SPEED*factor*robot_x_vect[robot_counter];
            ball_speed_y=Math.sin(alpha)*SPEED*factor*robot_y_vect[robot_counter];
            continue;
        }
    }

    //Ball Rolling

    ball.x+=ball_speed_x;
    ball.y+=ball_speed_y;
    ball_speed_x*=0.98;
    ball_speed_y*=0.98;

    //Ball reflection
    if((ball.x-14)<0)
    {
        ball.x=14;
        ball_speed_x*=-0.7;
    }
    else if((ball.x+14)>ctx.canvas.width)
    {
        ball.x=ctx.canvas.width-14;
        ball_speed_x*=-0.7;
    }
    if((ball.y-14)<0)
    {
        ball_speed_y*=-0.7;
        ball.y=14;
    }
    else if((ball.y+14)>ctx.canvas.height)
    {
        ball_speed_y*=-0.7;
        ball.y=ctx.canvas.height-14;
    }

}

