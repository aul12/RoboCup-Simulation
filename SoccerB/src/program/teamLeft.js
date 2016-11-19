 // spiel.hpp: Spielfunktionen
//////////////////
// Definitionen //
//////////////////
////////////////
// Funktionen //
////////////////
//Anfahrt Prototyp
 function anfahrtB()
{
 if(ballIntens > 3000 || (ballIntens > 2800 && BETRAG(ball_Winkel) < 45)) { // Nahbereich-Anfahrt
  if(ball_Winkel > 90){ // zwischen Ball und Tor rechts
                FahrtrichtungB(-300+ball_Winkel, SPEED_KREIS);
                soll_phi = tor_winkel;
            }
            else if(ball_Winkel < -90){ // zwischen Ball und Tor links
                FahrtrichtungB(300+ball_Winkel, SPEED_KREIS);
                soll_phi = tor_winkel;
            }
            else{ // hvarer Ball
                FahrtrichtungB(2 * ball_Winkel, SPEED_NAH);
                soll_phi = tor_winkel;
            }
 }
 else if(ballIntens < 120) { // Ball nicht erkennbar
   if(0==0)
    Fahrtrichtung_XY(90, 40);
   else
    Fahrtrichtung_XY(90, 30);
  soll_phi = 0;
  console.log(ballIntens);
 }
 else { // Fernbereich-Anfahrt 
  var abstand = 4500-ballIntens;
        FahrtrichtungB((ball_Winkel*1.1)>180?180:(ball_Winkel*1.2), SPEED_WEIT);
        soll_phi = tor_winkel;
 }
}
// Spielfunktion B-Feld
function spielB1()
{
   if(LICHTSCHRANKE && ballIntens>3000 && BETRAG(ball_Winkel)<20) {
  if(BETRAG(phi_jetzt) < 80) {
   schuss.Kick();
  }
  FahrtrichtungB(0, SPEED_BALL);
 }else{
  anfahrtB();
 }
}
// Spielfunktion B-Feld (Drehung zum Tor)################################################################################
//#######################################################################################################################
function spielB2()
{
  if(ballda.check() && ballIntens>4000 && BETRAG(ball_Winkel)<20) {
   if(BETRAG(phi_jetzt) < 80) {
    schuss.Kick();
   }
   FahrtrichtungB(0, SPEED_BALL);
   soll_phi = tor_winkel;
 }else{
        anfahrtB();
 }
}
function torwartB(){
 if(ballIntens < 2000) { // Ball nicht erkennbar
        Fahrtrichtung_XY(90, 50);
        soll_phi = 0;
    }else{
        if(US_pos[0] > 60 && US_pos[0] < 120 && US_pos[1] < 80){
            if(BETRAG(ball_Winkel) < 90)
                FahrtrichtungB(ball_Winkel*1.2, SPEED_TORWART);
            else
                FahrtrichtungB(ball_Winkel*2, SPEED_TORWART);
        }else{
            Fahrtrichtung_XY(90, 50);
        }
    }
}
// Spielfunktion A-Feld (in Mitte fahren)
function spielA1()
{
 if(ballda.check()) { // Wenn Ball da
  if(US_Werte[0] + US_Werte[2] < 80) {
   if(US_Werte[3] < 30 || US_Werte[1] < 30) {
    if(US_Werte[0] < US_Werte[2]) {
     Fahrtrichtung(90, SPEED_SEITE);
    }
    else {
     Fahrtrichtung(-90, SPEED_SEITE);
    }
   }
   else {
     Fahrtrichtung(0, 0);
     if(BETRAG(phi_jetzt) < 25)
      schuss.Kick();
   }
  }
  else if(US_Werte[0] < 40) { // zu weit rechts
   Fahrtrichtung(90, SPEED_SEITE);
  }
  else if(US_Werte[2] < 40) { // zu weit links
   Fahrtrichtung(-90, SPEED_SEITE);
  }
  else {
    Fahrtrichtung(0, 0);
    if(BETRAG(phi_jetzt) < 25)
     schuss.Kick();
  }
 }
  else if(ballIntens > 4000 && BETRAG(ball_Winkel) < 15) { // Nahbereich-Anfahrt verlangsamen
   Fahrtrichtung(2*ball_Winkel, SPEED_SEHRNAH);
  }
 else if(ballIntens > 3000) { // Nahbereich-Anfahrt
  if(ball_Winkel > 90) // zwischen Ball und Tor rechts
   Fahrtrichtung(-270+ball_Winkel, SPEED_KREIS);
  else if(ball_Winkel < -90) // zwischen Ball und Tor links
   Fahrtrichtung(270+ball_Winkel, SPEED_KREIS);
  else // hvarer Ball								
   Fahrtrichtung(2*ball_Winkel, SPEED_NAH);
 }
 else if(ballIntens < 120) { // Ball nicht erkennbar
  Fahrtrichtung_XY(60, 45);
 }
 else { // Fernbereich-Anfahrt
  Fahrtrichtung(ball_Winkel, SPEED_WEIT);
 }
}
// Spielfunktion A-Feld (Drehung zum Tor)
function spielA2()
{
 if(ballda.check()) {
   Fahrtrichtung(0, 0);
   if(soll_phi == 0 && (US_Werte[2]+US_Werte[0] >= 140))
    soll_phi = Round(atan2(US_pos[0]-61, US_Werte[3]+10)*180.0/M_PI);
   if(BETRAG(phi_jetzt-soll_phi) < 10)
    schuss.Kick();
 }
  else if(ballIntens > 4000 && BETRAG(ball_Winkel) < 15) { // Nahbereich-Anfahrt verlangsamen
   Fahrtrichtung(2*ball_Winkel, SPEED_SEHRNAH);
   soll_phi = 0;
  }
 else if(ballIntens > 3000) { // Nahbereich-Anfahrt
  if(ball_Winkel > 90) // zwischen Ball und Tor rechts
   Fahrtrichtung(-270+ball_Winkel, SPEED_KREIS);
  else if(ball_Winkel < -90) // zwischen Ball und Tor links
   Fahrtrichtung(270+ball_Winkel, SPEED_KREIS);
  else // hvarer Ball								
   Fahrtrichtung(2*ball_Winkel, SPEED_NAH);
  soll_phi = 0;
 }
 else if(ballIntens < 120) { // Ball nicht erkennbar
  Fahrtrichtung_XY(60, 45);
  soll_phi = 0;
 }
 else { // Fernbereich-Anfahrt
  Fahrtrichtung(ball_Winkel, SPEED_WEIT);
  soll_phi = 0;
 }
}
// Torwartfunktion A-Feld
function torwartA()
{
 if(ballda.check()) {
   Fahrtrichtung(0, 0);
   if(BETRAG(phi_jetzt) < 10)
    schuss.Kick();
 }
  else if(ballIntens > 4000 && BETRAG(ball_Winkel) < 15 && US_Werte[1] < 30) { // Nahbereich-Anfahrt verlangsamen
   Fahrtrichtung(2*ball_Winkel, SPEED_SEHRNAH);
  }
 else if(ballIntens > 3000 && US_Werte[1] < 30) { // Anfahrt auf Ball
  if(ball_Winkel > 0) {
   FahrtrichtungB((ball_Winkel+20>90)?85:ball_Winkel+20, SPEED_TORWART);
  }
  else if(ball_Winkel < 0) {
   FahrtrichtungB((ball_Winkel-20<-90)?-85:ball_Winkel-20, SPEED_TORWART);
  }
  else {
   FahrtrichtungB(ball_Winkel, SPEED_TORWART);
  }
 }
 else { // eigentliche Torwartaktion
   if(BETRAG(ball_Winkel) < 20 || ballIntens < 40)
    Fahrtrichtung_XY(61, 25);
   else if(ball_Winkel < 0)
    Fahrtrichtung_XY(80, 20);
    else
    Fahrtrichtung_XY(42, 20);
 }
}
// Nullprogramm @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function PIDprogramm()
{
 //soll_phi = tor_winkel;		
 FahrtrichtungB(0,0);
}
// Spielfunktion Superfield Linie (Legosensor)
function spielSuper1()
{
 while(ballda.check()) {
  wdt_reset();
   // Schie�en
    if(BETRAG(phi_jetzt) < 45) {
     schuss.Kick();
    }
    break;
 }
 if(ballIntens > 3700 || (ballIntens > 3000 && BETRAG(ball_Winkel) < 45)) { // Nahbereich-Anfahrt
  super_turn = 0;
  if(ball_Winkel > 90) // zwischen Ball und Tor rechts
   FahrtrichtungB(-270+ball_Winkel, SPEED_KREIS);
  else if(ball_Winkel < -90) // zwischen Ball und Tor links
   FahrtrichtungB(270+ball_Winkel, SPEED_KREIS);
  else // hvarer Ball								
   FahrtrichtungB(2*ball_Winkel, SPEED_NAH);
  soll_phi = 0;
 }
 else if(ballIntens > 800) { // Fernbereichanfahrt
  super_turn = 0;
  FahrtrichtungB(ball_Winkel, SPEED_WEIT);
  soll_phi = 0;
 }
  // TSOP-Diode
  else if(TSOP < 2000) {
   super_turn = 0;
   soll_phi = phi_jetzt;
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
 if(LICHTSCHRANKE) {
  super_turn = 0;
   if(BETRAG(phi_jetzt) < 45) {
    schuss.Kick();
   }
 }
  else if(ballIntens > 4500 && BETRAG(ball_Winkel) < 60) { // Nahbereich-Anfahrt verlangsamen
   super_turn = 0;
   FahrtrichtungB(2*ball_Winkel, SPEED_SEHRNAH);
   soll_phi = 0;
  }
 else if(ballIntens > 3700 || (ballIntens > 3000 && BETRAG(ball_Winkel) < 45)) { // Nahbereich-Anfahrt
  super_turn = 0;
  if(ball_Winkel > 90) // zwischen Ball und Tor rechts
   FahrtrichtungB(-270+ball_Winkel, SPEED_KREIS);
  else if(ball_Winkel < -90) // zwischen Ball und Tor links
   FahrtrichtungB(270+ball_Winkel, SPEED_KREIS);
  else // hvarer Ball								
   FahrtrichtungB(2*ball_Winkel, SPEED_NAH);
  soll_phi = 0;
 }
 else if(ballIntens > 800) { // Fernbereichanfahrt
  super_turn = 0;
  FahrtrichtungB(ball_Winkel, SPEED_WEIT);
  soll_phi = 0;
 }
  // TSOP-Diode
  else if(TSOP < 2000) {
   super_turn = 0;
   soll_phi = phi_jetzt;
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
 soll_phi = tor_winkel;
 if(ballda.check() && ballIntens>3000 && BETRAG(ball_Winkel)<20) {
  if(BETRAG(phi_jetzt-tor_winkel) < 1 || (NO_OBJECT && BETRAG(phi_jetzt<45))) {
   schuss.Kick();
   FahrtrichtungB(tor_winkel-phi_jetzt,SPEED_BALL);
  }
  soll_phi = tor_winkel;
  super_back = 1;
 }
 else if(ballIntens > 4200 && BETRAG(ball_Winkel) < 45) { // Nahbereich-Anfahrt verlangsamen
  FahrtrichtungB((1.6*ball_WinkelR), SPEED_SEHRNAH);
  soll_phi = tor_winkel;
  super_back = 1;
 }
 else if(ballIntens > 3000 || (ballIntens > 2800 && BETRAG(ball_Winkel) < 45)) { // Nahbereich-Anfahrt
  soll_phi = tor_winkel;
  super_back = 1;
  if(ball_WinkelR > 90){ // zwischen Ball und Tor rechts
   FahrtrichtungB(-270+ball_WinkelR, SPEED_KREIS);
   //FahrtrichtungB(0.0005*(ball_Winkel-130)*(ball_Winkel-130)*(ball_Winkel-130)+0.6*ball_Winkel+100, SPEED_KREIS);
  }
  else if(ball_Winkel < -90){ // zwischen Ball und Tor links
   FahrtrichtungB(270+ball_WinkelR, SPEED_KREIS);
   //FahrtrichtungB(-(0.0005*(ball_Winkel-130)*(ball_Winkel-130)*(ball_Winkel-130)+0.6*ball_Winkel+100), SPEED_KREIS);
  }
  else{ // hvarer Ball
   FahrtrichtungB(1.8 *ball_WinkelR, SPEED_NAH);
  }
 }
 else if(ballIntens>280) { // Fernbereich-Anfahrt
  var abstand = 4500-ballIntens;
  FahrtrichtungB(ball_WinkelR, abstand * BALL_P);
  soll_phi = tor_winkel;
 }
  else{
   if(TSOP_Werte[0]>1300 && TSOP_Werte[1]>1300 && TSOP_Werte[2]>1300 && TSOP_Werte[3]>1300){
    FahrtrichtungB(0,0);
   }
   else{
    FahrtrichtungB(ball_Winkel_TSOP, SPEED_SUPER);
   }
   soll_phi = tor_winkel;
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
