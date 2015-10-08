/**
 * Created by paul on 11.03.15.
 */
function robot_2_software()
{
    enable_dribbler(2,true);
    var angle = robot_ball_angle(2, true);
    switch(robot_line(2))
    {
        case 0:
            move_robot(180, 2, SPEED, true);
            break;
        case 90:
            move_robot(270, 2, SPEED, true);
            break;
        case 180:
            move_robot(0, 2, SPEED, true);
            break;
        case 270:
            move_robot(90, 2, SPEED, true);
            break;
        default:
            if(angle>180)
                angle-=360;
            if(robot_ball_distance(2)<2&&angle>-10&&angle<10)
            {
                angle=0;
                if(Math.abs(robot_distance(2,4)-robot_distance(2,2))<20)
                {
                    enable_dribbler(2, false);
                    shoot(2);
                }
            }
            else if(robot_ball_distance(2)<30)
                angle*=2;
            move_robot(angle, 2, SPEED, true);
            break;
    }
}