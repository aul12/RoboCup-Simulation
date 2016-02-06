var robot = new Array(ROBOTS);

var robotInside = [true, true, true, true];
var robotOutTimer = [0,0,0,0];
var robotDribblerEnabled = new Array(ROBOTS);
var robotShoot= new Array(ROBOTS);
var pushing= new Array(ROBOTS);

var ball = new gameObject(ctx.canvas.width/2, ctx.canvas.height/2, BALL_SIZE);

var goals_team1=0;
var goals_team2=0;

var lackOfProgressCounter = 0;

var timerStarted = false;
var timerReference;

var api = new SoccerAPI(Angle.DEGREE);

