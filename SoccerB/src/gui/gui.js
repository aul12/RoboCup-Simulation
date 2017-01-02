var Gui = {
    init: function () {
        ROBOT_ENABLE[0] = $('#enable0').is(':checked');
        ROBOT_ENABLE[1] = $('#enable1').is(':checked');
        ROBOT_ENABLE[2] = $('#enable2').is(':checked');
        ROBOT_ENABLE[3] = $('#enable3').is(':checked');

        this.updateGoals();
    },

    bindEvents: function () {
        $('input:checkbox').change(function(){
            ROBOT_ENABLE[0] = $('#enable0').is(':checked');
            ROBOT_ENABLE[1] = $('#enable1').is(':checked');
            ROBOT_ENABLE[2] = $('#enable2').is(':checked');
            ROBOT_ENABLE[3] = $('#enable3').is(':checked');
        });

        $("#btnReset").click(function(){
            init();
            Rules.goals[0] = Rules.goals[1] = 0;
        });

        $("#btnStartStop").click(function () {
            TimerManager.toggle();
        });

        $("#canvasField").click(function(event) {
            WebGlRenderer.click(event)
        });
    },

    updateGoals: function () {
        $("#status").html(goalsTeam1+" : 0"+goalsTeam2);
    },

    updateStartButton: function (running) {
        $("#startBtn").html(running?"Pause":"Start");
    },

    alertSucces: function (text) {
        this.showAlert(text, "alert-success");
    },

    alertWarn: function (text) {
        this.showAlert(text, "alert-warn");
    },

    alertDanger: function (text) {
        this.showAlert(text, "alert-danger");
    },

    showAlert: function (text, alertType) {
        $('#alert_placeholder').append('<div id="alertdiv" class="alert '+alertType+'">'+text+'</div>');

        setTimeout(function(){
            $("#alertdiv").remove();
        }, 5000);
    }
};