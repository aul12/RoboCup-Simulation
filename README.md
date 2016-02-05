#RoboCup-Simulation

A RoboCup Junior Soccer-B Simulation.

[http://bodenseehaie.bplaced.de/](http://bodenseehaie.bplaced.de/)

##Known issues
* Multiple defence and pushing aren't detected properly

##Dependencies
* [http://electron.atom.io/](http://electron.atom.io/)
* [https://www.npmjs.com/package/electron-packager](https://www.npmjs.com/package/electron-packager)

##Installation (for building yourself)
### Linux
```
sudo apt-get install nodejs

sudo apt-get install npm

sudo npm install electron-prebuilt -g

sudo npm install electron-packager -g

```

### Windows
Install node.js and npm using the [Installer](http://www.nodejs.org)
```
npm install electron-prebuilt -g
npm install electron-packager -g
```

##Run it (without compiling):
```
electron .
```

##Compiling
```
electron-packager . RoboCup-Simulation --platform=[linux/win32/darwin] --arch=[ia32/x64] --version=0.34.1
```
to minify the program before compiling add 
```
--asar
``` 


##Usage
The Simulation runs on a node.js based server. To start execute 

```
node main.js
```

in the SoccerB/server folder. It will tell you the IP and the port of the webserver.

##Writing your own logic for the robots
All the robots can be programmed with your own logic. Do this by editing the right function in the /SoccerB/local/program
folder (logic for both teams are divided). Please don't use any loops in the function, it is called regularly by the 
event handler.

##API-Reference
All methods listed below are part of the SoccerAPI class, which is predefined with the api object.
###Outputs
```javascript
api.move(angle,speed);
```  
Move the robot in a specified angle with a specified speed (robot will keep this speed until there is a new speed)

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
###Sensors

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
api.ballDistanceCM();
```  
Get the distance in centimeters of the robot to the ball. Distance is from the border of the robot to the border of the ball. This means if the robot touches the ball the distance is zero.

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
api.distance(direction);
```  
Returns the distance to the wall in the given direction Directions can be, robots aren't calculated at the moment:   
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

___

```javascript
api.currentRotation();
```  
Returns the orientation of the robot (unit depends on configuration). Clockwise means positive, negative counterclockwise values. This means that there is a jump at +/-180 degrees.

###Configuration
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
