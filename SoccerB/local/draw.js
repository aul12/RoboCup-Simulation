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
    if (canvas && canvas.getContext && visible)
    {
        if (ctx)
        {
            ctx.fillStyle = "#FF0000";
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, 14, 0, Math.PI*2, false);
            ctx.fill();
            ctx.stroke();
        }
    }
}

function draw_point(x,y,visible)
{
    if(visible)
    {
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.arc(x, y, 3, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.closePath();
    }
}

function draw_clear()	                                                                                        //Rasen neu Zeichen
{
    if (canvas && canvas.getContext)
    {
        if (ctx)
        {
            ctx.fillStyle = "#008000";
            ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 6;
            ctx.fillStyle = "#0000FF";
            ctx.fillRect (120-30,(ctx.canvas.height/2)-(GOAL_WIDTH/2),30,GOAL_WIDTH);
            ctx.strokeRect (120-30,(ctx.canvas.height/2)-(GOAL_WIDTH/2),30,GOAL_WIDTH);
            ctx.fillStyle = "#FFFF00";
            ctx.fillRect (ctx.canvas.width-(120-30),(ctx.canvas.height/2)-(GOAL_WIDTH/2),-30,GOAL_WIDTH);
            ctx.strokeRect (ctx.canvas.width-(120-30),(ctx.canvas.height/2)-(GOAL_WIDTH/2),-30,GOAL_WIDTH);
            ctx.lineWidth = "5";
            ctx.strokeStyle= "#000000";
            ctx.strokeRect(120, (ctx.canvas.height)/2-(STRAFRAUM_HEIGHT/2), STRAFRAUM_WIDTH, STRAFRAUM_HEIGHT);
            ctx.strokeRect(ctx.canvas.width-120, (ctx.canvas.height)/2-(STRAFRAUM_HEIGHT/2), -STRAFRAUM_WIDTH, STRAFRAUM_HEIGHT);

            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 6;
            ctx.strokeRect (120,120,ctx.canvas.width-240,ctx.canvas.height-240);
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, 80, 0, Math.PI*2, false);
            ctx.stroke();

            draw_point(ctx.canvas.width/2, ctx.canvas.height/2,true);
            draw_point(LEFT+neutral_x_abstand, TOP+neutral_y_abstand,true);
            draw_point(RIGHT-neutral_x_abstand, TOP+neutral_y_abstand,true);
            draw_point(LEFT+neutral_x_abstand, BOTTOM-neutral_y_abstand,true);
            draw_point(RIGHT-neutral_x_abstand, BOTTOM-neutral_y_abstand,true);
        }
    }
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