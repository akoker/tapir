var server = exports;
var slot = require('./../slot.js');
server.name = "game server";



//winning lines
server.p = [
    [2,2,1,2,2],
    [0,0,1,0,0],
    [1,2,2,2,1],
    [2,1,1,1,2],
    [0,0,0,0,0],
    [1,1,1,1,1],
    [2,2,2,2,2],
    [2,1,0,1,2],
    [0,1,2,1,0]
]

server.randomizeSpin = function (){
    server.spinData = new Array();
    //console.log('Generating spin data');
    for(var i = 0; i < server.noOfReels; i++){
        server.spinData.push(Math.floor((Math.random() * (100)) + 0));
    }
    console.log("new spin indexes: " + server.spinData[0] + " " + server.spinData[1] + " " + server.spinData[2] + " " + server.spinData[3] + " " + server.spinData[4] + " ")
    return server.spinData;
}

server.randomizeReels = function (rSize){
    server.noOfReels = 5;//slot.gameData.settings.numberOfReels;
    server.reelSize = 20;//slot.gameData.settings.reelItemSize;
    server.reels = new Array();
    server.spinData = new Array();
    server.numberOfSymbolAssets = 9;//slot.gameData.settings.totalNumberOfSymbols;
    //console.log('Generating reel data');
    reels = new Array();
    for(var i = 0; i < server.noOfReels; i++){
        var rl =new Array();
        for(var j = 0; j < rSize; j++){
            rl.push(Math.floor((Math.random() * (server.numberOfSymbolAssets)) + 0));
        }
        server.reels.push(rl);
    }
    return server.reels;
}

server.checkWin = function(activeLines){
    var winLines = [];
    for(var i = 0; i < activeLines; i++){
        var ctr = 1;
        var first = server.reels[0][(server.spinData[0] + server.p[i][0])];
        for(var j = 1; j<server.noOfReels; j++){
            if(first == server.reels[j][(server.spinData[j] + server.p[i][j])]){
                ctr++;
            }
            else
                break;
        }
        if(ctr > 2)
            winLines.push([(i+1), ctr, first]);
    }
    return winLines;
}
