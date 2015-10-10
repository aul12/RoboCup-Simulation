function checkRules(){
    checkPushing();
    checkDoubleDefence();
    checkGoal();
    checkLine();

    lack_of_progress = ball.speed.x < 0.00001 && ball.speed.y < 0.00001;

}

function checkGoal(){
    var goal = false;
    if(ball.y>(ctx.canvas.height/2)-(GOAL_WIDTH/2)&&ball.y<(ctx.canvas.height/2)+(GOAL_WIDTH/2))    //Check Y
    {
        //Check X
        if((ball.x-14)<(LEFT-20))
        {
            goals_team1++;
            goal = true;
        }
        else if((ball.x+14)>(RIGHT+20))
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
        if((robot[robot_counter].x<(120+STRAFRAUM_WIDTH)||robot[robot_counter].x>(ctx.canvas.width-120-STRAFRAUM_WIDTH))
            &&((robot[robot_counter].y>(ctx.canvas.height-STRAFRAUM_HEIGHT/2))&&(robot[robot_counter].y<(ctx.canvas.height+STRAFRAUM_HEIGHT/2)))
            &&pushing[robot_counter])
        {
            robot[robot_counter].x=ctx.canvas.width/2;
            robot[robot_counter].y=ctx.canvas.height/2;
            console.log("Pushing");
        }
    }
}

function checkDoubleDefence(){
    for(var robot_counter=0; robot_counter<ROBOTS; robot_counter++) {
        for(var not_robot_counter=0; not_robot_counter<ROBOTS ; not_robot_counter++)
        {

            if((robot[robot_counter].x<(120+STRAFRAUM_WIDTH)||robot[robot_counter].x>(ctx.canvas.width-120-STRAFRAUM_WIDTH))
                &&((robot[robot_counter].y>(ctx.canvas.height-STRAFRAUM_HEIGHT/2))&&(robot[robot_counter].y<(ctx.canvas.height+STRAFRAUM_HEIGHT/2)))
                &&robot[not_robot_counter].x<(120+STRAFRAUM_WIDTH)||robot[not_robot_counter].x>(ctx.canvas.width-120-STRAFRAUM_WIDTH)
                &&((robot[not_robot_counter].y>(ctx.canvas.height-STRAFRAUM_HEIGHT/2))&&(robot[not_robot_counter].y<(ctx.canvas.height+STRAFRAUM_HEIGHT/2)))
                &&not_robot_counter!=robot_counter)
            {
                console.log("Double defence");
                robot[robot_counter].x=ctx.canvas.width/2;
                robot[robot_counter].y=ctx.canvas.height/2;
            }
        }
    }
}

function checkLine(){
    for(var robot_counter=0; robot_counter<ROBOTS; robot_counter++) {
        if (robot_inside[robot_counter]) {
            var out = false;
            if ((robot[robot_counter].x + ROBOT_SIZE) <= LEFT)																	//Linie
                out = true;
            else if ((robot[robot_counter].x - ROBOT_SIZE) >= RIGHT)
                out = true;
            if ((robot[robot_counter].y + ROBOT_SIZE) <= TOP)
                out = true;
            else if ((robot[robot_counter].y - ROBOT_SIZE) >= BOTTOM)
                out = true;
            if (out) {
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
        delta_x=(robot[1].x-(NEUTRAL_POSITION.x+120))+(robot[2].x-(NEUTRAL_POSITION.x+120));
        delta_y=(robot[1].y-(NEUTRAL_POSITION.y+120))+(robot[1].y-(NEUTRAL_POSITION.y+120));
        abstand[1]=Math.sqrt(delta_x*delta_x+delta_y*delta_y);

        delta_x=(robot[1].x-(NEUTRAL_POSITION.x+120))+(robot[1].x-(NEUTRAL_POSITION.x+120));
        delta_y=(robot[1].y-(ctx.canvas.height-NEUTRAL_POSITION.y-120))+(robot[1].y-(ctx.canvas.height-NEUTRAL_POSITION.y-120));
        abstand[2]=Math.sqrt(delta_x*delta_x+delta_y*delta_y);

        delta_x=(robot[1].x-(ctx.canvas.width-NEUTRAL_POSITION.x-120))+(robot[1].x-(ctx.canvas.width-NEUTRAL_POSITION.x-120));
        delta_y=(robot[1].y-(NEUTRAL_POSITION.y+120))+(robot[1].y-(NEUTRAL_POSITION.y+120));
        abstand[3]=Math.sqrt(delta_x*delta_x+delta_y*delta_y);

        delta_x=(robot[1].x-(ctx.canvas.width-NEUTRAL_POSITION.x-120))+(robot[1].x-(ctx.canvas.width-NEUTRAL_POSITION.x-120));
        delta_y=(robot[1].y-(ctx.canvas.height-NEUTRAL_POSITION.y-120))+(robot[1].y-(ctx.canvas.height-NEUTRAL_POSITION.y-120));
        abstand[4]=Math.sqrt(delta_x*delta_x+delta_y*delta_y);

        delta_x=(robot[1].x-(ctx.canvas.width/2))+(robot[1].x-(ctx.canvas.width/2));
        delta_y=(robot[1].y-(ctx.canvas.height/2))+(robot[1].y-(ctx.canvas.height/2));
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
                ball.x=NEUTRAL_POSITION.x+120;
                ball.y=NEUTRAL_POSITION.y+120;
                break;
            case 2:
                ball.x=NEUTRAL_POSITION.x+120;
                ball.y=ctx.canvas.height-NEUTRAL_POSITION.y-120;
                break;
            case 3:
                ball.x=ctx.canvas.width-NEUTRAL_POSITION.x-120;
                ball.y=NEUTRAL_POSITION.y+120;
                break;
            case 4:
                ball.x=ctx.canvas.width-NEUTRAL_POSITION.x-120;
                ball.y=ctx.canvas.height-NEUTRAL_POSITION.y-120;
                break;
            case  5:
                ball.x=ctx.canvas.width/2;
                ball.y=ctx.canvas.height/2;
                break ;
            default:
                break;
        }
        ball.speed.x = 0;
        ball.speed.y = 0;
        console.log("Lack of Progress");
        clearInterval(lop_timer_pointer);
        lop_timer_pointer=setInterval(Lack_Of_Progress,3000);
    }

    if(lack_of_progress)
        lop_timer=true;
}

function reset_robot(robotn)
{
    robot_inside[robotn]=false;
    if(!document.getElementById("check_mute").checked)
        console.log("Der Roboter ist aus dem Feld gefahren");
    robot[robotn].x=0;
    robot[robotn].y =0;
    robot[robotn].speed.x = SPEED_SLOW;
    robot[robotn].speed.y = SPEED_SLOW;
}