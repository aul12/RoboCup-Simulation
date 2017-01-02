$(document).ready(function(){
    init();

    Gui.init();
    Gui.bindEvents();

    WebGlRenderer.init();
    setTimeout(WebGlRenderer.render, 200);


    initAlias();

    $(document).keypress(function( event ) {
        if ( event.which == 13 ) {
            event.preventDefault();
        }

        switch(event.keyCode){
            case 48:
                ROBOT_ENABLE[0] = !ROBOT_ENABLE[0];
                $('#enable0').prop('checked', ROBOT_ENABLE[0]);
                break;
            case 49:
                ROBOT_ENABLE[1] = !ROBOT_ENABLE[1];
                $('#enable1').prop('checked', ROBOT_ENABLE[1]);
                break;
            case 50:
                ROBOT_ENABLE[2] = !ROBOT_ENABLE[2];
                $('#enable2').prop('checked', ROBOT_ENABLE[2]);
                break;
            case 51:
                ROBOT_ENABLE[3] = !ROBOT_ENABLE[3];
                $('#enable3').prop('checked', ROBOT_ENABLE[3]);
                break;
            case 115:   //s
            case 112:   //p
                TimerManager.toggle();
                break;
            case 114:   //r
                resetButton();
                break;
            case 99: //c
                ball.x = NEUTRAL_POINT[0].x;
                ball.y = NEUTRAL_POINT[0].y;
                ball.v.x = 0;
                ball.v.y = 0;
                break;
            case 118: //v
                ball.x = NEUTRAL_POINT[1].x;
                ball.y = NEUTRAL_POINT[1].y;
                ball.v.x = 0;
                ball.v.y = 0;
                break;
            case 98: //b
                ball.x = NEUTRAL_POINT[2].x;
                ball.y = NEUTRAL_POINT[2].y;
                ball.v.x = 0;
                ball.v.y = 0;
                break;
            case 110: //n
                ball.x = NEUTRAL_POINT[3].x;
                ball.y = NEUTRAL_POINT[3].y;
                ball.v.x = 0;
                ball.v.y = 0;
                break;
            case 109: //m
                ball.x = NEUTRAL_POINT[4].x;
                ball.y = NEUTRAL_POINT[4].y;
                ball.v.x = 0;
                ball.v.y = 0;
                break;
            default:
                break;
        }
    });
});


function init()
{
    robot[0] = new GameObject(0.20+LEFT, HEIGHT/2);
    robot[1] = new GameObject((WIDTH/2)-0.40, HEIGHT/2);
    robot[2] = new GameObject((WIDTH/2)+0.40, HEIGHT/2);
    robot[3] = new GameObject(RIGHT-0.20, HEIGHT/2);

    ball.x = WIDTH /2;
    ball.y = HEIGHT /2;
    ball.v.x = 0;
    ball.v.y = 0;
    $.get("../physicalProperties/ballProperties.json", function (data) {
        ball.props = JSON.parse(data);
    });

    forEveryRobot(function(robotCounter){
        robot[robotCounter].v.x = 0;
        robot[robotCounter].v.y = 0;
        robot[robotCounter].a.x = 0;
        robot[robotCounter].a.y = 0;

        $.get("../physicalProperties/robotProperties.json", function (data) {
             robot[robotCounter].props = JSON.parse(data);
        });
    });

    Rules.lackOfProgressCounter = 0;
}
