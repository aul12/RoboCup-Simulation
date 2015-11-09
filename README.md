#RoboCup-Simulation

A RoboCup Junior Soccer-B Simulation.

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
All methods listed below are part of the SoccerAPI class, which is predefined with the api object
###Motors
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
Shoot the ball if in the dribbler
###Sensors

```javascript
api.ballAngle()
```  
Get the angle of the robot to the ball

___

```javascript
api.ballDistance()
```  
Get the distance of the robot to the ball

___

```javascript
api.ballInDribbler()
```  
Returns a true if the ball is in the dribbler

___

```javascript
api.onLine()
```  
Check if the robot is on the line

___

```javascript
api.lineAngle()
```  
Returns the angle of the line under the robot

___

```javascript
api.distance(direction)
```  
Returns the distance to the wall in the given direction Directions can be:   
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
###Configuration
```javascript
api.degree
``` 
Change the angle unit by setting api.degree to one of the following values:   
```javascript
Angle.DEGREE
```   
```javascript
Angle.RADIAN
``` 