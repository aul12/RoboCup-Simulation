function checkRules(){
    //checkPushing();
    checkDoubleDefence();
    checkGoal();
    checkLine();
    checkLackOfProgress();
}


/*
 A goal is scored when the ball strikes or touches the back wall of the goal. Goals scored either by an attacking
 or defending robot have the same end result: they score one goal to the team on the opposite side
 */
function checkGoal(){
    var goal = false;

    if(ball.y > GOAL_TOP && ball.y < GOAL_BOTTOM)
    {
        if(ball.x - BALL_SIZE/2 > RIGHT && ball.x - BALL_SIZE < RIGHT && ball.v.x > 0)
        {
            goalsTeam1++;
            showAlert("Goal Team 1", "alert-success");
            goal = true;
        }
        else if(ball.x + BALL_SIZE/2 < LEFT && ball.x + BALL_SIZE > LEFT && ball.v.x < 0)
        {
            goalsTeam2++;
            showAlert("Goal Team 2", "alert-success");
            goal = true;
        }

        if(goal){
            clearTimers();
            draw();
            $("#status").html(goalsTeam1+" : "+goalsTeam2);
        }
    }
}

/*
 Within the penalty area, the goalie has priority. Attacking robots are not supposed to push the goalie in any way.
 If the attacker and the goalie touch each other and at least one of them has physical contact with the ball, the ball
 will be moved to the nearest unoccupied neutral spot immediately.
 If a goal is scored as a result of this pushed-situation, it will not be granted
 */
function checkPushing(){
    forEveryCombination(function(robot_counter, not_robot_counter) {
        if (robot[robot_counter].isTouching(robot[not_robot_counter]) && robot_counter != not_robot_counter && ROBOT_ENABLE[not_robot_counter]) {
            if (robot[robot_counter].isInArea(LEFT, (canvas.height - PENALTY_AREA_HEIGHT) / 2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT) ||
                robot[not_robot_counter].isInArea(LEFT, (canvas.height + PENALTY_AREA_HEIGHT) / 2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)) {
                if (robot_counter >= 2 && not_robot_counter < 2) {
                    robot[not_robot_counter].x = ctx.canvas.width / 2;
                    robot[not_robot_counter].y = ctx.canvas.height / 2;
                }
                else if (robot_counter < 2 && not_robot_counter >= 2) {
                    robot[robot_counter].x = ctx.canvas.width / 2;
                    robot[robot_counter].y = ctx.canvas.height / 2;
                }
                console.log("Pushing");
            }
            if (robot[robot_counter].isInArea(canvas.width - LEFT - PENALTY_AREA_WIDTH, (canvas.height - PENALTY_AREA_HEIGHT) / 2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT) ||
                robot[not_robot_counter].isInArea(LEFT, (canvas.height + PENALTY_AREA_HEIGHT) / 2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)) {
                if (robot_counter >= 2 && not_robot_counter < 2) {
                    robot[not_robot_counter].x = ctx.canvas.width / 2;
                    robot[not_robot_counter].y = ctx.canvas.height / 2;
                }
                else if (robot_counter < 2 && not_robot_counter >= 2) {
                    robot[robot_counter].x = ctx.canvas.width / 2;
                    robot[robot_counter].y = ctx.canvas.height / 2;
                }
                console.log("Pushing");
            }
        }
    });

}

/*
 Multiple defense occurs if more than one robot from the defending team enters its penalty area with some part
 and substantially affects the game. The robot farther from the ball will be moved to the nearest neutral spot. The
 referee could take this action at any time when both robots linger in their penalty area.
 */
