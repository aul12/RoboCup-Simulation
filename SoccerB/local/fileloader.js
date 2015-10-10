function handleProgramFileSelect(evt)
{
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob)
    {

        var files = evt.target.files[0]; // FileList object

        var reader = new FileReader(files);
        reader.onload = function(e) {
            var contents = e.target.result;
            var hr = new XMLHttpRequest();
            var url = "main.js";

            hr.open("POST", url, true);
            hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            hr.onreadystatechange = function() {
                if(hr.readyState == 4 && hr.status == 200) {
                    var return_data = hr.responseText;
                    console.log(return_data);
                }
            };
            hr.send("P:"+contents);
        };
        reader.readAsText(files);


    }
    else
    {
        alert('The File APIs are not fully supported in this browser.');
    }
}

function handleAliasFileSelect(evt)
{
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob)
    {

        var files = evt.target.files[0]; // FileList object

        var reader = new FileReader(files);
        reader.onload = function(e) {
            var contents = e.target.result;
            var hr = new XMLHttpRequest();
            var url = "main.js";

            hr.open("POST", url, true);
            hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            hr.onreadystatechange = function() {
                if(hr.readyState == 4 && hr.status == 200) {
                    var return_data = hr.responseText;
                    console.log(return_data);
                }
            };
            hr.send("A:"+contents);
        };
        reader.readAsText(files);


    }
    else
    {
        alert('The File APIs are not fully supported in this browser.');
    }
}

document.getElementById('programFile').addEventListener('change', handleProgramFileSelect, false);
document.getElementById('aliasFile').addEventListener('change', handleAliasFileSelect, false);