//######################Physic-Engine#########################################
function physics(deltaT)
{
    var alpha;
    var ballInDribbler = false;

    var ballTouchCounter = 0;

    forEveryRobot(function(robot_counter){
        //Check for wrong values and set them zero
        robot[robot_counter].rotationAcceleration = checkNaN(robot[robot_counter].rotationAcceleration);
        robot[robot_counter].rotationVelocity = checkNaN(robot[robot_counter].rotationVelocity);
        robot[robot_counter].rotation = checkNaN(robot[robot_counter].rotation);
        robot[robot_counter].a.x = checkNaN(robot[robot_counter].a.x);
        robot[robot_counter].a.y = checkNaN(robot[robot_counter].a.y);
        robot[robot_counter].v.x = checkNaN(robot[robot_counter].v.x);
        robot[robot_counter].v.y = checkNaN(robot[robot_counter].v.y);
        robot[robot_counter].x = checkNaN(robot[robot_counter].x);
        robot[robot_counter].y = checkNaN(robot[robot_counter].y);

        //Rotate the robots
        robot[robot_counter].rotationVelocity += (robot[robot_counter].rotationAcceleration * deltaT);
        robot[robot_counter].rotationVelocity *= Math.pow(0.8, deltaT);
        robot[robot_counter].rotation += (robot[robot_counter].rotationVelocity * deltaT);

        //Move the robots
        //F=m*a ; v'=a ; s'=v
        robot[robot_counter].v.x += robot[robot_counter].a.x * deltaT;
        robot[robot_counter].v.y += robot[robot_counter].a.y * deltaT;
        robot[robot_counter].v.x *= Math.pow(0.4, deltaT);
        robot[robot_counter].v.y *= Math.pow(0.4, deltaT);
        robot[robot_counter].x += robot[robot_counter].v.x * deltaT;
        robot[robot_counter].y += robot[robot_counter].v.y * deltaT;

        //Check Maximum Speed
        if (robot[robot_counter].v.abs() > 1) {
            robot[robot_counter].v.x /= robot[robot_counter].v.abs();
            robot[robot_counter].v.y /= robot[robot_counter].v.abs();
        }

        //Check if the robots are standing in the goal
        if ((robot[robot_counter].y + ROBOT_SIZE) > GOAL_TOP && (robot[robot_counter].y - ROBOT_SIZE) < GOAL_BOTTOM) {
            if (robot[robot_counter].x - ROBOT_SIZE < LEFT) {
                robot[robot_counter].x = LEFT + ROBOT_SIZE;
                robot[robot_counter].v.x = 0;
                robot[robot_counter].a.x = 0;
                robot[robot_counter].v.y /= 2;
            }
            else if (robot[robot_counter].x + ROBOT_SIZE > RIGHT) {
                robot[robot_counter].x = RIGHT - ROBOT_SIZE;
                robot[robot_counter].v.x = 0;
                robot[robot_counter].a.x = 0;
                robot[robot_counter].v.y /= 2;
            }
        }


        //Check if the robots are touching
        forEveryOtherRobot(robot_counter, function(second_robot_counter){
            if (robot[robot_counter].isTouching(robot[second_robot_counter])) {
                alpha = robot[second_robot_counter].angleTo(robot[robot_counter]);

                robot[second_robot_counter].x = robot[robot_counter].x + Math.cos(alpha) * ROBOT_SIZE * 2;
                robot[second_robot_counter].y = robot[robot_counter].y + Math.sin(alpha) * ROBOT_SIZE * 2;

                //Inelastic collision
                robot[robot_counter].v.y *= 0.5;
                robot[second_robot_counter].v.x *= 0.5;
                robot[second_robot_counter].v.y *= 0.5;
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
                    ball.v.x += Math.cos(alpha) * robot[robot_counter].v.abs() * 0.8;
                    ball.v.y += Math.sin(alpha) * robot[robot_counter].v.abs() * 0.8;

                    ball.moveOutOf(robot[robot_counter]);
                }
                if (robotShoot[robot_counter]) {
                    var rot = -api.currentRotation();

                    if(robot_counter>=2)
                        rot += 180;

                    ball.v.x += SHOOT_POWER * Math.cos(rot * Math.PI / 180);
                    ball.v.y += SHOOT_POWER * Math.sin(rot * Math.PI / 180);
                    robotShoot[robot_counter] = false;
                }
                else if (robotDribblerEnabled[robot_counter]) {
                    ball.v.x += Math.cos(alpha) * robot[robot_counter].v.abs() * -0.4;
                    ball.v.y = robot[robot_counter].v.y * -0.1;

                    ballInDribbler = true;
                }
            }else{
                //Correct the Speed of the Ball
                ball.v.x += Math.cos(alpha) * robot[robot_counter].v.abs() * 0.8;
                ball.v.y += Math.sin(alpha) * robot[robot_counter].v.abs() * 0.8;

                ball.moveOutOf(robot[robot_counter]);
            }

            robot[robot_counter].v.x *= 0.9;
            robot[robot_counter].v.y *= 0.9;

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
               if (diff < RECEPTION_ANGLE){
                    if(ball.distanceTo(robot[robot_counter]) < (BALL_SIZE/2 + ROBOT_SIZE - 3.0)) {
                        delta = ball.distanceTo(robot[robot_counter]) - (BALL_SIZE / 2 + ROBOT_SIZE - 3.0);
                    }
                }else{
                    delta = ball.distanceTo(robot[robot_counter]) - (BALL_SIZE/2 + ROBOT_SIZE);
                }

                robot[robot_counter].x += Math.cos(alpha)*delta;
                robot[robot_counter].y += Math.sin(alpha)*delta;
            }
        });
    }

    //Check for wrong values and set them zero
    ball.v.x = checkNaN(ball.v.x);
    ball.v.y = checkNaN(ball.v.y);
    ball.x = checkNaN(ball.x);
    ball.y = checkNaN(ball.y);

    //Check Maximum Speed
    if(ball.v.abs() > 4){
        ball.v.x /= ball.v.abs()/4;
        ball.v.y /= ball.v.abs()/4;
    }

    //Ball Rolling
    ball.v.x *= Math.pow(0.99, deltaT);
    ball.v.y *= Math.pow(0.99, deltaT);
    ball.x+=ball.v.x*deltaT;
    ball.y+=ball.v.y*deltaT;


    if(ballInDribbler)
        ball.rotation = 20;
    else
        ball.rotation = 0;

    //Ball reflection
    if((ball.x-BALL_SIZE/2)<0)
    {
        ball.x=BALL_SIZE/2;
        ball.v.x*=-0.7;
    }
    else if((ball.x+BALL_SIZE/2)>WIDTH)
    {
        ball.x=WIDTH-BALL_SIZE/2;
        ball.v.x*=-0.7;
    }
    if((ball.y-BALL_SIZE/2)<0)
    {
        ball.v.y*=-0.7;
        ball.y=BALL_SIZE/2;
    }
    else if((ball.y+BALL_SIZE/2)>HEIGHT)
    {
        ball.v.y*=-0.7;
        ball.y=HEIGHT-BALL_SIZE/2;
    }

}

