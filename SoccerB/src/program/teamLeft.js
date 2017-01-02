//////////////////
// Definitionen //
//////////////////
////////////////
// Funktionen //
////////////////
//Anfahrt Prototyp
 function anfahrtB( drehung)
{
  if(Api.ballAngleAbsolute() < 90 && Api.ballIntensity()>2400)
   darfHalbRaus = 1;
  if(Api.ballIntensity() > 3000 || (Api.ballIntensity() > 2800 && Math.abs(Api.ballAngle()) < 45)) { // Nahbereich-Anfahrt
   if(Api.ballAngle() > 60){ // zwischen Ball und Tor rechts
    FahrtrichtungB(-300+Api.ballAngle(), SPEED_KREIS);
    soll_phi = 0;
   }
   else if(Api.ballAngle() < -60){ // zwischen Ball und Tor links
    FahrtrichtungB(300+Api.ballAngle(), SPEED_KREIS);
    soll_phi = 0;
   }
   else{ // Parabel anfahrt
    FahrtrichtungB(1.8 * Api.ballAngle(), SPEED_NAH);
    if(Math.abs(Api.ballAngleAbsolute()) < 29)
     soll_phi = -Api.ballAngleAbsolute();
   }
  }
  else if(Api.ballIntensity() < 120) { // Ball nicht erkennbar
   if(0==0)
   Fahrtrichtung_XY(90, 40);
   else
   Fahrtrichtung_XY(90, 30);
   soll_phi = 0;
} else { // Fernbereich-Anfahrt
   var abstand = 4500-Api.ballIntensity();
   FahrtrichtungB(Api.ballAngle()*1.2, abstand * BALL_P);
   soll_phi = 0;
 }
}
// Spielfunktion B-Feld
function spielB1()
{
   if(Api.ballInDribbler()) {
  if(Math.abs((Api.currentRotation())) < 30)
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
 if(Api.ballInDribbler()) {
  if(US_pos[0]>60 && US_pos[0] < 120) {//In Mitte -> schie�en
   if(Math.abs((Api.currentRotation())) < 30){
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
 if(Api.ballIntensity() < 2500) { // Ball nicht erkennbar
        Fahrtrichtung_XY(90, 30);
        soll_phi = 0;
    }else{
        if(US_pos[0] > 60 && US_pos[0] < 120 && US_pos[1] < 80){
            if(Math.abs(Api.ballAngle()) < 90){
    FahrtrichtungB(Api.ballAngle()*1.2, SPEED_TORWART);
   }
            else{
    if(Api.ballAngle() > 0){ // zwischen Ball und Tor rechts
     FahrtrichtungB(-300+Api.ballAngle(), SPEED_KREIS);
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
    if(Math.abs((Api.currentRotation())) < 45) {
     schuss.Kick();
    }
    break;
 }
 if(Api.ballIntensity() > 3700 || (Api.ballIntensity() > 3000 && Math.abs(Api.ballAngle()) < 45)) { // Nahbereich-Anfahrt
  super_turn = 0;
  if(Api.ballAngle() > 90) // zwischen Ball und Tor rechts
   FahrtrichtungB(-270+Api.ballAngle(), SPEED_KREIS);
  else if(Api.ballAngle() < -90) // zwischen Ball und Tor links
   FahrtrichtungB(270+Api.ballAngle(), SPEED_KREIS);
  else // hvarer Ball								
   FahrtrichtungB(2*Api.ballAngle(), SPEED_NAH);
  soll_phi = 0;
 }
 else if(Api.ballIntensity() > 800) { // Fernbereichanfahrt
  super_turn = 0;
  FahrtrichtungB(Api.ballAngle(), SPEED_WEIT);
  soll_phi = 0;
 }
  // TSOP-Diode
  else if(TSOP < 2000) {
   super_turn = 0;
   soll_phi = (Api.currentRotation());
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
 if(Api.ballInDribbler()) {
  super_turn = 0;
   if(Math.abs((Api.currentRotation())) < 45) {
    schuss.Kick();
   }
 }
  else if(Api.ballIntensity() > 4500 && Math.abs(Api.ballAngle()) < 60) { // Nahbereich-Anfahrt verlangsamen
   super_turn = 0;
   FahrtrichtungB(2*Api.ballAngle(), 0);
   soll_phi = 0;
  }
 else if(Api.ballIntensity() > 3700 || (Api.ballIntensity() > 3000 && Math.abs(Api.ballAngle()) < 45)) { // Nahbereich-Anfahrt
  super_turn = 0;
  if(Api.ballAngle() > 90) // zwischen Ball und Tor rechts
   FahrtrichtungB(-270+Api.ballAngle(), SPEED_KREIS);
  else if(Api.ballAngle() < -90) // zwischen Ball und Tor links
   FahrtrichtungB(270+Api.ballAngle(), SPEED_KREIS);
  else // hvarer Ball								
   FahrtrichtungB(2*Api.ballAngle(), SPEED_NAH);
  soll_phi = 0;
 }
 else if(Api.ballIntensity() > 800) { // Fernbereichanfahrt
  super_turn = 0;
  FahrtrichtungB(Api.ballAngle(), SPEED_WEIT);
  soll_phi = 0;
 }
  // TSOP-Diode
  else if(TSOP < 2000) {
   super_turn = 0;
   soll_phi = (Api.currentRotation());
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
 soll_phi = Api.goalAngle();
 if(ballda.check() && Api.ballIntensity()>3000 && Math.abs(Api.ballAngle())<20) {
  if(Math.abs((Api.currentRotation())-Api.goalAngle()) < 1 || (NO_OBJECT && Math.abs((Api.currentRotation())<45))) {
   schuss.Kick();
   FahrtrichtungB(Api.goalAngle()-(Api.currentRotation()),SPEED_BALL);
  }
  soll_phi = Api.goalAngle();
  super_back = 1;
 }
 else if(Api.ballIntensity() > 4200 && Math.abs(Api.ballAngle()) < 45) { // Nahbereich-Anfahrt verlangsamen
  FahrtrichtungB((1.6*Api.ballAngle()), 0);
  soll_phi = Api.goalAngle();
  super_back = 1;
 }
 else if(Api.ballIntensity() > 3000 || (Api.ballIntensity() > 2800 && Math.abs(Api.ballAngle()) < 45)) { // Nahbereich-Anfahrt
  soll_phi = Api.goalAngle();
  super_back = 1;
  if(Api.ballAngle() > 90){ // zwischen Ball und Tor rechts
   FahrtrichtungB(-270+Api.ballAngle(), SPEED_KREIS);
   //FahrtrichtungB(0.0005*(ball_Winkel-130)*(ball_Winkel-130)*(ball_Winkel-130)+0.6*ball_Winkel+100, SPEED_KREIS);
  }
  else if(Api.ballAngle() < -90){ // zwischen Ball und Tor links
   FahrtrichtungB(270+Api.ballAngle(), SPEED_KREIS);
   //FahrtrichtungB(-(0.0005*(ball_Winkel-130)*(ball_Winkel-130)*(ball_Winkel-130)+0.6*ball_Winkel+100), SPEED_KREIS);
  }
  else{ // hvarer Ball
   FahrtrichtungB(1.8 *Api.ballAngle(), SPEED_NAH);
  }
 }
 else if(Api.ballIntensity()>280) { // Fernbereich-Anfahrt
  var BETRAGtand = 4500-Api.ballIntensity();
  FahrtrichtungB(Api.ballAngle(), BETRAGtand * BALL_P);
  soll_phi = Api.goalAngle();
 }
  else{
   /*if(TSOP_Werte[0]>1300 && TSOP_Werte[1]>1300 && TSOP_Werte[2]>1300 && TSOP_Werte[3]>1300){
				FahrtrichtungB(0,0);	
			}
			else{
				FahrtrichtungB(ball_Winkel_TSOP, SPEED_SUPER);
			}*/
   soll_phi = Api.goalAngle();
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
