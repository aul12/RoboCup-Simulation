/**
 * Created by paul on 11.03.15.
 */
//######################Init#########################################
start();
feldImage.src = 'http://pi.bbcrobotics.org/support/img/Feild2k.png';
ballImage.src = 'https://shop-legoeducation-com.srv103.128secure.net/Resources/Files/product-images/hitechnic-sensors/hitechnic-ir-electronic-ball-ms1005.png';
feldImage.onload = function(){
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
    ball.x = p.left;
    ball.y = p.top;
    ball.speed.x=0;
    ball.speed.y=0;
    clearInterval(lop_timer_pointer);
    lop_timer_pointer=setInterval(Lack_Of_Progress,3000);
}



//######################Main#########################################
function interrupt()
{

    for(var robot_counter=0; robot_counter<ROBOTS; robot_counter++)
    {


        if(robot_inside[robot_counter])
        {
            if(robot_counter==0)
                robot_1_software();
            else if(robot_counter==1) {
                robot_2_software();
            }
        }
        else
        {

            if(++robot_out_timer[robot_counter]>=200)
            {
                robot_inside[robot_counter]=true;
                robot[robot_counter].x = (ctx.canvas.width/2);
                robot[robot_counter].y = (ctx.canvas.height/2);
                robot_out_timer[robot_counter]=0;

            }
        }
    }
    physics();
    checkRules();
    draw();
}

//######################Start Software#########################################
function start()
{
    robot[0] = new gameObject(60+LEFT, ctx.canvas.height/2, ROBOT_SIZE);
    robot[1] = new gameObject((ctx.canvas.width/2)-120, (ctx.canvas.height/2), ROBOT_SIZE);
    robot[2] = new gameObject(RIGHT-60, (ctx.canvas.height/2), ROBOT_SIZE);
    robot[3] = new gameObject((ctx.canvas.width/2)+120, (ctx.canvas.height/2), ROBOT_SIZE);
    ball.x = ctx.canvas.width /2;
    ball.y = ctx.canvas.height /2;
    ball.speed.x = 0;
    ball.speed.y = 0;
    for(var robot_counter = 0 ; robot_counter<ROBOTS; robot_counter++)
    {
        robot[robot_counter].speed.x = SPEED_SLOW;
        robot[robot_counter].speed.y = SPEED_SLOW;
        robot_driving_speed[robot_counter]=0;
    }
}

function isr_init()
{
    start();
    if(!isr_started)
    {
        isr_pointer = setInterval(interrupt,10);
        lop_timer_pointer=setInterval(Lack_Of_Progress,3000);
        isr_started=true;
    }
}