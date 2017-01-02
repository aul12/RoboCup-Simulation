//http://www.maxonmotor.de/medias/sys_master/8797816094750/maxonMotorData-Handzettel.pdf?attachment=true
function getMaxTorqueAtRpm(motor){
    if(motor.status > 0)
        return motor.torque - motor.torque*Math.abs(motor.status);
    else
        return -(motor.torque - motor.torque*Math.abs(motor.status));
}
/*
Api.motorPower(0,1);
Api.motorPower(1,1);
Api.motorPower(2,1);
Api.motorPower(3,1);
*/

function physics(deltaT)
{
    var alpha;
    var ballInDribbler = false;

    var ballTouchCounter = 0;

    forEveryRobot(function(robotCounter){
        //@TODO physics at the moment are complete bullsh*t
        // a = M/(s*m)
      /*  var f = new Vector(0,0);
        for(var c=0; c<robot[robotCounter].props.motors.length; c++){
            //Calculate torque at current rpm
            var torque = getMaxTorqueAtRpm(robot[robotCounter].props.motors[c])
                * robot[robotCounter].props.motors[c].status;

            //Calculate the torque in the direction
            f.x += torque * Math.cos(robot[robotCounter].props.motors[c].angle * Math.PI);
            f.y += torque * Math.sin(robot[robotCounter].props.motors[c].angle * Math.PI);
        }
        // Calculate the force at the wheel
        f.multiply(1/robot[robotCounter].props.wheelSize);


        // Fr = c * Fn
        var rollFriction = robot[robotCounter].props.rollingFriction *
            robot[robotCounter].props.mass * GRAVITY_CONSTANT;

        // Calculate the rolling friction
        if(f.abs() > rollFriction){
            f.x -=rollFriction * f.x/(Math.abs(f.x) + Math.abs(f.y));
            f.y -=rollFriction * f.y/(Math.abs(f.x) + Math.abs(f.y));
        }else{
            f.multiply(0);
        }

        // Calculate the acceleration
        f.multiply(1/robot[robotCounter].props.mass);

        f.multiply(0.02);

       // f.multiply(0.1);
        //console.log(f);

        robot[robotCounter].a = f;*/

        //Rotate the robots
        robot[robotCounter].omega += (robot[robotCounter].alpha * deltaT);
        robot[robotCounter].omega *= Math.pow(0.8, deltaT);
        robot[robotCounter].phi += (robot[robotCounter].omega * deltaT);

        //Move the robots
        //dv/dt=a ; ds/dt=v
        robot[robotCounter].v.x += robot[robotCounter].a.x * deltaT;
        robot[robotCounter].v.y += robot[robotCounter].a.y * deltaT;
        robot[robotCounter].v.x *= Math.pow(0.4, deltaT);
        robot[robotCounter].v.y *= Math.pow(0.4, deltaT);
        robot[robotCounter].x += robot[robotCounter].v.x * deltaT;
        robot[robotCounter].y += robot[robotCounter].v.y * deltaT;

        //Check Maximum Speed
        if (robot[robotCounter].v.abs() > 1) {
            robot[robotCounter].v.x /= robot[robotCounter].v.abs();
            robot[robotCounter].v.y /= robot[robotCounter].v.abs();
        }

        //Check if the robots are standing in the goal
        if ((robot[robotCounter].y + robot[robotCounter].props.radius) > GOAL_TOP && (robot[robotCounter].y - robot[robotCounter].props.radius) < GOAL_BOTTOM) {
            if (robot[robotCounter].x - robot[robotCounter].props.radius < LEFT) {
                robot[robotCounter].x = LEFT + robot[robotCounter].props.radius;
                robot[robotCounter].v.x = 0;
                robot[robotCounter].a.x = 0;
                robot[robotCounter].v.y /= 2;
            }
            else if (robot[robotCounter].x + robot[robotCounter].props.radius > RIGHT) {
                robot[robotCounter].x = RIGHT - robot[robotCounter].props.radius;
                robot[robotCounter].v.x = 0;
                robot[robotCounter].a.x = 0;
                robot[robotCounter].v.y /= 2;
            }
        }


        //Check if the robots are touching
        forEveryOtherRobot(robotCounter, function(second_robot_counter){
            if (robot[robotCounter].isTouching(robot[second_robot_counter])) {
                alpha = robot[second_robot_counter].angleTo(robot[robotCounter]);

                robot[second_robot_counter].x = robot[robotCounter].x + Math.cos(alpha) * robot[robotCounter].props.radius * 2;
                robot[second_robot_counter].y = robot[robotCounter].y + Math.sin(alpha) * robot[robotCounter].props.radius * 2;

                //Inelastic collision
                robot[robotCounter].v.y *= 0.5;
                robot[second_robot_counter].v.x *= 0.5;
                robot[second_robot_counter].v.y *= 0.5;
            }
        });


        //Check if the robot is touching the ball
        if (robot[robotCounter].isTouching(ball)) {
            alpha = ball.angleTo(robot[robotCounter]);

            //Calculate the angle of the ball to the robot
            Api.robotn = robotCounter;
            var diff = Api.ballAngle() % 360;

            if(diff > 180)
                diff -= 360;

            //Ball in the Front
            if (diff < robot[robotCounter].props.capturingAngle) {
                if(robot[robotCounter].distanceTo(ball) < robot[robotCounter].props.radius){
                    //Correct the Speed of the Ball
                    ball.v.x += Math.cos(alpha) * robot[robotCounter].v.abs() * 0.8;
                    ball.v.y += Math.sin(alpha) * robot[robotCounter].v.abs() * 0.8;

                    ball.moveOutOf(robot[robotCounter]);
                }
                if (robotShoot[robotCounter]) {
                    var rot = -Api.currentRotation();

                    if(robotCounter>=2)
                        rot += 180;

                    ball.v.x += SHOOT_POWER * Math.cos(rot * Math.PI / 180);
                    ball.v.y += SHOOT_POWER * Math.sin(rot * Math.PI / 180);
                    robotShoot[robotCounter] = false;
                }
                else if (robotDribblerEnabled[robotCounter]) {
                    ball.v.x += Math.cos(alpha) * robot[robotCounter].v.abs() * -0.4;
                    ball.v.y = robot[robotCounter].v.y * -0.1;

                    ballInDribbler = true;
                }
            }else{
                //Correct the Speed of the Ball
                ball.v.x += Math.cos(alpha) * robot[robotCounter].v.abs() * 0.8;
                ball.v.y += Math.sin(alpha) * robot[robotCounter].v.abs() * 0.8;

                ball.moveOutOf(robot[robotCounter]);
            }

            robot[robotCounter].v.x *= 0.9;
            robot[robotCounter].v.y *= 0.9;

            ballTouchCounter++;
        }
    });

    if(ballTouchCounter >= 2){
        forEveryRobot(function(robot_counter){
            if(robot[robot_counter].isTouching(ball)){
                var alpha = ball.angleTo(robot[robot_counter]);


                Api.robotn = robot_counter;
                var diff = Api.ballAngle() % 360;

                if(diff > 180)
                    diff -= 360;

                var delta = 0;

                //Ball in the Front
               if (diff < robot[robot_counter].props.capturingAngle){
                    if(ball.distanceTo(robot[robot_counter]) < (ball.props.radius + robot[robot_counter].props.radius - 3.0)) {
                        delta = ball.distanceTo(robot[robot_counter]) - (ball.props.radius + robot[robot_counter].props.radius - 3.0);
                    }
                }else{
                    delta = ball.distanceTo(robot[robot_counter]) - (ball.props.radius + robot[robot_counter].props.radius);
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
        ball.phi = 20;
    else
        ball.phi = 0;

    //Ball reflection
    if((ball.x-ball.props.radius)<0)
    {
        ball.x=ball.props.radius;
        ball.v.x*=-0.7;
    }
    else if((ball.x+ball.props.radius)>WIDTH)
    {
        ball.x=WIDTH-ball.props.radius;
        ball.v.x*=-0.7;
    }
    if((ball.y-ball.props.radius)<0)
    {
        ball.v.y*=-0.7;
        ball.y=ball.props.radius;
    }
    else if((ball.y+ball.props.radius)>HEIGHT)
    {
        ball.v.y*=-0.7;
        ball.y=HEIGHT-ball.props.radius;
    }

}