function checkDoubleDefence(){
    function getClosestLOP(robot){
        var minIndex = 0, minDistance = 1e3;
        for(var c=1; c<NEUTRAL_POINT.length; c++){
            if(robot.distanceTo(NEUTRAL_POINT[c]) < minDistance){
                minIndex = c;
                minDistance = robot.distanceTo(NEUTRAL_POINT[c]);
            }
        }
        return minIndex;
    }

    function moveRobotToPoint(robot, point){
        robot.x = point.x;
        robot.y = point.y;
        robot.v.x = robot.v.y = 0;
        robot.a.x = robot.a.y = 0;
    }

    //Check both Teams
    if(robot[0].isInArea(LEFT, (HEIGHT - PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)
        && robot[1].isInArea(LEFT, (HEIGHT - PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)){
        showAlert("Double Defence of Team 1", "alert-danger");

        //Double Defence Team Left, check which robot is further from the ball
        if(robot[0].distanceTo(ball) > robot[1].distanceTo(ball)){
            //Move Robot 0
            moveRobotToPoint(robot[0], NEUTRAL_POINT[getClosestLOP(robot[0])]);
        }else{
            //Move Robot 1
            moveRobotToPoint(robot[1], NEUTRAL_POINT[getClosestLOP(robot[1])]);
        }
    }

    //Check both Teams
    if(robot[2].isInArea(RIGHT-PENALTY_AREA_WIDTH, (HEIGHT- PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)
        && robot[3].isInArea(RIGHT-PENALTY_AREA_WIDTH, (HEIGHT - PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)){
        showAlert("Double Defence of Team 1", "alert-danger");

        //Double Defence Team Left, check which robot is further from the ball
        if(robot[2].distanceTo(ball) > robot[3].distanceTo(ball)){
            //Move Robot 2
            moveRobotToPoint(robot[2], NEUTRAL_POINT[getClosestLOP(robot[2])]);
        }else{
            //Move Robot 3
            moveRobotToPoint(robot[2], NEUTRAL_POINT[getClosestLOP(robot[2])]);
        }
    }
}

/*
 If a robot’s entire body moves out beyond the white line of the field completely, it will be called for being out of
 bounds. When this situation arises, the robot is given a one-minute penalty, and the team is asked to remove the
 robot from the field
 */
function checkLine(){
    forEveryRobot(function(robot_counter){
        if (robotInside[robot_counter]) {
            var out = false;
            if ((robot[robot_counter].x + ROBOT_SIZE) <= LEFT)																	//Linie
                out = true;
            else if ((robot[robot_counter].x - ROBOT_SIZE) >= RIGHT)
                out = true;
            if ((robot[robot_counter].y + ROBOT_SIZE) <= TOP)
                out = true;
            else if ((robot[robot_counter].y - ROBOT_SIZE) >= BOTTOM)
                out = true;


            if (out) {
                showAlert("Robot " + robot_counter + " moved out of the field", "alert-danger");
                robotInside[robot_counter] = false;
                robot[robot_counter].x = WIDTH/2;
                robot[robot_counter].y = HEIGHT/2;
                robot[robot_counter].v.x = 0;
                robot[robot_counter].v.y = 0;
                robot[robot_counter].a.x = 0;
                robot[robot_counter].a.y = 0;
            }
        }
    });
}

/*
 Lack of progress occurs if there is no progress in the gameplay for a reasonable period of time and the situation
 is not likely to change. Typical lack of progress situations are when the ball is stuck between robots, when there
 is no change in ball and robot’s positions, or when the ball is beyond detection or reach capability of all robots
 on the field. After a visible and loud count, (usually a count of five, the length of the count could be decided by
 the OC before a competition as long as it’s the same length within a sub-league) a referee will call “lack of
 progress” and will move the ball to the nearest unoccupied neutral spot. If this does not solve the lack of
 progress, the referee can move the ball to different neutral spots.
 */
function checkLackOfProgress()
{
    //Check if ball is not moving
    if(ball.v.x < 0.00001 && ball.v.y < 0.00001){
        lackOfProgressCounter++;
    }else{
        lackOfProgressCounter = 0;
        lastLOP = -1;
    }

    //No Movement in 3 seconds
    if(lackOfProgressCounter > 600)
    {
        //Look for the Spot where the ball is in the middle of all robots
        var minDistIndex = 5;
        var dist = new Array(NEUTRAL_POINT.length +1);
        dist[minDistIndex] = 65535;
        var robotOnLop;

        for(var c=0; c < NEUTRAL_POINT.length; c++)
        {
            robotOnLop = false;
            forEveryRobot(function (robotn) {
                robotOnLop |= robot[robotn].distanceTo(NEUTRAL_POINT[c]) < 0.20;
            });

            var distLeft = 0;
            var distRight = 0;

            if(ROBOT_ENABLE[0] && ROBOT_ENABLE[1])
                distLeft = robot[0].distanceTo(NEUTRAL_POINT[c]) + robot[1].distanceTo(NEUTRAL_POINT[c]);
            else if(ROBOT_ENABLE[0])
                distLeft = robot[0].distanceTo(NEUTRAL_POINT[c]) * 2;
            else if(ROBOT_ENABLE[1])
                distLeft = robot[1].distanceTo(NEUTRAL_POINT[c]) * 2;
            else
                distLeft = 0;

            if(ROBOT_ENABLE[2] && ROBOT_ENABLE[3])
                distRight = robot[2].distanceTo(NEUTRAL_POINT[c]) + robot[3].distanceTo(NEUTRAL_POINT[c]);
            else if(ROBOT_ENABLE[2])
                distRight = robot[2].distanceTo(NEUTRAL_POINT[c]) * 2;
            else if(ROBOT_ENABLE[3])
                distRight = robot[3].distanceTo(NEUTRAL_POINT[c]) * 2;
            else
                distRight = 0;

            dist[c] = Math.abs(distLeft - distRight);

            if(dist[c] < dist[minDistIndex] && c != lastLOP && !robotOnLop)
                minDistIndex = c;
        }

        lastLOP = minDistIndex;

        ball.x = NEUTRAL_POINT[minDistIndex].x;
        ball.y = NEUTRAL_POINT[minDistIndex].y;

        ball.v.x = 0;
        ball.v.y = 0;
        ball.a.x = 0;
        ball.a.y = 0;

        lackOfProgressCounter = 0;

        showAlert("Lack of Progress", "alert-danger");

    }
}