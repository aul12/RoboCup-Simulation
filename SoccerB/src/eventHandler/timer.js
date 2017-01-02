var Status = {
    PAUSED: 0,
    RUNNING: 1
};

var TimerManager = {
    status: Status.PAUSED,
    timerReference: 0,

    run: function () {
        this.timerReference = setInterval(this.tick,5);
        this.status = Status.RUNNING;

        Gui.updateStartButton(true);
    },

    toggle: function () {
        if(this.status == Status.RUNNING)
            this.pause();
        else
            this.run();
    },

    pause: function () {
        if(this.status == Status.RUNNING)
            clearInterval(this.timerReference);
        this.status = Status.PAUSED;

        Gui.updateStartButton(false);
    },

    tick: function () {
        forEveryRobot(function(robot_counter){
            if(robotInside[robot_counter])
            {
                Api.robotn = robot_counter;
                try{
                    setAlias();
                    switch(robot_counter)
                    {
                        case 0:
                            goalieLeft();
                            break;
                        case 1:
                            strikerLeft();
                            break;
                        case 2:
                            strikerRight();
                            break;
                        case 3:
                            goalieRight();
                            break;
                    }
                    getAlias();
                }catch(e){
                    console.warn("Error: "+e+" for robot "+robot_counter);
                }
            }
            else
            {
                if(++Rules.robotOutTimer[robot_counter]>=200)
                {
                    robotInside[robot_counter]=true;
                    robot[robot_counter].x = (WIDTH/2);
                    robot[robot_counter].y = (HEIGHT/2);
                    Rules.robotOutTimer[robot_counter]=0;
                }
            }
        });

        Rules.checkAll();
        physics(5);
    }
};
