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
function timerTick()
{
    for(var robot_counter=0; robot_counter<ROBOTS; robot_counter++)
    {
        if(robotInside[robot_counter])
        {
            api.robotn = robot_counter;
            switch(robot_counter)
            {
                case 0:
                    goalieLeft();
                    break;
                case 1:
                    strikerLeft();
                    break;
                case 2:
                    goalieRight();
                    break;
                case 3:
                    strikerRight();
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
    }
    physics();
    draw();
    checkRules();

}

//######################Start Software#########################################
function start()
{
    robot[0] = new gameObject(20+LEFT, HEIGHT/2, ROBOT_SIZE);
    robot[1] = new gameObject((WIDTH/2)-40, HEIGHT/2, ROBOT_SIZE);
    robot[2] = new gameObject(RIGHT-20, HEIGHT/2, ROBOT_SIZE);
    robot[3] = new gameObject((WIDTH/2)+40, HEIGHT/2, ROBOT_SIZE);
    ball.x = WIDTH /2;
    ball.y = HEIGHT /2;
    ball.speed.x = 0;
    ball.speed.y = 0;
    for(var robot_counter = 0 ; robot_counter<ROBOTS; robot_counter++)
    {
        robot[robot_counter].speed.x = 0;
        robot[robot_counter].speed.y = 0;
        robot[robot_counter].acceleration.x = 0;
        robot[robot_counter].acceleration.y = 0;
    }

    lackOfProgressCounter = 0;
}

function timerInit()
{
    start();
    if(!timerStarted)
    {
        timerReference = setInterval(timerTick,5);
        timerStarted = true;
    }
}
