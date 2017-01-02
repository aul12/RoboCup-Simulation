//Program of the goalie on the right side
function goalieRight()
{
    if(Api.onLine()){
        Api.move(Api.lineAngle()+180 , MAX_SPEED);
    }else{
        if(ballIntens < 2500) { // Ball nicht erkennbar
            Fahrtrichtung_XY(90, 50);
            soll_phi = 0;
        }else{
            if(US_pos[0] > 60 && US_pos[0] < 120 && US_pos[1] < 80){
                if(BETRAG(ball_Winkel) < 90)
                    FahrtrichtungB(ball_Winkel*1.2, SPEED_TORWART);
                else
                    FahrtrichtungB(ball_Winkel*2, SPEED_TORWART);
            }else{
                Fahrtrichtung_XY(90, 30);
            }
        }
    }
}

//Program for the Striker on the right side
function strikerRight() {
    if (Api.onLine()) {
        Api.move(Api.lineAngle() + 180, MAX_SPEED);
    }else {
        if(LICHTSCHRANKE && ballIntens>3000 && BETRAG(ball_Winkel)<20) {
            if(BETRAG(phi_jetzt) < 80) {
                Api.shoot();
            }
            FahrtrichtungB(0, SPEED_BALL);


            if(US_pos[0] < 60)
                soll_phi = -TRICKSHOOT_ANGLE;
            else if(US_pos[0] > 120)
                soll_phi = TRICKSHOOT_ANGLE;

            if(US_pos[1] < 60)
                soll_phi /= 2;
        }
        else if(ballIntens > 3000 || (ballIntens > 2800 && BETRAG(ball_Winkel) < 45)) { // Nahbereich-Anfahrt
            if(ball_Winkel > 90){ // zwischen Ball und Tor rechts
                FahrtrichtungB(-300+ball_Winkel, SPEED_KREIS);
                soll_phi = 0;
            }
            else if(ball_Winkel < -90){ // zwischen Ball und Tor links
                FahrtrichtungB(300+ball_Winkel, SPEED_KREIS);
                soll_phi = 0;
            }
            else{ // hinter Ball
                FahrtrichtungB(1.6 *ball_Winkel, SPEED_NAH);


                if(US_pos[0] < 60)
                    soll_phi = -TRICKSHOOT_ANGLE;
                else if(US_pos[0] > 120)
                    soll_phi = TRICKSHOOT_ANGLE;

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
            FahrtrichtungB((ball_Winkel*1.2)>180?180:(ball_Winkel*1.1), SPEED_WEIT);
            soll_phi = 0;
        }
    }
}