//######################Physic-Engine#########################################
function physics()
{
    var delta_x, delta_y, alpha, second_robot_counter;
    var robotsTouching=false;
    var ballInDribbler = false;

    for(var robot_counter= 0; robot_counter<4; robot_counter++)
    {
        if (ROBOT_ENABLE[robot_counter])
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
            if (robot[robot_counter].speed.abs() > 1) {
                robot[robot_counter].speed.x /= robot[robot_counter].speed.abs();
                robot[robot_counter].speed.y /= robot[robot_counter].speed.abs();
            }

            //Check if the robots are standing in the goal
            if ((robot[robot_counter].y + ROBOT_SIZE) > GOAL_TOP && (robot[robot_counter].y - ROBOT_SIZE) < GOAL_BOTTOM) {
                if (robot[robot_counter].x - ROBOT_SIZE < LEFT) {
                    robot[robot_counter].x = LEFT + ROBOT_SIZE;
                    robot[robot_counter].speed.x = 0;
                    robot[robot_counter].acceleration.x = 0;
                }
                else if (robot[robot_counter].x + ROBOT_SIZE > RIGHT) {
                    robot[robot_counter].x = RIGHT - ROBOT_SIZE;
                    robot[robot_counter].speed.x = 0;
                    robot[robot_counter].acceleration.x = 0;
                }
            }


            //Check if the robots are touching
            robotsTouching = false;

            for (second_robot_counter = robot_counter; second_robot_counter < 4; second_robot_counter++) {
                if (robot_counter != second_robot_counter && ROBOT_ENABLE[second_robot_counter]) {
                    if (robot[robot_counter].isTouching(robot[second_robot_counter])) {
                        alpha = robot[second_robot_counter].angleTo(robot[robot_counter]);

                        robot[second_robot_counter].x = robot[robot_counter].x + Math.cos(alpha) * ROBOT_SIZE * 2;
                        robot[second_robot_counter].y = robot[robot_counter].y + Math.sin(alpha) * ROBOT_SIZE * 2;
                        var speed = new Vector(0, 0);

                        //Inelastic collision
                        robot[robot_counter].speed.y *= 0.5;
                        robot[second_robot_counter].speed.x *= 0.5;
                        robot[second_robot_counter].speed.y *= 0.5;
                        robotsTouching = true;
                        delta_x = ball.x - robot[robot_counter].x;
                        delta_y = ball.y - robot[robot_counter].y;
                        pushing[robot_counter] = Math.sqrt(delta_x * delta_x + delta_y * delta_y) < 14 + ROBOT_SIZE;
                        delta_x = ball.x - robot[second_robot_counter].x;
                        delta_y = ball.y - robot[second_robot_counter].y;
                        pushing[second_robot_counter] = Math.sqrt(delta_x * delta_x + delta_y * delta_y) < 14 + ROBOT_SIZE;
                    }
                }
            }

            //Check if the robot is touching the ball
            if (robot[robot_counter].isTouching(ball)) {
                alpha = ball.angleTo(robot[robot_counter]);

                //Correct the Speed of the Ball
                ball.speed.x += Math.cos(alpha) * robot[robot_counter].speed.abs();
                ball.speed.y += Math.sin(alpha) * robot[robot_counter].speed.abs();

                //Calculate the angle of the ball to the robot
                api.robotn = robot_counter;
                var diff = Math.abs(robot[robot_counter].rotation - api.ballAngle()) % 360;

                //Ball in the Front
                if (diff < 15) {
                    if (robotShoot[robot_counter]) {
                        ball.speed.x += robot[robot_counter].speed.x * SHOOT_POWER;
                        ball.speed.y += robot[robot_counter].speed.y * SHOOT_POWER;

                        robotShoot[robot_counter] = false;
                    }
                    else if (robotDribblerEnabled[robot_counter]) {
                        ball.speed.x += (robot[robot_counter].x + ROBOT_SIZE - ball.x) * 0.2;
                        ball.speed.y += (robot[robot_counter].y - ball.y) * 0.2;
                    }
                }

                //Move the ball out of the robot
                ball.moveOutOf(robot[robot_counter]);
            }
        }
    }

    //Ball Rolling
    ball.speed.x *= 0.98;
    ball.speed.y *= 0.98;
    ball.x+=ball.speed.x;
    ball.y+=ball.speed.y;


    if(ballInDribbler)
        ball.rotation += 10;
    else
        ball.rotation = (ball.x + ball.y)*Math.PI;

    //Ball reflection
    if((ball.x-BALL_SIZE/2)<0)
    {
        ball.x=BALL_SIZE/2;
        ball.speed.x*=-0.7;
    }
    else if((ball.x+BALL_SIZE/2)>WIDTH)
    {
        ball.x=WIDTH-BALL_SIZE/2;
        ball.speed.x*=-0.7;
    }
    if((ball.y-BALL_SIZE/2)<0)
    {
        ball.speed.y*=-0.7;
        ball.y=BALL_SIZE/2;
    }
    else if((ball.y+BALL_SIZE/2)>HEIGHT)
    {
        ball.speed.y*=-0.7;
        ball.y=HEIGHT-BALL_SIZE/2;
    }

}

