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
**The complete API is WIP at the moment**

The reference can be found in the wiki: 
[https://github.com/aul12/RoboterSimulation/wiki/API-Reference](https://github.com/aul12/RoboterSimulation/wiki/API-Reference)