var canvas = document.getElementById('canvasField');
var ctx = canvas.getContext("2d");

fieldImage.src = 'res/textureField.png';
ballImage.src = 'res/textureBall.png';
robotImage.src = 'res/textureRobotTop.png';

fieldImage.onload = function(){
    ROBOT_ENABLE[0] = $('#enable0').is(':checked');
    ROBOT_ENABLE[1] = $('#enable1').is(':checked');
    ROBOT_ENABLE[2] = $('#enable2').is(':checked');
    ROBOT_ENABLE[3] = $('#enable3').is(':checked');
    draw();
};
ballImage.onload = function(){
    ROBOT_ENABLE[0] = $('#enable0').is(':checked');
    ROBOT_ENABLE[1] = $('#enable1').is(':checked');
    ROBOT_ENABLE[2] = $('#enable2').is(':checked');
    ROBOT_ENABLE[3] = $('#enable3').is(':checked');
    draw();
};
robotImage.onload = function(){
    ROBOT_ENABLE[0] = $('#enable0').is(':checked');
    ROBOT_ENABLE[1] = $('#enable1').is(':checked');
    ROBOT_ENABLE[2] = $('#enable2').is(':checked');
    ROBOT_ENABLE[3] = $('#enable3').is(':checked');
    draw();
};

function draw_robot(x,y,angle,visible)
{

    if (canvas && canvas.getContext && visible && ctx)
    {
        angle = angle * Math.PI / 180;
        ctx.translate(x*SCALE, y*SCALE);
        ctx.rotate(angle);
        ctx.drawImage(robotImage, -ROBOT_SIZE*SCALE, -ROBOT_SIZE*SCALE, ROBOT_SIZE*2*SCALE, ROBOT_SIZE*2*SCALE);
        ctx.rotate(-angle);
        ctx.translate(-x*SCALE, -y*SCALE);

    }
}

function draw_ball(x,y,angle,visible)	                                                                                //Draw Ball
{
    if (canvas && canvas.getContext && visible && ctx) {
        angle = angle * Math.PI / 180;
        ctx.translate(x*SCALE, y*SCALE);
        ctx.rotate(angle);
        ctx.drawImage(ballImage, -BALL_SIZE/2*SCALE, -BALL_SIZE/2*SCALE, BALL_SIZE*SCALE, BALL_SIZE*SCALE);
        ctx.rotate(-angle);
        ctx.translate(-x*SCALE, -y*SCALE);
    }
}

function draw_clear()	                                                                                        //Draw Field
{
    if (canvas && canvas.getContext && ctx)
        ctx.drawImage(fieldImage, 0,0, WIDTH*SCALE, HEIGHT*SCALE);
}

function draw()
{
    draw_clear();
    draw_ball(ball.x,ball.y,ball.rotation, true);
    forEveryRobot(function(robot_counter){
        draw_robot(robot[robot_counter].x,
            robot[robot_counter].y,
            robot_counter >= 2 ? robot[robot_counter].rotation + 180 : robot[robot_counter].rotation,
            robotInside[robot_counter]);
    });

}


function mousePosition(evt)
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


$("#canvasField").click(function(evt){
    if (!evt) evt = window.event;
    var p = mousePosition(evt);


    ball.x = p.left / SCALE;
    ball.y = HEIGHT - (p.top / SCALE);


    ball.v.x=0;
    ball.v.y=0;

    lackOfProgressCounter = 0;
});