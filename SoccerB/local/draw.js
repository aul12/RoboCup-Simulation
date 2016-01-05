

function draw_robot(x,y,angle,visible)
{

    if (canvas && canvas.getContext && visible && ctx)
    {
        angle = angle * Math.PI / 180;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.drawImage(robotImage, -ROBOT_SIZE, -ROBOT_SIZE, ROBOT_SIZE*2, ROBOT_SIZE*2);
        ctx.rotate(-angle);
        ctx.translate(-x, -y);

    }
}

function draw_ball(x,y,angle,visible)	                                                                                //Ball zeichnen
{
    if (canvas && canvas.getContext && visible && ctx) {
        angle = angle * Math.PI / 180;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.drawImage(ballImage, -BALL_SIZE, -BALL_SIZE, BALL_SIZE*2, BALL_SIZE*2);
        ctx.rotate(-angle);
        ctx.translate(-x, -y);
    }
}

function draw_clear()	                                                                                        //Rasen neu Zeichen
{
    if (canvas && canvas.getContext && ctx)
        ctx.drawImage(feldImage, 0,0, canvas.width, canvas.height);
}

function draw()	                                                                                                //Zeichnen
{
    draw_clear();
    for(var robot_counter = 0; robot_counter<ROBOTS; robot_counter++)
        draw_robot(robot[robot_counter].x,
            robot[robot_counter].y,
            robot[robot_counter].rotation,
            robot_inside[robot_counter]);
    draw_ball(ball.x,ball.y,ball.rotation, true);

}