//######################Init#########################################
start();
fieldImage.src = 'res/textureField.png';
ballImage.src = 'res/textureBall.png';
robotImage.src = 'res/textureRobotTop.png';

fieldImage.onload = function(){
    ROBOT_ENABLE[0] = $('#enable0').is(':checked');
    ROBOT_ENABLE[1] = $('#enable1').is(':checked');
    ROBOT_ENABLE[2] = $('#enable2').is(':checked');
    ROBOT_ENABLE[3] = $('#enable3').is(':checked');
    draw();
};
ballImage.onload = function(){
    ROBOT_ENABLE[0] = $('#enable0').is(':checked');
    ROBOT_ENABLE[1] = $('#enable1').is(':checked');
    ROBOT_ENABLE[2] = $('#enable2').is(':checked');
    ROBOT_ENABLE[3] = $('#enable3').is(':checked');
    draw();
};
robotImage.onload = function(){
    ROBOT_ENABLE[0] = $('#enable0').is(':checked');
    ROBOT_ENABLE[1] = $('#enable1').is(':checked');
    ROBOT_ENABLE[2] = $('#enable2').is(':checked');
    ROBOT_ENABLE[3] = $('#enable3').is(':checked');
    draw();
};

$(document).ready(function(){
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
        }
    });

    $('input:checkbox').change(function(){
        ROBOT_ENABLE[0] = $('#enable0').is(':checked');
        ROBOT_ENABLE[1] = $('#enable1').is(':checked');
        ROBOT_ENABLE[2] = $('#enable2').is(':checked');
        ROBOT_ENABLE[3] = $('#enable3').is(':checked');

        draw();
    });


});




function start()
{
    robot[0] = new gameObject(20+LEFT, HEIGHT/2, ROBOT_SIZE);
    robot[1] = new gameObject((WIDTH/2)-40, HEIGHT/2, ROBOT_SIZE);
    robot[2] = new gameObject((WIDTH/2)+40, HEIGHT/2, ROBOT_SIZE);
    robot[3] = new gameObject(RIGHT-20, HEIGHT/2, ROBOT_SIZE);

    ball.x = WIDTH /2;
    ball.y = HEIGHT /2;
    ball.speed.x = 0;
    ball.speed.y = 0;

    forEveryRobot(function(robot_counter){
        robot[robot_counter].speed.x = 0;
        robot[robot_counter].speed.y = 0;
        robot[robot_counter].acceleration.x = 0;
        robot[robot_counter].acceleration.y = 0;
    });

    lackOfProgressCounter = 0;
}

function resetButton(){
    start();
    draw();
    goals_team1 = goals_team2= 0;
    $("#status").html(goals_team2+" : "+goals_team1);
}
