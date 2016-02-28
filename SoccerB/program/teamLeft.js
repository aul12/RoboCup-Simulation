//Program for Yellow Team

//Goalie Left
function goalieLeft()
{
    if(api.onLine()){
        api.move(api.lineAngle()+180 , SPEED);
    }
    else{
        api.setDribbler(false);
        var ballAngle=api.ballAngle();
        if(api.distance(api.distance.BACK)>(60+LEFT))
            ballAngle = 180;
        else if(ballAngle>180||ballAngle<0)
            ballAngle=270;
        else
            ballAngle=90;
        api.move(ballAngle, SPEED);

        if(api.ballInDribbler())
            api.shoot();
    }
}

//Striker Left
function strikerLeft()
{
    if (api.onLine()) {
        api.move(api.lineAngle() + 180, SPEED);
    }
    else {
       /* var angle = api.ballAngle();

        if (api.ballInDribbler()) {
            angle = 0;
            api.setDribbler(false);
            api.shoot();
        }
        else if(api.ballIntensity() > 2800){
            if(Math.abs(angle) > 90){
                if(angle < 0)
                    angle -=90;
                else
                    angle +=90;
            }
            else if (Math.abs(angle) > 60)
                angle *= 2;
            else
                angle *= 2;
        }
        api.move(angle, SPEED);*/
        if(LICHTSCHRANKE && ballIntens>3000 && BETRAG(ball_Winkel)<20) {
            if(BETRAG(phi_jetzt) < 80) {
                //schuss::Kick();
                api.shoot();
            }
            FahrtrichtungB(0, SPEED_BALL);


            if(US_pos[0] < 60)
                soll_phi = TRICKSHOOT_ANGLE;
            else if(US_pos[0] > 120)
                soll_phi = -TRICKSHOOT_ANGLE;

            if(US_pos[1] < 60)
                soll_phi /= 2;

        }
        else if(ballIntens > 3000 || (ballIntens > 2800 && BETRAG(ball_Winkel) < 45)) { // Nahbereich-Anfahrt
            if(ball_Winkel > 90){ // zwischen Ball und Tor rechts
                FahrtrichtungB(-270+ball_Winkel, SPEED_KREIS);
                soll_phi = 0;
            }
            else if(ball_Winkel < -90){ // zwischen Ball und Tor links
                FahrtrichtungB(270+ball_Winkel, SPEED_KREIS);
                soll_phi = 0;
            }
            else{ // hinter Ball
                //FahrtrichtungB(2 *ball_Winkel, SPEED_NAH);
                FahrtrichtungB(ball_Winkel*2, SPEED_NAH);
                soll_phi = 0;

                if(US_pos[0] < 60)
                    soll_phi = TRICKSHOOT_ANGLE;
                else if(US_pos[0] > 120)
                    soll_phi = -TRICKSHOOT_ANGLE;

                if(US_pos[1] < 60)
                    soll_phi /= 2;
            }
        }
        else if(ballIntens < 120) { // Ball nicht erkennbar
            if(ROBO==0)
                Fahrtrichtung_XY(90, 40);
            else
                Fahrtrichtung_XY(90, 30);

            soll_phi = 0;
        }
        else { // Fernbereich-Anfahrt
            var abstand = 4500-ballIntens;
            if(BETRAG(ball_Winkel)>90)
                FahrtrichtungB(ball_Winkel, abstand * BALL_P);
            else
                FahrtrichtungB(ball_Winkel*1.1, abstand * BALL_P);
            soll_phi = 0;
        }
    }
}
