/**
 * Created by paul on 11.03.15.
 */
function robot_1_software()
{
    enable_dribbler(0,true);
    switch(robot_line(0))
    {
        case 0:
            move_robot(180, 0, SPEED, true);
            break;
        case 90:
            move_robot(270, 0, SPEED, true);
            break;
        case 180:
            move_robot(0, 0, SPEED, true);
            break;
        case 270:
            move_robot(90, 0, SPEED, true);
            break;
        default:
            var ball_angle=robot_ball_angle(0, true);
            if(ball_angle>180||ball_angle<0)
                ball_angle=270;
            else
                ball_angle=90;
            move_robot(ball_angle, 0, SPEED,true);
    }
}
