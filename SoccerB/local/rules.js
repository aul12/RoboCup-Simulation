function checkRules(){
    checkPushing();
    checkDoubleDefence();
    checkGoal();
    checkLine();

    lack_of_progress = (Math.abs(alt_ball_x - ball_x) + Math.abs(alt_ball_y - ball_y)) < 0.1 && ball_speed_x+ball_speed_y<0.00001;
}

function checkGoal(){
    var goal = false;
    if(ball_y>(ctx.canvas.height/2)-(GOAL_WIDTH/2)&&ball_y<(ctx.canvas.height/2)+(GOAL_WIDTH/2))    //Check Y
    {
        //Check X
        if(ball_x+28<LEFT)
        {
            goals_team1++;
            goal = true;
        }
        else if(ball_x-28>RIGHT)
        {
            goals_team2++;
            goal = true;

        }

        if(goal){
            document.getElementById("status").innerHTML = goals_team2+" : "+goals_team1;
            clearInterval(isr_pointer);
            clearInterval(lop_timer_pointer);
            isr_started = false;
        }
    }
}

function checkPushing(){
    for(var robot_counter=0; robot_counter<ROBOTS; robot_counter++)
    {
        if((robot_x[robot_counter]<(120+STRAFRAUM_WIDTH)||robot_x[robot_counter]>(ctx.canvas.width-120-STRAFRAUM_WIDTH))
            &&((robot_y[robot_counter]>(ctx.canvas.height-STRAFRAUM_HEIGHT/2))&&(robot_y[robot_counter]<(ctx.canvas.height+STRAFRAUM_HEIGHT/2)))
            &&pushing[robot_counter])
        {
            robot_x[robot_counter]=ctx.canvas.width/2;
            robot_y[robot_counter]=ctx.canvas.height/2;
            console.log("Pushing");
        }
    }
}

function checkDoubleDefence(){
    for(robot_counter=0; robot_counter<ROBOTS; robot_counter++) {
        for(not_robot_counter=1; not_robot_counter<=ROBOTS ; not_robot_counter++)
        {
            if((robot_x[robot_counter]<(120+STRAFRAUM_WIDTH)||robot_x[robot_counter]>(ctx.canvas.width-120-STRAFRAUM_WIDTH))
                &&((robot_y[robot_counter]>(ctx.canvas.height-STRAFRAUM_HEIGHT/2))&&(robot_y[robot_counter]<(ctx.canvas.height+STRAFRAUM_HEIGHT/2)))
                &&robot_x[not_robot_counter]<(120+STRAFRAUM_WIDTH)||robot_x[not_robot_counter]>(ctx.canvas.width-120-STRAFRAUM_WIDTH)
                &&((robot_y[not_robot_counter]>(ctx.canvas.height-STRAFRAUM_HEIGHT/2))&&(robot_y[not_robot_counter]<(ctx.canvas.height+STRAFRAUM_HEIGHT/2)))
                &&not_robot_counter!=robot_counter)
            {
                console.log("Double defence");
                robot_x[robot_counter]=ctx.canvas.width/2;
                robot_y[robot_counter]=ctx.canvas.height/2;
            }
        }
    }
}

function checkLine(){
    for(robot_counter=0; robot_counter<ROBOTS; robot_counter++) {
        if (robot_inside[robot_counter]) {
            var out = false;
            if ((robot_x[robot_counter] + ROBOT_SIZE) <= LEFT)																	//Linie
                out = true;
            else if ((robot_x[robot_counter] - ROBOT_SIZE) >= RIGHT)
                out = true;
            if ((robot_y[robot_counter] + ROBOT_SIZE) <= TOP)
                out = true;
            else if ((robot_y[robot_counter] - ROBOT_SIZE) >= BOTTOM)
                out = true;
            if (out) {
                if (touch_robot) {
                    robot_x[robot_counter] = ctx.canvas.width / 2;
                    robot_y[robot_counter] = ctx.canvas.height / 2;
                }
                else
                    reset_robot(robot_counter);
            }
        }
    }
}

