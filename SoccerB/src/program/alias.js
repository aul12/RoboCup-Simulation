var soll_phi = 0;

var US_pos = [3];

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

const defines = "#define _SIMULATION";

function initAlias(){
	ballda = new Ballda();
	schuss = new Schuss();

    loadFile("spiel.hpp", "SoccerB/src/program/teamLeft.js" , defines);
}

function setAlias(){
    soll_phi = 0;

    communicationData = _communicationData[api.robotn];

    US_pos[0] = (api.distanceToWall(api.distance.RIGHT)*100);
    US_pos[1] = (api.distanceToWall(api.distance.BACK)*100);
    US_pos[2] = (api.distanceToWall(api.distance.LEFT)*100);

    communication.registerReceiver(function(byte){
        _communicationData[communication.robotReceiver] = byte;
    });
}

function  getAlias(){
	//PID
	const P = 0.005, I = 0, D = 0.4;

    api.rotate((soll_phi-api.currentRotation()) * P - api.omega() * D);
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
		api.move(api.lineAngle() + 180 - api.currentRotation(), SPEED);
	else
		torwartB();
}


function strikerLeft(){
	if (api.onLine())
		api.move(api.lineAngle() + 180 - api.currentRotation(), SPEED);
	else
		spielB2();
}


function BETRAG(val){
	return val>=0?val:-val;
}