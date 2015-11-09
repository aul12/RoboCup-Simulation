var __POST = [];
var __GET = [];

function RestProto(){
    this.name = "";
    this.data = "";
}

getRestData = function (restProtoArray, key){
    for(var c=0; c<restProtoArray.length; c++){
        if(restProtoArray[c].name == key)
            return restProtoArray[c].data;
    }
};

exports._POST = function(key){
    return getRestData(__POST, key);
};

exports._GET = function(key){
    return getRestData(__GET, key);
};


exports.postHandle = function (request, callback){
    var body = "";
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        body = body.split("&");
        __POST = [];
        for(var c=0; c<body.length; c++){
            __POST.push(new RestProto());
            var tmp = body[c].split("=");
            __POST[c].name = tmp[0];
            __POST[c].data = tmp[1];
        }
        callback();
    });
    
};

exports.getHandle = function (request, callback){
    var body = "";
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        body = body.split("&");
        __GET = [0];
        for(var c=0; c<body.length; c++){
            __GET.push(new RestProto());
            var tmp = body[c].split("=");
            __GET[c].name = tmp[0];
            __GET[c].body = tmp[1];
        }
        callback();
    });
};