var canvas = document.getElementById('canvasField');
var ctx = canvas.getContext("2d");
var fieldImage = new Image();
var ballImage = new Image();
var robotImage = new Image();

const ROBOTS = 2;

const SPEED = 1.3;
const SHOOT_POWER = 2;

const SCALE = 3.5;

const WIDTH = 244;
const HEIGHT = 182;

const OUT_DISTANCE = 30;
const LEFT = OUT_DISTANCE;
const RIGHT = WIDTH - OUT_DISTANCE;
const TOP = OUT_DISTANCE;
const BOTTOM = HEIGHT - OUT_DISTANCE;

const PENALTY_AREA_WIDTH = 30;
const PENALTY_AREA_HEIGHT  = 90;
const GOAL_TOP = 61;
const GOAL_BOTTOM = HEIGHT - 61;


const ROBOT_SIZE = 10;
const BALL_SIZE = 7.4;

const NEUTRAL_POINT= [  new Vector(45 + LEFT, 31 + TOP),
                        new Vector(45 + LEFT, BOTTOM-31),
                        new Vector(RIGHT - 45, 31 + TOP),
                        new Vector(RIGHT - 45, BOTTOM-31),
                        new Vector(WIDTH/2, HEIGHT/2)];


