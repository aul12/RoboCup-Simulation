/**
 * Created by paul on 11.03.15.
 */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var feldImage = new Image();
var ballImage = new Image();

const SPEED=3;
const LEFT=120;
const RIGHT=ctx.canvas.width-120;
const TOP=120;
const BOTTOM = ctx.canvas.height-120;
const ROBOTS = 2;
const SPEED_SLOW=0.3;
const ACCELERATION = 1.3;
const SHOOT_POWER = 1.0;
const CAMERA_HEIGHT = 10;
const ROBOT_HEIGHT=1;
const STRAFRAUM_WIDTH = 90;
const STRAFRAUM_HEIGHT  = 270;
const GOAL_WIDTH = 180;
const ROBOT_SIZE = 33;


var robot_x = new Array(ROBOTS+1);
var robot_y = new Array(ROBOTS+1);
var robot_inside = [true, true, true,true, true];
var robot_driving_angle = new Array(ROBOTS+1);
var robot_driving_speed = new Array(ROBOTS+1);
var robot_out_timer = [0,0,0,0,0];
var robot_dribbler = new Array(ROBOTS+1);
var robot_shoot= new Array(ROBOTS+1);
var robot_x_vect = new Array(ROBOTS+1);
var robot_y_vect = new Array(ROBOTS+1);


var ball_x;
var ball_y;
var alt_ball_x;
var alt_ball_y;
var ball_speed_x=0;
var ball_speed_y=0;

var goals_team1=0;
var goals_team2=0;

var lack_of_progress=false;
var lop_timer=false;
var isr_started=false;
var isr_pointer;
var lop_timer_pointer;
var neutral_x_abstand = 135;
var neutral_y_abstand = 90;

var robot_prog;
const DEGREE = true;
