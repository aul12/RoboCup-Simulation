function forEveryRobot(callback){
    for(var count=0; count<4; count++){
        if(ROBOT_ENABLE[count])
            callback(count);
    }
}

function forEveryCombination(callback){
    for(var count=0; count<4; count++){
        if(ROBOT_ENABLE[count]){
            for(var count2 = count + 1; count2 < 4; count2++){
                if(ROBOT_ENABLE[count2] && count != count2)
                    callback(count, count2);
            }
        }
    }
}

function forEveryOtherRobot(number, callback){
    if(ROBOT_ENABLE[number]){
        for(var count = number + 1; count < 4; count++){
            if(ROBOT_ENABLE[count] && number != count)
                callback(count);
        }
    }
}
