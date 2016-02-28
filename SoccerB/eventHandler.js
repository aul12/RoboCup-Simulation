//######################Init#########################################
start();
fieldImage.src = 'res/field.png';
ballImage.src = 'res/ball.png';
robotImage.src = 'res/robot.png';

fieldImage.onload = function(){
    draw_clear();
    draw();
};
ballImage.onload = function(){
    draw_clear();
    draw();
};
robotImage.onload = function(){
    draw_clear();
    draw();
};


function mouse_pos(evt)
{
    if(!evt) evt = window.event;
    var pos = { left: evt.clientX, top:evt.clientY };

    var b = (window.document.compatMode && window.document.compatMode == "CSS1Compat") ?
        window.document.documentElement : window.document.body || null;

    if (b)
    {
        pos.left += b.scrollLeft;
        pos.top +=  b.scrollTop;
    }
    return pos;
}

function ball_click(evt)
{
    if (!evt) evt = window.event;
    var p = mouse_pos(evt);
    ball.x = p.left / SCALE;
    ball.y = p.top / SCALE;
    ball.speed.x=0;
    ball.speed.y=0;

    lackOfProgressCounter = 0;
}



//######################Main#########################################
function logicTimerTick()
{
    forEveryRobot(function(robot_counter){
        if(robotInside[robot_counter])
        {
            api.robotn = robot_counter;
            setAlias();
            switch(robot_counter)
            {
                case 0:
                    try {
                        goalieLeft();
                    } catch (e) {
                        alert("Error: \""+e+"\" in goalieLeft");
                        clearIntervals();
                    }
                    break;
                case 1:
                    try {
                        strikerLeft();
                    } catch (e) {
                        alert("Error: \""+e+"\" in strikerLeft");
                        clearIntervals();
                    }
                    break;
                case 2:
                    try {
                        strikerRight();
                    } catch (e) {
                        alert("Error: \""+e+"\" in strikerRight");
                        clearIntervals();
                    }
                    break;
                case 3:
                    try {
                        goalieRight();

                    } catch (e) {
                        alert("Error: \""+e+"\" in GoalieRight");
                        clearIntervals();
                    }
                    break;
            }
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

function physicTimerTick(){
    physics();

}

function drawTimerTick(){
    ROBOT_ENABLE[0] = $('#enable0').is(':checked');
    ROBOT_ENABLE[1] = $('#enable1').is(':checked');
    ROBOT_ENABLE[2] = $('#enable2').is(':checked');
    ROBOT_ENABLE[3] = $('#enable3').is(':checked');

    draw();
}

//######################Start Software#########################################
function start()
{
    robot[0] = new gameObject(20+LEFT, HEIGHT/2, ROBOT_SIZE);
    robot[1] = new gameObject((WIDTH/2)-40, HEIGHT/2, ROBOT_SIZE);
    robot[2] = new gameObject((WIDTH/2)+40, HEIGHT/2, ROBOT_SIZE);
    robot[3] = new gameObject(RIGHT-20, HEIGHT/2, ROBOT_SIZE);

    ball.x = WIDTH /2;
    ball.y = HEIGHT /2;
    ball.speed.x = 0;
    ball.speed.y = 0;

    forEveryRobot(function(robot_counter){
        robot[robot_counter].speed.x = 0;
        robot[robot_counter].speed.y = 0;
        robot[robot_counter].acceleration.x = 0;
        robot[robot_counter].acceleration.y = 0;
    });

    lackOfProgressCounter = 0;
}

function clearIntervals(){
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
}

function timerInit()
{
    start();
    clearIntervals();

    logicTimerReference = setInterval(logicTimerTick,5);
    physicTimerReference = setInterval(physicTimerTick, 1);
    drawTimerReference = setInterval(drawTimerTick, 30);

}
