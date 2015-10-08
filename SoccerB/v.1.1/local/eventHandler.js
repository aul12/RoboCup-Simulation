/**
 * Created by paul on 11.03.15.
 */
//######################Init#########################################
start();
draw_clear();
draw();

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
    ball_x= p.left;
    ball_y= p.top;
    ball_speed_x=0;
    ball_speed_y=0;
    clearInterval(lop_timer_pointer);
    lop_timer_pointer=setInterval(Lack_Of_Progress,3000);
}



//######################Main#########################################
function interrupt()
{
    for(var robot_counter=1; robot_counter<=ROBOTS; robot_counter++)
    {
        if(robot_inside[robot_counter])
        {
            if(robot_counter==1)
                robot_1_software();
            else if(robot_counter==2)
                robot_2_software();
        }
        else
        {
            if(++robot_out_timer[robot_counter]>=200)
            {
                robot_inside[robot_counter]=true;
                robot_x[robot_counter]=(ctx.canvas.width/2);
                robot_y[robot_counter] =(ctx.canvas.height/2);
                robot_out_timer[robot_counter]=0;
            }
        }
    }
    physics();
    draw();
}

//######################Start Software#########################################
function start()
{
    robot_x[1]=60+LEFT;
    robot_y[1] =(ctx.canvas.height/2);
    robot_x[2] =(ctx.canvas.width/2)-120;
    robot_y[2] =(ctx.canvas.height/2);
    robot_x[3]=RIGHT-60;
    robot_y[3] =(ctx.canvas.height/2);
    robot_x[4] =(ctx.canvas.width/2)+120;
    robot_y[4] =(ctx.canvas.height/2);
    ball_x = (ctx.canvas.width/2);
    ball_y = (ctx.canvas.height/2);
    ball_speed_x=0;
    ball_speed_y=0;
    for(var robot_counter =1 ; robot_counter<=ROBOTS; robot_counter++)
    {
        robot_x_vect[robot_counter]=SPEED_SLOW;
        robot_y_vect[robot_counter]=SPEED_SLOW;
        robot_driving_speed[robot_counter]=0;
    }

}

function isr_init()
{
    start();
    if(!isr_started)
    {
        setInterval(interrupt,10);
        lop_timer_pointer=setInterval(Lack_Of_Progress,3000);
        isr_started=true;
    }
}