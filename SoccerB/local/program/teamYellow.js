//Program for Yellow Team

//Goalie Left
function goalieYellow()
{
    api.setDribbler(false);
    switch(api.robot_line())
    {
        case 0:
            api.move(180, SPEED);
            break;
        case 90:
            api.move(270, SPEED);
            break;
        case 180:
            api.move(0, SPEED);
            break;
        case 270:
            api.move(90, SPEED);
            break;
        default:
            var ballAngle=api.ballAngle();
            if(api.distance(api.distance.BACK)>(60+LEFT))
                ballAngle = 180;
            else if(ballAngle>180||ballAngle<0)
                ballAngle=270;
            else
                ballAngle=90;

            if(api.ballInDribbler())
                api.shoot();
            api.move(ballAngle, SPEED);
    }
}

//Striker Left
function strikerYellow()
{
    api.setDribbler(true);

    var angle = api.ballAngle();

    switch(api.robot_line())
    {
        case 0:
            api.move(180, SPEED);
            break;
        case 90:
            api.move(270, SPEED);
            break;
        case 180:
            api.move(0, SPEED);
            break;
        case 270:
            api.move(90, SPEED);
            break;
        default:

            if(angle>180)
                angle-=360;
            if(api.ballInDribbler())
            {
                angle=0;
                if(Math.abs(api.distance(api.distance.LEFT)-api.distance(api.distance.RIGHT))<GOAL_WIDTH)
                {
                    api.setDribbler(false);
                    api.shoot();
                }
            }
            else if(api.ballDistance()<30){
                if(Math.abs(angle)>90)
                    angle = 180 - (Math.atan(3/(api.ballDistance()))*180/Math.PI);
                else if(Math.abs(angle)>60)
                    angle*=2;
                else
                    angle*=3;
            }


            api.move(angle, SPEED);
            break;
    }

}
