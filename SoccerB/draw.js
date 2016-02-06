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
    for(var robot_counter = 0; robot_counter<ROBOTS; robot_counter++)
        draw_robot(robot[robot_counter].x,
            robot[robot_counter].y,
            robot_counter>=2?robot[robot_counter].rotation+180:robot[robot_counter].rotation ,
            robotInside[robot_counter]);
}