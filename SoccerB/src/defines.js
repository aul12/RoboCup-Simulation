var ROBOT_ENABLE = [true, true, true, true];

const MAX_SPEED = 0.02;
const SHOOT_POWER = 0.008;

const SCALE = 399;

const WIDTH = 2.44;
const HEIGHT = 1.82;

const OUT_DISTANCE = 0.30;
const LEFT = OUT_DISTANCE;
const RIGHT = WIDTH - OUT_DISTANCE;
const TOP = OUT_DISTANCE;
const BOTTOM = HEIGHT - OUT_DISTANCE;

const PENALTY_AREA_WIDTH = 0.30;
const PENALTY_AREA_HEIGHT  = 0.90;
const GOAL_TOP = 0.61;
const GOAL_BOTTOM = HEIGHT - 0.61;

const NEUTRAL_POINT= [  new Vector(0.45 + LEFT, 0.31 + TOP),
                        new Vector(0.45 + LEFT, BOTTOM-0.31),
                        new Vector(RIGHT - 0.45, 0.31 + TOP),
                        new Vector(RIGHT - 0.45, BOTTOM-0.31),
                        new Vector(WIDTH/2, HEIGHT/2)];

const GRAVITY_CONSTANT = 9.81;


