var ballIntens, ball_Winkel, ball_WinkelR;
var LICHTSCHRANKE, TRICKSHOOT_ANGLE, ROBO;

var US_pos = [2];

var soll_phi = 0;

var phi_jetzt, tor_winkel;

var _communicationData = [0,0,0,0];

var communicationData = 0;

var TSOP_Werte = [0,0,0,0];

var SPEED_KREIS =  1300;
var SPEED_NAH =  1200;
var SPEED_SEHRNAH =  1100;
var SPEED_SEITE =  600;
var SPEED_TORWART =  1400;
var SPEED_WEIT = 1400;
var SPEED_BALL =  1400;
var US_MAX_POWER =  1200;
var BALL_P = 0.4;

function Ballda(){
	this.check = function(){
		return api.ballInDribbler();
	}
}

function Schuss(){
    this.Kick = function(){
        api.shoot();
    }
}

var ballda, schuss;

const defines = "#define ROBO 0\n"+
    "#define _PIXIE\n"+
    "#define _SCHUSS\n";

function initAlias(){
	ballda = new Ballda();
	schuss = new Schuss();

    loadFile("spiel.hpp", "SoccerB/src/program/teamLeft.js" , defines);
}

function setAlias(){
	LICHTSCHRANKE = api.ballInDribbler();
	TRICKSHOOT_ANGLE = 35;
	ballIntens = api.ballIntensity();
	ball_Winkel = ball_WinkelR = api.ballAngle();
	US_pos[0] = api.distanceToWall(api.distance.RIGHT)*100;
	US_pos[1] = api.distanceToWall(api.distance.BACK)*100;
	ROBO = 0;
	phi_jetzt = api.currentRotation();
    soll_phi = 0;
	tor_winkel = api.goalAngle();

    communicationData = _communicationData[api.robotn];

    communication.registerReceiver(function(byte){
        _communicationData[communication.robotReceiver] = byte;
    });
}

function  getAlias(){
	//PID
	const P = 0.005/TIMER_DIFF, I = 0/TIMER_DIFF, D = 0.4/TIMER_DIFF;

    api.rotate((soll_phi-phi_jetzt) * P - api.rotationVelocity() * D);
}

function FahrtrichtungB(angle, speed){
	speed = speed/1500 * SPEED;
	api.move(angle, speed);
}

function Fahrtrichtung_XY(x,y){
    api.moveToXY(x/100, y/100);
}

function goalieLeft(){
	if (api.onLine())
		api.move(api.lineAngle() + 180 - phi_jetzt, SPEED);
	else
		torwartB();
}


function strikerLeft(){
	if (api.onLine())
		api.move(api.lineAngle() + 180 - phi_jetzt, SPEED);
	else
		spielB2();
}


/**
 * @return {number}
 */
function BETRAG(val){
	return val>=0?val:-val;
}