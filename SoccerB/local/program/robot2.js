/**
 * Created by paul on 11.03.15.
 */
function robot_2_software()
{
    enable_dribbler(1,true);

    var angle = robot_ball_angle(1, true);

    switch(robot_line(1))
    {
        case 0:
            move_robot(180, 1, SPEED, true);
            break;
        case 90:
            move_robot(270, 1, SPEED, true);
            break;
        case 180:
            move_robot(0, 1, SPEED, true);
            break;
        case 270:
            move_robot(90, 1, SPEED, true);
            break;
        default:

            if(angle>180)
                angle-=360;
            if(robot_ball_in_dribbler(1))
            {
                angle=0;
                if(Math.abs(robot_distance(1,Distance.LEFT)-robot_distance(1,Distance.RIGHT))<(GOAL_WIDTH/2))
                {
                    enable_dribbler(1, false);
                    shoot(1);
                }
            }
            else if(robot_ball_distance(1)<30)
                angle*=2;

            move_robot(angle, 1, SPEED, true);
            break;
    }

}