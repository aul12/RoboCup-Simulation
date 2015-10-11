

function draw_robot(x,y,angle,color,visible)
{

    if (canvas && canvas.getContext && visible)
    {
        if (ctx)
        {

            if(color==1)
                ctx.fillStyle = "#FFFF00";
            else
                ctx.fillStyle = "#0000FF";
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, ROBOT_SIZE, 0, Math.PI*2, false);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#F8911A";

            if(color==1)
                ctx.fillRect(x+28,y-10,10, 20);
            else
                ctx.fillRect(x-28,y-10,-10, 20);

        }
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
        console.log(angle);
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
    draw_ball(ball.x,ball.y,ball.rotation, true);
    for(var robot_counter = 0; robot_counter<ROBOTS; robot_counter++)
        draw_robot(robot[robot_counter].x,
            robot[robot_counter].y,
            robot[robot_counter].rotation,
            Math.round((robot_counter+1)/2),
            robot_inside[robot_counter])

}