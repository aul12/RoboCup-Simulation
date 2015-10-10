/**
 * Created by paul on 11.03.15.
 */



var robot = new Array(ROBOTS+1);

var robot_inside = [true, true, true,true, true];
var robot_driving_angle = new Array(ROBOTS+1);
var robot_driving_speed = new Array(ROBOTS+1);
var robot_out_timer = [0,0,0,0,0];
var robot_dribbler = new Array(ROBOTS+1);
var robot_shoot= new Array(ROBOTS+1);

var ball = new gameObject(ctx.canvas.width/2, ctx.canvas.height/2, BALL_SIZE);

var goals_team1=0;
var goals_team2=0;

var lack_of_progress=false;
var lop_timer=false;
var isr_started=false;
var isr_pointer;
var lop_timer_pointer;
var neutral_x_abstand = 135;
var neutral_y_abstand = 90;
