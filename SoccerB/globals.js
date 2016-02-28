var robot = new Array(4);

var robotInside = [true, true, true, true];
var robotOutTimer = [0,0,0,0];
var robotDribblerEnabled = new Array(4);
var robotShoot= new Array(4);
var pushing= new Array(4);

var ball = new gameObject(ctx.canvas.width/2, ctx.canvas.height/2, BALL_SIZE);

var goals_team1=0;
var goals_team2=0;

var lackOfProgressCounter = 0;

var logicTimerReference;
var physicTimerReference;
var drawTimerReference;

var api = new SoccerAPI(Angle.DEGREE);

