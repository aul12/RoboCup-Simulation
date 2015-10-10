/**
 * Created by paul on 10.10.15.
 */
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var feldImage = new Image();
var ballImage = new Image();

const SPEED=3;
const LEFT=100;
const RIGHT=ctx.canvas.width-100;
const TOP=100;
const BOTTOM = ctx.canvas.height-100;
const ROBOTS = 2;
const SPEED_SLOW=0.3;
const ACCELERATION = 1.3;
const SHOOT_POWER = 1.0;
const STRAFRAUM_WIDTH = 90;
const STRAFRAUM_HEIGHT  = 270;
const GOAL_WIDTH = 180;
const ROBOT_SIZE = 33;
const BALL_SIZE = 14;

const NEUTRAL_POSITION = new Vector(140, 78);