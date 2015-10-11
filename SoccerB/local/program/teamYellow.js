//Program for Yellow Team

//Goalie Left
function goalieYellow()
{
    api.enable_dribbler(false);
    switch(api.robot_line())
    {
        case 0:
            api.move_robot(180, SPEED);
            break;
        case 90:
            api.move_robot(270, SPEED);
            break;
        case 180:
            api.move_robot(0, SPEED);
            break;
        case 270:
            api.move_robot(90, SPEED);
            break;
        default:
            var ball_angle=api.robot_ball_angle();
            if(api.robot_distance(api.distance.BACK)>(60+LEFT))
                ball_angle = 180;
            else if(ball_angle>180||ball_angle<0)
                ball_angle=270;
            else
                ball_angle=90;

            if(api.robot_ball_in_dribbler())
                api.shoot();
            api.move_robot(ball_angle, SPEED);
    }
}

//Striker Left
function strikerYellow()
{
    api.enable_dribbler(true);

    var angle = api.robot_ball_angle();

    switch(api.robot_line())
    {
        case 0:
            api.move_robot(180, SPEED);
            break;
        case 90:
            api.move_robot(270, SPEED);
            break;
        case 180:
            api.move_robot(0, SPEED);
            break;
        case 270:
            api.move_robot(90, SPEED);
            break;
        default:

            if(angle>180)
                angle-=360;
            if(api.robot_ball_in_dribbler())
            {
                angle=0;
                if(Math.abs(api.robot_distance(api.distance.LEFT)-api.robot_distance(api.distance.RIGHT))<GOAL_WIDTH)
                {
                    api.enable_dribbler(false);
                    api.shoot();
                }
            }
            else if(api.robot_ball_distance()<30){
                if(Math.abs(angle)>90)
                    angle = 0.0005 * (angle - 130) ^ 3 + 0.6 * angle + 100;
                else
                    angle*=2;
            }


            api.move_robot(angle, SPEED);
            break;
    }

}
