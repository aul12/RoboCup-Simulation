/**
 * Created by paul on 11.03.15.
 */
//######################Physic-Engine#########################################
function physics()
{
    var delta_x, delta_y, alpha, not_robot_counter, einfall;
    var touch_robot=false;
    var pushing= new Array(ROBOTS);
    for(var robot_counter= 1; robot_counter<=ROBOTS; robot_counter++)
    {
        if(robot_y[robot_counter]>(ctx.canvas.height/2)-(GOAL_WIDTH/2)&&robot_y[robot_counter]<(ctx.canvas.height/2)+(GOAL_WIDTH/2)&&robot_x[robot_counter]<LEFT+40)                                 //Im Tor stehen
        {
            robot_x[robot_counter] = LEFT + ROBOT_SIZE;
            continue;
        }
        else if(robot_y[robot_counter]>(ctx.canvas.height/2)-(GOAL_WIDTH/2)&&robot_y[robot_counter]<(ctx.canvas.height/2)+(GOAL_WIDTH/2)&&robot_x[robot_counter]>RIGHT-40)
        {
            robot_x[robot_counter] = RIGHT - ROBOT_SIZE;
            continue;
        }
        touch_robot=false;
        for(not_robot_counter=1; not_robot_counter<=ROBOTS ; not_robot_counter++)
        {
            if(robot_counter!=not_robot_counter)
            {
                delta_x=robot_x[not_robot_counter]-robot_x[robot_counter];
                delta_y=robot_y[not_robot_counter]-robot_y[robot_counter];
                if(Math.sqrt(delta_x*delta_x+delta_y*delta_y)<ROBOT_SIZE*2)                                                   //Roboter "in" Roboter
                {
                    alpha=Math.atan(delta_y/delta_x);
                    if((delta_x<0))
                        alpha-=Math.PI;
                    if(alpha>2*Math.PI)
                        alpha-=2*Math.PI;
                    if(alpha<0)
                        alpha+=2*Math.PI;
                    robot_x[not_robot_counter]=robot_x[robot_counter]+Math.cos(alpha)*ROBOT_SIZE*2;
                    robot_y[not_robot_counter]=robot_y[robot_counter]+Math.sin(alpha)*ROBOT_SIZE*2;
                    robot_x_vect[robot_counter]=SPEED_SLOW;
                    robot_y_vect[robot_counter]=SPEED_SLOW;
                    robot_x_vect[not_robot_counter]=SPEED_SLOW;
                    robot_y_vect[not_robot_counter]=SPEED_SLOW;
                    touch_robot=true;
                    delta_x=ball_x-robot_x[robot_counter];
                    delta_y=ball_y-robot_y[robot_counter];
                    pushing[robot_counter] = Math.sqrt(delta_x * delta_x + delta_y * delta_y) < 14+ROBOT_SIZE;
                    delta_x=ball_x-robot_x[not_robot_counter];
                    delta_y=ball_y-robot_y[not_robot_counter];
                    pushing[not_robot_counter] = Math.sqrt(delta_x * delta_x + delta_y * delta_y) < 14+ROBOT_SIZE;
                    continue;
                }
            }
        }

        delta_x=ball_x-robot_x[robot_counter];
        delta_y=ball_y-robot_y[robot_counter];
        alt_ball_x=ball_x;
        alt_ball_y=ball_y;

        if(Math.sqrt(delta_x*delta_x+delta_y*delta_y)<ROBOT_SIZE+14)                                                       //Ball "in" Roboter
        {
            alpha=Math.atan(delta_y/delta_x);
            if((delta_x<0))
                alpha-=Math.PI;
            if(alpha>2*Math.PI)
                alpha-=2*Math.PI;
            if(alpha<0)
                alpha+=2*Math.PI;

            if(ball_speed_x!=0&&ball_speed_y!=0)
            {
                einfall=Math.atan(ball_speed_y/ball_speed_x);
                if((ball_speed_x<0))
                    einfall-=Math.PI;
                if(einfall>2*Math.PI)
                    einfall-=2*Math.PI;
                if(einfall<0)
                    einfall+=2*Math.PI;
            }
            else
                einfall=alpha;
            einfall=alpha-einfall;
            // alpha+=einfall;
            if(alpha>2*Math.PI)
                alpha-=2*Math.PI;
            if(alpha<0)
                alpha+=2*Math.PI;

            var factor=1;
            ball_x=robot_x[robot_counter]+Math.cos(alpha)*54;
            ball_y=robot_y[robot_counter]+Math.sin(alpha)*54;
            if(robot_ball_angle(robot_counter,true)>340||robot_ball_angle(robot_counter,true)<20)
            {
                if(robot_dribbler[robot_counter])
                {
                    factor=0.5;
                    ball_x=(99*(robot_x[robot_counter]+Math.cos(alpha)*(ROBOT_SIZE+5))+(robot_x[robot_counter]+(ROBOT_SIZE+5)))/100;
                    ball_y=robot_y[robot_counter]+Math.sin(alpha)*ROBOT_SIZE;
                }
                if(robot_shoot[robot_counter])
                    factor+=SHOOT_POWER;
            }
            robot_shoot[robot_counter]=false;
            ball_speed_x=Math.cos(alpha)*SPEED*factor*robot_x_vect[robot_counter];
            ball_speed_y=Math.sin(alpha)*SPEED*factor*robot_y_vect[robot_counter];
            continue;
        }

        if(robot_inside[robot_counter])
        {
            var out=false;
            if((robot_x[robot_counter]+ROBOT_SIZE)<=LEFT)																	//Linie
                out=true;
            else if((robot_x[robot_counter]-ROBOT_SIZE)>=RIGHT)
                out=true;
            if((robot_y[robot_counter]+ROBOT_SIZE)<=TOP)
                out=true;
            else if((robot_y[robot_counter]-ROBOT_SIZE)>=BOTTOM)
                out=true;
            if(out)
            {
                if(touch_robot)
                {
                    robot_x[robot_counter]=ctx.canvas.width/2;
                    robot_y[robot_counter]=ctx.canvas.height/2;
                }
                else
                    reset_robot(robot_counter);
            }
            continue;
        }
    }


    ball_x+=ball_speed_x;	                                                                                    //Ball rollen
    ball_y+=ball_speed_y;
    ball_speed_x*=0.98;		                                                                                    //Ball bremsen
    ball_speed_y*=0.98;

    if((ball_x-14)<0)																					        //Ball an Wand
    {
        ball_x=14;
        ball_speed_x*=-0.7;
    }
    else if((ball_x+14)>ctx.canvas.width)
    {
        ball_x=ctx.canvas.width-14;
        ball_speed_x*=-0.7;
    }
    if((ball_y-14)<0)
    {
        ball_speed_y*=-0.7;
        ball_y=14;
    }
    else if((ball_y+14)>ctx.canvas.height)
    {
        ball_speed_y*=-0.7;
        ball_y=ctx.canvas.height-14;
    }

    for(robot_counter=0; robot_counter<ROBOTS; robot_counter++)
    {
        if((robot_x[robot_counter]<(120+STRAFRAUM_WIDTH)||robot_x[robot_counter]>(ctx.canvas.width-120-STRAFRAUM_WIDTH))
            &&((robot_y[robot_counter]>(ctx.canvas.height-STRAFRAUM_HEIGHT/2))&&(robot_y[robot_counter]<(ctx.canvas.height+STRAFRAUM_HEIGHT/2)))
            &&pushing[robot_counter])
        {
            robot_x[robot_counter]=ctx.canvas.width/2;
            robot_y[robot_counter]=ctx.canvas.height/2;
            console.log("Pushing");
        }
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


    if(ball_y>(ctx.canvas.height/2)-(GOAL_WIDTH/2)&&ball_y<(ctx.canvas.height/2)+(GOAL_WIDTH/2)&&ball_x<LEFT)                                //Tor
    {

        goals_team1++;
        if(!document.getElementById("check_mute").checked)
            console.log(goals_team2+" : "+goals_team1);
        start();
        return;
    }
    else if(ball_y>(ctx.canvas.height/2)-(GOAL_WIDTH/2)&&ball_y<(ctx.canvas.height/2)+(GOAL_WIDTH/2)&&ball_x>RIGHT)
    {
        goals_team2++;
        console.log(goals_team2+" : "+goals_team1);
        start();
        return;
    }

    lack_of_progress = (Math.abs(alt_ball_x - ball_x) + Math.abs(alt_ball_y - ball_y)) < 0.1 && ball_speed_x+ball_speed_y<0.00001;
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