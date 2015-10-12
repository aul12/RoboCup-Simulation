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

            if(ballAngle<0)
                api.move(270, SPEED);
            else
                api.move(90, SPEED);


            if(api.ballInDribbler())
                api.shoot();

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
                    angle*=2;
            }


            api.move(angle, SPEED);
            break;
    }

}
