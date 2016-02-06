function checkRules(){
    //checkPushing();
    //checkDoubleDefence();
    checkGoal();
    checkLine();
    checkLackOfProgress();
}

function checkGoal(){
    var goal = false;

    if((ball.y + BALL_SIZE/2) > GOAL_TOP && (ball.y - BALL_SIZE/2) < GOAL_BOTTOM)
    {
        if(ball.x - BALL_SIZE/2 < LEFT && ball.speed.x < 0)
        {
            goals_team1++;
            goal = true;
        }
        else if(ball.x + BALL_SIZE/2 > RIGHT && ball.speed.x > 0)
        {
            goals_team2++;
            goal = true;
        }

        if(goal){
            document.getElementById("status").innerHTML = goals_team2+" : "+goals_team1;
            clearInterval(timerReference);
            timerStarted = false;
        }
    }
}

function checkPushing(){
    for(var robot_counter=0; robot_counter<ROBOTS; robot_counter++)
    {
        for(var not_robot_counter=0; not_robot_counter<ROBOTS ; not_robot_counter++)
        {
            if(robot[robot_counter].isTouching(robot[not_robot_counter]) && robot_counter!=not_robot_counter)
            {
                if(robot[robot_counter].isInArea(LEFT, (canvas.height-PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)||
                    robot[not_robot_counter].isInArea(LEFT, (canvas.height+PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)){
                    if(robot_counter>=2 && not_robot_counter<2){
                        robot[not_robot_counter].x=ctx.canvas.width/2;
                        robot[not_robot_counter].y=ctx.canvas.height/2;
                    }
                    else if(robot_counter<2 && not_robot_counter>=2){
                        robot[robot_counter].x=ctx.canvas.width/2;
                        robot[robot_counter].y=ctx.canvas.height/2;
                    }
                    console.log("Pushing");
                }
                if(robot[robot_counter].isInArea(canvas.width-LEFT-PENALTY_AREA_WIDTH, (canvas.height-PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)||
                    robot[not_robot_counter].isInArea(LEFT, (canvas.height+PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT)){
                    if(robot_counter>=2 && not_robot_counter<2){
                        robot[not_robot_counter].x=ctx.canvas.width/2;
                        robot[not_robot_counter].y=ctx.canvas.height/2;
                    }
                    else if(robot_counter<2 && not_robot_counter>=2){
                        robot[robot_counter].x=ctx.canvas.width/2;
                        robot[robot_counter].y=ctx.canvas.height/2;
                    }
                    console.log("Pushing");
                }
            }
        }
    }
}

function checkDoubleDefence(){
    for(var robot_counter=0; robot_counter<ROBOTS; robot_counter++) {
        for(var not_robot_counter=robot_counter; not_robot_counter<ROBOTS ; not_robot_counter++)
        {
            /*
            @TODO only check Robots of same Team; check both areas
             */
            if(robot[robot_counter].isInArea(LEFT, (canvas.height-PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT) && robot[not_robot_counter].isInArea(LEFT, (canvas.height-PENALTY_AREA_HEIGHT)/2, PENALTY_AREA_WIDTH, PENALTY_AREA_HEIGHT) && robot[robot_counter].isTouching(robot[not_robot_counter]))
            {
                console.log("Double defence");
                if(robot[robot_counter].distanceTo(ball) < robot[not_robot_counter].distanceTo(ball))
                {
                    robot[robot_counter].x=ctx.canvas.width/2;
                    robot[robot_counter].y=ctx.canvas.height/2;
                }
                else
                {
                    robot[not_robot_counter].x=ctx.canvas.width/2;
                    robot[not_robot_counter].y=ctx.canvas.height/2;
                }
            }
        }
    }
}

function checkLine(){
    for(var robot_counter=0; robot_counter<ROBOTS; robot_counter++) {
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
                reset_robot(robot_counter);
            }
        }
    }
}

function checkLackOfProgress()
{
    //Check if ball is not moving
    lackOfProgressCounter = (ball.speed.x < 0.00001 && ball.speed.y < 0.00001)?lackOfProgressCounter+1:0;

    //No Movement in 5 seconds
    if(lackOfProgressCounter > 1000)
    {
        //Look for the Spot where the ball is in the middle of all robots
        var minDistIndex = 0;
        var dist = new Array(NEUTRAL_POINT.length);

        for(var c=0; c < NEUTRAL_POINT.length; c++)
        {
            switch(ROBOTS){
                case 1:
                    dist[c] = robot[0].distanceTo(NEUTRAL_POINT[c]);
                    break;
                case 2:
                    dist[c] = robot[0].distanceTo(NEUTRAL_POINT[c]) + robot[1].distanceTo(NEUTRAL_POINT[c]);
                    break;
                case 3:
                    dist[c] = Math.abs((robot[0].distanceTo(NEUTRAL_POINT[c]) + robot[1].distanceTo(NEUTRAL_POINT[c]))
                        - (robot[2].distanceTo(NEUTRAL_POINT[c])*2));
                    break;
                case 4:
                    dist[c] = Math.abs((robot[0].distanceTo(NEUTRAL_POINT[c]) + robot[1].distanceTo(NEUTRAL_POINT[c]))
                        - (robot[2].distanceTo(NEUTRAL_POINT[c]) + robot[3].distanceTo(NEUTRAL_POINT[c])));
                    break;
            }

            if(dist[c] < dist[minDistIndex])
                minDistIndex = c;
        }

        ball.x = NEUTRAL_POINT[minDistIndex].x;
        ball.y = NEUTRAL_POINT[minDistIndex].y;

        ball.speed.x = 0;
        ball.speed.y = 0;
        ball.acceleration.x = 0;
        ball.acceleration.y = 0;

        lackOfProgressCounter = 0;
    }
}

function reset_robot(robotn)
{
    robotInside[robotn] = false;
    robot[robotn].x = WIDTH/2;
    robot[robotn].y = HEIGHT/2;
    robot[robotn].speed.x = 0;
    robot[robotn].speed.y = 0;
    robot[robotn].acceleration.x = 0;
    robot[robotn].acceleration.y = 0;
}