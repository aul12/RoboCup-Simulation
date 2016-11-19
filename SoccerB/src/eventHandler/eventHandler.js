$(document).ready(function(){
    start();

    $(document).keypress(function( event ) {
        if ( event.which == 13 ) {
            event.preventDefault();
        }

        switch(event.keyCode){
            case 48:
                ROBOT_ENABLE[0] = !ROBOT_ENABLE[0];
                $('#enable0').prop('checked', ROBOT_ENABLE[0]);
                draw();
                break;
            case 49:
                ROBOT_ENABLE[1] = !ROBOT_ENABLE[1];
                $('#enable1').prop('checked', ROBOT_ENABLE[1]);
                draw();
                break;
            case 50:
                ROBOT_ENABLE[2] = !ROBOT_ENABLE[2];
                $('#enable2').prop('checked', ROBOT_ENABLE[2]);
                draw();
                break;
            case 51:
                ROBOT_ENABLE[3] = !ROBOT_ENABLE[3];
                $('#enable3').prop('checked', ROBOT_ENABLE[3]);
                draw();
                break;
            case 115:   //s
            case 112:   //p
                timerInit();
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

    $('input:checkbox').change(function(){
        ROBOT_ENABLE[0] = $('#enable0').is(':checked');
        ROBOT_ENABLE[1] = $('#enable1').is(':checked');
        ROBOT_ENABLE[2] = $('#enable2').is(':checked');
        ROBOT_ENABLE[3] = $('#enable3').is(':checked');
    });

    ROBOT_ENABLE[0] = $('#enable0').is(':checked');
    ROBOT_ENABLE[1] = $('#enable1').is(':checked');
    ROBOT_ENABLE[2] = $('#enable2').is(':checked');
    ROBOT_ENABLE[3] = $('#enable3').is(':checked');

    initAlias();
});


function start()
{
    robot[0] = new GameObject(0.20+LEFT, HEIGHT/2, ROBOT_SIZE);
    robot[1] = new GameObject((WIDTH/2)-0.40, HEIGHT/2, ROBOT_SIZE);
    robot[2] = new GameObject((WIDTH/2)+0.40, HEIGHT/2, ROBOT_SIZE);
    robot[3] = new GameObject(RIGHT-0.20, HEIGHT/2, ROBOT_SIZE);

    ball.x = WIDTH /2;
    ball.y = HEIGHT /2;
    ball.v.x = 0;
    ball.v.y = 0;

    forEveryRobot(function(robot_counter){
        robot[robot_counter].v.x = 0;
        robot[robot_counter].v.y = 0;
        robot[robot_counter].a.x = 0;
        robot[robot_counter].a.y = 0;
    });

    lackOfProgressCounter = 0;


    if(!renderRunning)
        setTimeout(render, 100);
}

function resetButton(){
    start();
    draw();
    goalsTeam1 = goalsTeam2= 0;
    $("#status").html(goals_team2+" : "+goals_team1);
}

function reloadScript(){
    loadCppFile("spiel.hpp", "SoccerB/program/teamLeft.js" , defines, function(){
        location.reload();
    });
}
