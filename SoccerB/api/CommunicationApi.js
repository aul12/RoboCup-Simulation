function CommunicationApi(){
    var callback = [0,0,0,0];

    this.robotReceiver = 0;

    this.registerReceiver = function(receiver){
        callback[this.robotReceiver] = receiver;
    };

    this.sendByte = function(byte){
        try {
            callback[this.robotReceiver](byte);
        } catch (e) {
        }
    }
}
