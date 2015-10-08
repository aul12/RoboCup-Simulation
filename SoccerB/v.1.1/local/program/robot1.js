/**
 * Created by paul on 11.03.15.
 */
function robot_1_software()
{
    enable_dribbler(1,true);
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
            var ball_angle=robot_ball_angle(1, true);
            if(ball_angle>180||ball_angle<0)
                ball_angle=270;
            else
                ball_angle=90;
            move_robot(ball_angle, 1, SPEED,true);
    }
}
