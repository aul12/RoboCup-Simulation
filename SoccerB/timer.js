//######################Main#########################################
function logicTimerTick()
{
    for(var c=0; c<TIMER_DIFF; c++){
        forEveryRobot(function(robot_counter){
            if(robotInside[robot_counter])
            {
                api.robotn = robot_counter;
                setAlias();
                switch(robot_counter)
                {
                    case 0:
                        communication.robotReceiver = 1;
                        try {
                            goalieLeft();
                        } catch (e) {
                            alert("Error: \""+e+"\" in goalieLeft");
                            clearTimers();
                        }
                        break;
                    case 1:
                        communication.robotReceiver = 0;
                        try {
                            strikerLeft();
                        } catch (e) {
                            alert("Error: \""+e+"\" in strikerLeft");
                            clearTimers();
                        }
                        break;
                    case 2:
                        communication.robotReceiver = 3;
                        try {
                            strikerRight();
                        } catch (e) {
                            alert("Error: \""+e+"\" in strikerRight");
                            clearTimers();
                        }
                        break;
                    case 3:
                        communication.robotReceiver = 2;
                        try {
                            goalieRight();

                        } catch (e) {
                            alert("Error: \""+e+"\" in GoalieRight");
                            clearTimers();
                        }
                        break;
                }
                getAlias();
            }
            else
            {
                if(++robotOutTimer[robot_counter]>=200)
                {
                    robotInside[robot_counter]=true;
                    robot[robot_counter].x = (WIDTH/2);
                    robot[robot_counter].y = (HEIGHT/2);
                    robotOutTimer[robot_counter]=0;

                }
            }
        });

        checkRules();
    }

}

function physicTimerTick(){
    for(var c=0; c<TIMER_DIFF; c++)
        physics();
}

function drawTimerTick(){
    draw();
}

function clearTimers(){
    try {
        clearInterval(logicTimerReference);
    } catch (e) {}

    try {
        clearInterval(physicTimerReference);
    } catch (e) {
    }

    try {
        clearInterval(drawTimerReference);
    } catch (e) {
    }

    $("#startBtn").html("Start");
    running = false;
}

function timerInit()
{
    if(!running){
        if(!pause){
            start();
        }

        clearTimers();

        logicTimerReference = setInterval(logicTimerTick,5);
        physicTimerReference = setInterval(physicTimerTick, 1);
        drawTimerReference = setInterval(drawTimerTick, 30);

        $("#startBtn").html("Pause");

        running = true;
        pause = false;
    }else{
        clearTimers();
        pause = true;
    }
}