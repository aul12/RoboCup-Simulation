# RoboCup-Simulation

A RoboCup Junior Soccer-B Simulation.

[http://bodenseehaie.bplaced.de/](http://bodenseehaie.bplaced.de/)

## Known issues
See [https://github.com/aul12/RoboCup-Simulation/issues](https://github.com/aul12/RoboCup-Simulation/issues) for the full list of bugs and enhancements.

## Dependencies
* [http://electron.atom.io/](http://electron.atom.io/)
* [https://www.npmjs.com/package/electron-packager](https://www.npmjs.com/package/electron-packager)

## Installation (for building yourself)
### Linux
```
sudo apt-get install nodejs

sudo apt-get install npm

sudo npm install electron-prebuilt -g

sudo npm install electron-packager -g

```

### Windows
Install node.js and npm using the Installer ([http://www.nodejs.org](http://www.nodejs.org))
```
npm install electron-prebuilt -g

npm install electron-packager -g
```

## Run it (without compiling)
In the root directory of the repository run:
```bash
electron SoccerB
```

## Compiling
In the root directory of the repository run:
```bash
electron-packager SoccerB RoboCup-Simulation --platform=[linux/win32/darwin] --arch=[ia32/x64] --version=0.34.1
```
to minify the program before compiling add 
```bash
--asar
``` 

## Keyboard Shortcuts
<kbd>0</kbd> Toggle Robot 0

<kbd>1</kbd> Toggle Robot 1

<kbd>2</kbd> Toggle Robot 2

<kbd>3</kbd> Toggle Robot 3

<kbd>s</kbd> Start the game

<kbd>p</kbd> Pause the game

<kbd>r</kbd> Reset the game

<kbd>c</kbd>, <kbd>v</kbd>, <kbd>b</kbd>, <kbd>n</kbd>, <kbd>m</kbd> Set the ball to one of the neutral points

## Writing your own logic for the robots
You have to write your own logic for the robots. Do this by editing the right function in the ```program```
folder (logic for both teams are divided in ```teamLeft.js``` and ```teamRight.js```). Please don't use any loops in the function, it is called regularly by the 
event handler.

#### Template
```javascript
//Program of the goalie on the right side
function goalieRight()
{
    if(api.onLine()){
        api.move(api.lineAngle()+180 , SPEED);
    }else{
        api.setDribbler(false);
        var ballAngle=api.ballAngle();
        if(api.distance(api.distance.BACK)>(60+LEFT))
            ballAngle = 180;
        else if(ballAngle>180||ballAngle<0)
            ballAngle=270;
        else
            ballAngle=90;
        api.move(ballAngle, SPEED);

        if(api.ballInDribbler())
            api.shoot();
    }
}

//Program for the Striker on the right side
function strikerRight() {
    if (api.onLine()) {
        api.move(api.lineAngle() + 180, SPEED);
    }else {
        var angle = api.ballAngle();
        if (angle > 180)
            angle -= 360;
        if (api.ballInDribbler()) {
            angle = 0;
            if (Math.abs(api.distance(api.distance.LEFT) - api.distance(api.distance.RIGHT)) < 60) {
                api.setDribbler(false);
                api.shoot();
            }
            else {
                api.setDribbler(true);
            }
        }
        else{
            if (Math.abs(angle) > 90)
                angle = 180 - (Math.atan(3 / (api.ballDistanceCM())) * 180 / Math.PI);
            else if (Math.abs(angle) > 60)
                angle *= 2;
            else
                angle *= 2;
        }
        api.move(angle, SPEED);
    }
}
```  

### Alias file
To get the full compatibility with your real robot program there is the ```program/alias.js``` file. It is used to populate all global variables and provide a layer between the Soccer-API and your API.

There are to main procedures which you can (and should) use. The first is ```setAlias``` which is called every time before your logic is being executed and can be used to to set the values of your variables to the appropriate values of the API.
The second procedure is ```getAlias``` which is used to give the values of your logic back to the Soccer-API.

#### Example
```javascript
//Some global variables which you need in your logic
var ballAngle;
var dribblerPower;

const SPEED_BALL = 80;

//This function is called when the simulation has loaded
function initAlias(){
    //Some defines which are used in your program
    var defines = "#define DEBUG true\n"+

    //Load the original C++ code of your robot (see the Chapter "Loaders" for more informations)
    loadFile("SoccerB/program/originalCode.cpp", "SoccerB/program/teamLeft.js" , defines);
}

//This function is called before your logic
function setAlias(){
	ballAngle = api.ballAngle();
}

//This function is called after your logic
function  getAlias(){
    api.setDribbler(dribblerPower);
}

//A wrapper for an Soccer-Api function
function driveRobot(angle, speed){
	speed = speed/255 * SPEED;
	api.move(angle, speed);
}

//Call functions of you logic
function goalieLeft(){
	defense();
}

function strikerLeft(){
    striker();
}

```

### Loaders
Loaders are used to translate the syntax of the language of your robot program to javascript. 
#### C++ Loader
The C++ loader can load C and C++ code and translate it into javascript code. It uses the C++ preprocessor and can thus handle real preprocessor statements in your code.

##### Example
```javascript
loadFile("SoccerB/program/originalCode.cpp", "SoccerB/program/teamLeft.js" , "#define DEBUG true");
```


## API-Reference
All methods listed below are part of the SoccerAPI class, which is predefined with the api object.
### Outputs
```javascript
api.move(angle,speed);
```

Move the robot in a specified angle with a specified speed (robot will keep this speed until there is a new speed)

___

```javascript
api.moveToXY(xPos, yPos);
```  
Let the robot drive to a specified position, speed is regulated by a proportional-controller.

___

```javascript
api.setDribbler(power);
```  
Enable/Disable the dribbler (power is a boolean)

___

```javascript
api.shoot();
```  
Shoot the ball if it is in the dribbler. If there is no ball nothing will happen.

___

```javascript
api.rotate(angle);
```  
Rotate the robot with a certain speed. Positive speed values are clockwise, negative counter clockwise rotation.
### Sensors

```javascript
api.ballAngle();
```  
Get the angle of the robot to the ball. Unit depends on configuration.

___

```javascript
api.ballIntensity();
```  
Get the intensity of the ball. Comparable to a real analog IR-Sensor (aka TSOP). Maximum value is about 5000, to a minimum of 0 at about 150 cm from the robot.

___

```javascript
api.ballDistance();
```  
Get the distance in meters of the robot to the ball. Distance is from the border of the robot to the border of the ball. This means if the robot touches the ball the distance is zero.

___ 

```javascript
api.ballInDribbler();
```  
Returns a true if the ball is in the dribbler (doesn't require the dribbler to be enabled)

___

```javascript
api.onLine();
```  
Check if the robot is on the line, returns true or false.

___

```javascript
api.lineAngle();
```  
Returns the angle of the line under the robot. If the robot is on the line on the front it will return 0.

___

```javascript
api.distanceToWall(direction);
```  
Returns the distance to the wall in the given direction.

___

```javascript
api.realDistance(direction);
```  
Returns the distance in the given direction with influences like the goal (other robots aren't calculated yet).

___

```javascript
api.goalAngle();
```  
Get the angle to the middle of the opponents goal (absolute value).

___

```javascript
api.currentRotation();
```  
Returns the orientation of the robot (unit depends on configuration). Clockwise means positive, negative counterclockwise values. This means that there is a jump at +/-180 degrees.

___

```javascript
api.rotationVelocity();
```  
Returns the current angular velocity of the robot (rotation around the z-Axis). Comparable to a gyro sensor.

### Constants

Directions (for ```distanceToWall``` and ```realDistance```) can be:   
```javascript
api.distance.FRONT
```  
```javascript
api.distance.RIGHT
```  
```javascript
api.distance.BACK
```  
```javascript
api.distance.LEFT
```  

### Configuration
```javascript
api.degree
``` 
Change the angle unit by setting api.degree to one of the following values (default is Angle.DEGREE):   
```javascript
Angle.DEGREE
```   
```javascript
Angle.RADIAN
``` 
