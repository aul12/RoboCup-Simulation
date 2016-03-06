//######################Physic-Engine#########################################
function physics()
{
    var alpha;
    var ballInDribbler = false;

    var ballTouchCounter = 0;

    forEveryRobot(function(robot_counter){
        //Check for wrong values and set them zero
        robot[robot_counter].rotationAcceleration = checkNaN(robot[robot_counter].rotationAcceleration);
        robot[robot_counter].rotationVelocity = checkNaN(robot[robot_counter].rotationVelocity);
        robot[robot_counter].rotation = checkNaN(robot[robot_counter].rotation);
        robot[robot_counter].acceleration.x = checkNaN(robot[robot_counter].acceleration.x);
        robot[robot_counter].acceleration.y = checkNaN(robot[robot_counter].acceleration.y);
        robot[robot_counter].speed.x = checkNaN(robot[robot_counter].speed.x);
        robot[robot_counter].speed.y = checkNaN(robot[robot_counter].speed.y);
        robot[robot_counter].x = checkNaN(robot[robot_counter].x);
        robot[robot_counter].y = checkNaN(robot[robot_counter].y);

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
                robot[robot_counter].speed.y /= 2;
            }
            else if (robot[robot_counter].x + ROBOT_SIZE > RIGHT) {
                robot[robot_counter].x = RIGHT - ROBOT_SIZE;
                robot[robot_counter].speed.x = 0;
                robot[robot_counter].acceleration.x = 0;
                robot[robot_counter].speed.y /= 2;
            }
        }


        //Check if the robots are touching
        forEveryOtherRobot(robot_counter, function(second_robot_counter){
            if (robot[robot_counter].isTouching(robot[second_robot_counter])) {
                alpha = robot[second_robot_counter].angleTo(robot[robot_counter]);

                robot[second_robot_counter].x = robot[robot_counter].x + Math.cos(alpha) * ROBOT_SIZE * 2;
                robot[second_robot_counter].y = robot[robot_counter].y + Math.sin(alpha) * ROBOT_SIZE * 2;

                //Inelastic collision
                robot[robot_counter].speed.y *= 0.5;
                robot[second_robot_counter].speed.x *= 0.5;
                robot[second_robot_counter].speed.y *= 0.5;
            }
        });


        //Check if the robot is touching the ball
        if (robot[robot_counter].isTouching(ball)) {
            alpha = ball.angleTo(robot[robot_counter]);

            //Calculate the angle of the ball to the robot
            api.robotn = robot_counter;
            var diff = api.ballAngle() % 360;

            if(diff > 180)
                diff -= 360;

            //Ball in the Front
            if (diff < RECEPTION_ANGLE) {
                if(robot[robot_counter].distanceTo(ball) < ROBOT_SIZE){
                    //Correct the Speed of the Ball
                    ball.speed.x += Math.cos(alpha) * robot[robot_counter].speed.abs() * 0.8;
                    ball.speed.y += Math.sin(alpha) * robot[robot_counter].speed.abs() * 0.8;
                }

                if (robotShoot[robot_counter]) {
                    ball.speed.x += robot[robot_counter].speed.x * SHOOT_POWER;
                    robotShoot[robot_counter] = false;
                }
                else if (robotDribblerEnabled[robot_counter]) {
                    ball.speed.x += Math.cos(alpha) * robot[robot_counter].speed.abs() * -0.4;
                    ball.speed.y = robot[robot_counter].speed.y * -0.1;

                    ballInDribbler = true;
                }
            }else{
                //Correct the Speed of the Ball
                ball.speed.x += Math.cos(alpha) * robot[robot_counter].speed.abs() * 0.8;
                ball.speed.y += Math.sin(alpha) * robot[robot_counter].speed.abs() * 0.8;
            }

            robot[robot_counter].speed.x *= 0.9;
            robot[robot_counter].speed.y *= 0.9;

            ballTouchCounter++;
        }
    });

    if(ballTouchCounter >= 2){
        forEveryRobot(function(robot_counter){
            if(robot[robot_counter].isTouching(ball)){
                var alpha = ball.angleTo(robot[robot_counter]);


                api.robotn = robot_counter;
                var diff = api.ballAngle() % 360;

                if(diff > 180)
                    diff -= 360;

                var delta = 0;

                //Ball in the Front
              /*  if (diff < RECEPTION_ANGLE){
                    if(ball.distanceTo(robot[robot_counter]) < (BALL_SIZE/2 + ROBOT_SIZE - 3.0)) {
                        delta = ball.distanceTo(robot[robot_counter]) - (BALL_SIZE / 2 + ROBOT_SIZE - 3.0);
                    }
                    else
                        delta = 0;
                }else{
                    delta = ball.distanceTo(robot[robot_counter]) - (BALL_SIZE/2 + ROBOT_SIZE);
                }*/

                robot[robot_counter].x += Math.cos(alpha)*delta;
                robot[robot_counter].y += Math.sin(alpha)*delta;
            }
        });
    }

    //Check for wrong values and set them zero
    ball.speed.x = checkNaN(ball.speed.x);
    ball.speed.y = checkNaN(ball.speed.y);
    ball.x = checkNaN(ball.x);
    ball.y = checkNaN(ball.y);

    //Check Maximum Speed
    if(ball.speed.abs() > 4){
        ball.speed.x /= ball.speed.abs()/4;
        ball.speed.y /= ball.speed.abs()/4;
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

