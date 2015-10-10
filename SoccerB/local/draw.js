

function draw_robot(x,y,color,visible)
{
    if (canvas && canvas.getContext && visible)
    {
        if (ctx)
        {

            var distance = Math.sqrt((x-ctx.canvas.width)*(x-ctx.canvas.width) + (y-ctx.canvas.height)*(y-ctx.canvas.height));
            var alpha = Math.atan(distance/CAMERA_HEIGHT);
            var movement =  Math.tan(alpha)* ROBOT_HEIGHT;
            var movement_alpha = Math.atan((x-ctx.canvas.width)/(y-ctx.canvas.height));

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
    draw_ball(ball_x,ball_y,true);
    if(ROBOTS>=1)
        draw_robot(robot_x[1],robot_y[1],1,robot_inside[1]);
    if(ROBOTS>=2)
        draw_robot(robot_x[2],robot_y[2],1,robot_inside[2]);
    if(ROBOTS>=3)
        draw_robot(robot_x[3],robot_y[3],2,robot_inside[3]);
    if(ROBOTS>=4)
        draw_robot(robot_x[4],robot_y[4],2,robot_inside[4]);

}