function Lack_Of_Progress()
{
    if(lack_of_progress&&lop_timer)
    {

        lop_timer=false;

        var abstand = new Array(6);

        var delta_x;
        var delta_y;
        delta_x=(robot_x[1]-(neutral_x_abstand+120))+(robot_x[2]-(neutral_x_abstand+120));
        delta_y=(robot_y[1]-(neutral_y_abstand+120))+(robot_y[1]-(neutral_y_abstand+120));
        abstand[1]=Math.sqrt(delta_x*delta_x+delta_y*delta_y);

        delta_x=(robot_x[1]-(neutral_x_abstand+120))+(robot_x[1]-(neutral_x_abstand+120));
        delta_y=(robot_y[1]-(ctx.canvas.height-neutral_y_abstand-120))+(robot_y[1]-(ctx.canvas.height-neutral_y_abstand-120));
        abstand[2]=Math.sqrt(delta_x*delta_x+delta_y*delta_y);

        delta_x=(robot_x[1]-(ctx.canvas.width-neutral_x_abstand-120))+(robot_x[1]-(ctx.canvas.width-neutral_x_abstand-120));
        delta_y=(robot_y[1]-(neutral_y_abstand+120))+(robot_y[1]-(neutral_y_abstand+120));
        abstand[3]=Math.sqrt(delta_x*delta_x+delta_y*delta_y);

        delta_x=(robot_x[1]-(ctx.canvas.width-neutral_x_abstand-120))+(robot_x[1]-(ctx.canvas.width-neutral_x_abstand-120));
        delta_y=(robot_y[1]-(ctx.canvas.height-neutral_y_abstand-120))+(robot_y[1]-(ctx.canvas.height-neutral_y_abstand-120));
        abstand[4]=Math.sqrt(delta_x*delta_x+delta_y*delta_y);

        delta_x=(robot_x[1]-(ctx.canvas.width/2))+(robot_x[1]-(ctx.canvas.width/2));
        delta_y=(robot_y[1]-(ctx.canvas.height/2))+(robot_y[1]-(ctx.canvas.height/2));
        abstand[5]=Math.sqrt(delta_x*delta_x+delta_y*delta_y);

        var kl=1;
        for(var zaehler=1; zaehler<abstand.length; zaehler++)
        {
            if(abstand[zaehler]>abstand[kl])
                kl=zaehler;
        }

        switch (kl)
        {
            case 1:
                ball_x=neutral_x_abstand+120;
                ball_y=neutral_y_abstand+120;
                break;
            case 2:
                ball_x=neutral_x_abstand+120;
                ball_y=ctx.canvas.height-neutral_y_abstand-120;
                break;
            case 3:
                ball_x=ctx.canvas.width-neutral_x_abstand-120;
                ball_y=neutral_y_abstand+120;
                break;
            case 4:
                ball_x=ctx.canvas.width-neutral_x_abstand-120;
                ball_y=ctx.canvas.height-neutral_y_abstand-120;
                break;
            case  5:
                ball_x=ctx.canvas.width/2;
                ball_y=ctx.canvas.height/2;
                break ;
            default:
                break;
        }
        ball_speed_x=0;
        ball_speed_y=0;
        console.log("Lack of Progress");
        clearInterval(lop_timer_pointer);
        lop_timer_pointer=setInterval(Lack_Of_Progress,3000);
    }

    if(lack_of_progress)
        lop_timer=true;
}

function reset_robot(robot)
{
    robot_inside[robot]=false;
    if(!document.getElementById("check_mute").checked)
        console.log("Der Roboter ist aus dem Feld gefahren");
    robot_x[robot]=0;
    robot_y[robot] =0;
    robot_x_vect[robot]=SPEED_SLOW;
    robot_y_vect[robot]=SPEED_SLOW;
}