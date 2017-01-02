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

var ballda = {
	check: function () {
        return Api.ballInDribbler();
    }
};

var schuss = {
	Kick: function () {
        Api.shoot();
    }
};

function initAlias(){
    loadFile("spiel.hpp", "SoccerB/src/program/teamLeft.js" , "#define _SIMULATION");
}

function setAlias(){
    soll_phi = 0;

    communicationData = _communicationData[Api.robotn];

    US_pos[0] = (Api.distanceToWall(Api.distance.RIGHT)*100);
    US_pos[1] = (Api.distanceToWall(Api.distance.BACK)*100);
    US_pos[2] = (Api.distanceToWall(Api.distance.LEFT)*100);
}

function  getAlias(){
	//PID
	const P = 0.005, I = 0, D = 0.4;

    Api.rotate((soll_phi-Api.currentRotation()) * P - Api.omega() * D);
}

function FahrtrichtungB(angle, speed){
	speed = speed/1500 * MAX_SPEED;
	Api.move(angle, speed);
}

function Fahrtrichtung_XY(x,y){
    Api.moveToXY(x/100, y/100);
}

function goalieLeft(){
	if (Api.onLine())
		Api.move(Api.lineAngle() + 180 - Api.currentRotation(), MAX_SPEED);
	else
		torwartB();
}


function strikerLeft(){
	if (Api.onLine())
		Api.move(Api.lineAngle() + 180 - Api.currentRotation(), MAX_SPEED);
	else
		spielB2();
}