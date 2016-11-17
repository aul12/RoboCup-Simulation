var fieldImage = new Image();
var ballImage = new Image();
var robotImage = new Image();

var ROBOT_ENABLE = [true, true, true, true];

var TIMER_DIFF = 1;

const POV = false;
const POVRobot = 1;

const SPEED = 3;
const SHOOT_POWER = 0.8;

const SCALE = 3.9;

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

const RECEPTION_ANGLE = 15;


const ROBOT_SIZE = 11;
const BALL_SIZE = 7.4;

const NEUTRAL_POINT= [  new Vector(45 + LEFT, 31 + TOP),
                        new Vector(45 + LEFT, BOTTOM-31),
                        new Vector(RIGHT - 45, 31 + TOP),
                        new Vector(RIGHT - 45, BOTTOM-31),
                        new Vector(WIDTH/2, HEIGHT/2)];


