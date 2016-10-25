function showAlert(message,alerttype) {

    $('#alert_placeholder').append('<div id="alertdiv" class="alert ' +  alerttype + '">'+message+'</div>');

    setTimeout(function() { // this will automatically close the alert and remove this if the download doesnt close it in 5 secs


        $("#alertdiv").remove();

    }, 5000);
}