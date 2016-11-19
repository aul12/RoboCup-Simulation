var robot = new Array(4);

var robotInside = [true, true, true, true];
var robotOutTimer = [0,0,0,0];
var robotDribblerEnabled = new Array(4);
var robotShoot= new Array(4);

var ball = new GameObject(WIDTH/2, HEIGHT/2, BALL_SIZE/2);

var goalsTeam1 = 0, goalsTeam2 = 0;

var running = false;

var pause = false;

var lackOfProgressCounter = 0;

var logicTimerReference;
var physicTimerReference;
var drawTimerReference;

var physicsTimerPerf = 0;

var api = new SoccerAPI(Angle.DEGREE);
var communication= new CommunicationApi();

var lastLOP = -1;

