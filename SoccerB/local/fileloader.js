function handleProgramFileSelect(evt)
{
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob)
    {

        var files = evt.target.files[0]; // FileList object

        var reader = new FileReader(files);
        reader.onload = function(e) {
            var contents = e.target.result;

            $.post("main.js", "abc="+contents, function(data){
                console.log(data);
            });

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
            $.post("main.js", "abc="+contents, function(data){
                console.log(data);
            });
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