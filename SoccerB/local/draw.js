

function draw_robot(x,y,color,visible)
{

    if (canvas && canvas.getContext && visible)
    {
        if (ctx)
        {

            if(color==1)
                ctx.fillStyle = "#0000FF";
            else
                ctx.fillStyle = "#FFFF00";
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

function draw_ball(x,y,visible)	                                                                                //Ball zeichnen
{
    if (canvas && canvas.getContext && visible && ctx)
        ctx.drawImage(ballImage, x-14,y-14, 28, 28);
}

function draw_clear()	                                                                                        //Rasen neu Zeichen
{
    if (canvas && canvas.getContext && ctx)
        ctx.drawImage(feldImage, 0,0, canvas.width, canvas.height);
}

function draw()	                                                                                                //Zeichnen
{
    draw_clear();
    draw_ball(ball.x,ball.y,true);
    if(ROBOTS>=1)
        draw_robot(robot[0].x,robot[0].y,1,robot_inside[0]);
    if(ROBOTS>=2)
        draw_robot(robot[1].x,robot[1].y,1,robot_inside[1]);
    if(ROBOTS>=3)
        draw_robot(robot[2].x,robot[2].y,2,robot_inside[2]);
    if(ROBOTS>=4)
        draw_robot(robot[3].x,robot[3].y,2,robot_inside[3]);

}