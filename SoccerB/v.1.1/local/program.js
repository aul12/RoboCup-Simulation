/**
 * Created by paul on 11.03.15.
 */
//######################Robot Software#########################################

function program_goaly()
{
    enable_dribbler(3,true);
    switch(robot_line(3))
    {
        case 0:
            move_robot(180, 3, SPEED, true);
            break;
        case 90:
            move_robot(270, 3, SPEED, true);
            break;
        case 180:
            move_robot(0, 3, SPEED, true);
            break;
        case 270:
            move_robot(90, 3, SPEED, true);
            break;
        default:
            var ball_angle=robot_ball_angle(3, true);
            if(ball_angle>180||ball_angle<0)
                ball_angle=270;
            else
                ball_angle=90;
            move_robot(ball_angle, 3, SPEED,true);
    }
}
function program_striker()
{
    enable_dribbler(4,true);
    var angle = robot_ball_angle(4, true);
    switch(robot_line(4))
    {
        case 0:
            move_robot(180, 4, SPEED, true);
            break;
        case 90:
            move_robot(270, 4, SPEED, true);
            break;
        case 180:
            move_robot(0, 4, SPEED, true);
            break;
        case 270:
            move_robot(90, 4, SPEED, true);
            break;
        default:
            if(angle>180)
                angle-=360;
            move_robot(angle*2, 4, SPEED, true);
            if(robot_ball_distance(4)<60&&robot_distance(4,4)>200&&robot_distance(4,2)>200)
            {
                enable_dribbler(4, false);
                shoot(4);
            }
            break;
    }
}