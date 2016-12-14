//////////////////
// Definitionen //
//////////////////
////////////////
// Funktionen //
////////////////
//Anfahrt Prototyp
 function anfahrtB( drehung)
{
  if(api.ballAngleAbsolute() < 90 && api.ballIntensity()>2400)
   darfHalbRaus = 1;
  if(api.ballIntensity() > 3000 || (api.ballIntensity() > 2800 && BETRAG(api.ballAngle()) < 45)) { // Nahbereich-Anfahrt
   if(api.ballAngle() > 60){ // zwischen Ball und Tor rechts
    FahrtrichtungB(-300+api.ballAngle(), SPEED_KREIS);
    soll_phi = 0;
   }
   else if(api.ballAngle() < -60){ // zwischen Ball und Tor links
    FahrtrichtungB(300+api.ballAngle(), SPEED_KREIS);
    soll_phi = 0;
   }
   else{ // Parabel anfahrt
    FahrtrichtungB(1.8 * api.ballAngle(), SPEED_NAH);
    if(BETRAG(api.ballAngleAbsolute()) < 29)
     soll_phi = -api.ballAngleAbsolute();
   }
  }
  else if(api.ballIntensity() < 120) { // Ball nicht erkennbar
   if(0==0)
   Fahrtrichtung_XY(90, 40);
   else
   Fahrtrichtung_XY(90, 30);
   soll_phi = 0;
} else { // Fernbereich-Anfahrt
   var abstand = 4500-api.ballIntensity();
   FahrtrichtungB(api.ballAngle()*1.2, abstand * BALL_P);
   soll_phi = 0;
 }
}
// Spielfunktion B-Feld
function spielB1()
{
   if(api.ballInDribbler()) {
  if(BETRAG((api.currentRotation())) < 30)
   schuss.Kick();
  FahrtrichtungB(0, SPEED_BALL);
  soll_phi = 0;
 }else{
  darfHalbRaus = 0;
  anfahrtB(0);
 }
}
// Spielfunktion B-Feld (Drehung zum Tor)
function spielB2()
{
 if(api.ballInDribbler()) {
  if(US_pos[0]>60 && US_pos[0] < 120) {//In Mitte -> schie�en
   if(BETRAG((api.currentRotation())) < 30){
    schuss.Kick();
   }
   FahrtrichtungB(0, SPEED_BALL);
   super_turn = 0;
  }else{ //Am Rand -> Richtung Tor drehen
   super_turn = 0;
   FahrtrichtungB(0, SPEED_BALL);
    if(US_pos[0] < 90){
     FahrtrichtungB(90, 600);
    // soll_phi = -20;
    }else{
     FahrtrichtungB(90, 600);
    // soll_phi = 20;
    }
  }
 }else{
  darfHalbRaus = 0;
  trick_shoot_turn = 0;
  super_turn = 0;
  anfahrtB(0);
 }
}
function torwartB(){
 if(api.ballIntensity() < 2500) { // Ball nicht erkennbar
        Fahrtrichtung_XY(90, 30);
        soll_phi = 0;
    }else{
        if(US_pos[0] > 60 && US_pos[0] < 120 && US_pos[1] < 80){
            if(BETRAG(api.ballAngle()) < 90){
    FahrtrichtungB(api.ballAngle()*1.2, SPEED_TORWART);
   }
            else{
    if(api.ballAngle() > 0){ // zwischen Ball und Tor rechts
     FahrtrichtungB(-300+api.ballAngle(), SPEED_KREIS);
     soll_phi = 0;
    }
    else{ // zwischen Ball und Tor links					FahrtrichtungB(300+ball_Winkel, SPEED_KREIS);
     soll_phi = 0;
   }
   }
        }else{
            Fahrtrichtung_XY(90, 30);
        }
    }
}
// Nullprogramm @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function PIDprogramm()
{
 soll_phi = 0;
 FahrtrichtungB(0,0);
}
// Spielfunktion Superfield Linie (Legosensor)
function spielSuper1()
{
 while(ballda.check()) {
  wdt_reset();
   // Schie�en
    if(BETRAG((api.currentRotation())) < 45) {
     schuss.Kick();
    }
    break;
 }
 if(api.ballIntensity() > 3700 || (api.ballIntensity() > 3000 && BETRAG(api.ballAngle()) < 45)) { // Nahbereich-Anfahrt
  super_turn = 0;
  if(api.ballAngle() > 90) // zwischen Ball und Tor rechts
   FahrtrichtungB(-270+api.ballAngle(), SPEED_KREIS);
  else if(api.ballAngle() < -90) // zwischen Ball und Tor links
   FahrtrichtungB(270+api.ballAngle(), SPEED_KREIS);
  else // hvarer Ball								
   FahrtrichtungB(2*api.ballAngle(), SPEED_NAH);
  soll_phi = 0;
 }
 else if(api.ballIntensity() > 800) { // Fernbereichanfahrt
  super_turn = 0;
  FahrtrichtungB(api.ballAngle(), SPEED_WEIT);
  soll_phi = 0;
 }
  // TSOP-Diode
  else if(TSOP < 2000) {
   super_turn = 0;
   soll_phi = (api.currentRotation());
   FahrtrichtungB(0, SPEED_SUPER);
  }
 else { // Ball nicht erkennbar
  FahrtrichtungB(0, 0);
  super_turn = 1;
 }
}
// Spielfunktion Superfield (Legosensor)
function spielSuper2()
{
 if(api.ballInDribbler()) {
  super_turn = 0;
   if(BETRAG((api.currentRotation())) < 45) {
    schuss.Kick();
   }
 }
  else if(api.ballIntensity() > 4500 && BETRAG(api.ballAngle()) < 60) { // Nahbereich-Anfahrt verlangsamen
   super_turn = 0;
   FahrtrichtungB(2*api.ballAngle(), 0);
   soll_phi = 0;
  }
 else if(api.ballIntensity() > 3700 || (api.ballIntensity() > 3000 && BETRAG(api.ballAngle()) < 45)) { // Nahbereich-Anfahrt
  super_turn = 0;
  if(api.ballAngle() > 90) // zwischen Ball und Tor rechts
   FahrtrichtungB(-270+api.ballAngle(), SPEED_KREIS);
  else if(api.ballAngle() < -90) // zwischen Ball und Tor links
   FahrtrichtungB(270+api.ballAngle(), SPEED_KREIS);
  else // hvarer Ball								
   FahrtrichtungB(2*api.ballAngle(), SPEED_NAH);
  soll_phi = 0;
 }
 else if(api.ballIntensity() > 800) { // Fernbereichanfahrt
  super_turn = 0;
  FahrtrichtungB(api.ballAngle(), SPEED_WEIT);
  soll_phi = 0;
 }
  // TSOP-Diode
  else if(TSOP < 2000) {
   super_turn = 0;
   soll_phi = (api.currentRotation());
   FahrtrichtungB(0, SPEED_SUPER);
  }
 else { // Ball nicht erkennbar
  FahrtrichtungB(0, 0);
  super_turn = 1;
 }
}
// Spielfunktion Superfield (TSOP schnell)
function spielSuper3()
{
 soll_phi = api.goalAngle();
 if(ballda.check() && api.ballIntensity()>3000 && BETRAG(api.ballAngle())<20) {
  if(BETRAG((api.currentRotation())-api.goalAngle()) < 1 || (NO_OBJECT && BETRAG((api.currentRotation())<45))) {
   schuss.Kick();
   FahrtrichtungB(api.goalAngle()-(api.currentRotation()),SPEED_BALL);
  }
  soll_phi = api.goalAngle();
  super_back = 1;
 }
 else if(api.ballIntensity() > 4200 && BETRAG(api.ballAngle()) < 45) { // Nahbereich-Anfahrt verlangsamen
  FahrtrichtungB((1.6*api.ballAngle()), 0);
  soll_phi = api.goalAngle();
  super_back = 1;
 }
 else if(api.ballIntensity() > 3000 || (api.ballIntensity() > 2800 && BETRAG(api.ballAngle()) < 45)) { // Nahbereich-Anfahrt
  soll_phi = api.goalAngle();
  super_back = 1;
  if(api.ballAngle() > 90){ // zwischen Ball und Tor rechts
   FahrtrichtungB(-270+api.ballAngle(), SPEED_KREIS);
   //FahrtrichtungB(0.0005*(ball_Winkel-130)*(ball_Winkel-130)*(ball_Winkel-130)+0.6*ball_Winkel+100, SPEED_KREIS);
  }
  else if(api.ballAngle() < -90){ // zwischen Ball und Tor links
   FahrtrichtungB(270+api.ballAngle(), SPEED_KREIS);
   //FahrtrichtungB(-(0.0005*(ball_Winkel-130)*(ball_Winkel-130)*(ball_Winkel-130)+0.6*ball_Winkel+100), SPEED_KREIS);
  }
  else{ // hvarer Ball
   FahrtrichtungB(1.8 *api.ballAngle(), SPEED_NAH);
  }
 }
 else if(api.ballIntensity()>280) { // Fernbereich-Anfahrt
  var BETRAGtand = 4500-api.ballIntensity();
  FahrtrichtungB(api.ballAngle(), BETRAGtand * BALL_P);
  soll_phi = api.goalAngle();
 }
  else{
   /*if(TSOP_Werte[0]>1300 && TSOP_Werte[1]>1300 && TSOP_Werte[2]>1300 && TSOP_Werte[3]>1300){
				FahrtrichtungB(0,0);	
			}
			else{
				FahrtrichtungB(ball_Winkel_TSOP, SPEED_SUPER);
			}*/
   soll_phi = api.goalAngle();
  }
 /*#else
		// TSOP-Diode
		else if(TSOP < 2000) {
			super_turn = 0;
			soll_phi = phi_jetzt;
			FahrtrichtungB(0, SPEED_SUPER2);
		}
	#endif
	else { // Ball nicht erkennbar
		FahrtrichtungB(0, 0);
		super_turn = 1;
	}*/
}
