var server = exports;
var slot = require('./../slot.js');
server.name = "game server";
server.earnings = 0;
server.wallet = 20045;
server.coinValue = 5;
server.spinValue = 0;
server.selectedLines = 9;
server.numberOfLines = 9;



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

server.coinValues=[1, 5, 10, 20, 50];
server.currentCoinValueIndex = 1;

server.randomizeSpin = function (){
    server.spinData = new Array();
    //console.log('Generating spin data');
    for(var i = 0; i < server.noOfReels; i++){
        server.spinData.push(Math.floor((Math.random() * (100)) + 0));
    }
    console.log("new spin indexes: " + server.spinData[0] + " " + server.spinData[1] + " " + server.spinData[2] + " " + server.spinData[3] + " " + server.spinData[4] + " ")
    server.spinValue = server.selectedLines * server.coinValue;
    server.wallet -= server.spinValue;
    return server.spinData;
}

server.randomizeReels = function (rSize){
    server.noOfReels = 5;//slot.gameData.settings.numberOfReels;
    server.reelSize = 20;//slot.gameData.settings.reelItemSize;
    server.reels = new Array();
    server.spinData = new Array();
    server.numberOfSymbolAssets = 9;//slot.gameData.settings.totalNumberOfSymbols;
    //console.log('Generating reel data');
    for(var i = 0; i < server.noOfReels; i++){
        var rl =new Array();
        for(var j = 0; j < rSize; j++){
          let v = Math.floor((Math.random() * (server.numberOfSymbolAssets - 2)) + 0);
          //console.log(v);
          rl.push(Math.floor((Math.random() * (server.numberOfSymbolAssets - v)) + 0));
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
    if(winLines[0] != null)
      server.earnings = server.coinValue * Math.floor((Math.random() * (20 * winLines.length) + 10));
    else
      server.earnings = 0;
    console.log("earnings: " + server.earnings);
    return winLines;
}

server.decreaseCoinValue = function(){
  if(server.currentCoinValueIndex > 0){
    server.currentCoinValueIndex--;
      console.log("dec");
    server.coinValue = server.coinValues[server.currentCoinValueIndex];
    server.spinValue = server.coinValue * server.selectedLines;
  }
  let ret = new Object();
  ret.spinValue = server.spinValue;
  ret.coinValue = server.coinValue;
  console.log(ret);
  return ret;
}

server.increaseCoinValue = function(){
  if(server.currentCoinValueIndex < server.coinValues.length-1){
    server.currentCoinValueIndex++;
    server.coinValue = server.coinValues[server.currentCoinValueIndex];
    server.spinValue = server.coinValue * server.selectedLines;
  }
  let ret = new Object();
  ret.spinValue = server.spinValue;
  ret.coinValue = server.coinValue;
  console.log(ret);
  return ret;
}

server.increaseNumberOfLines = function(){
  if(server.selectedLines < server.numberOfLines){
    server.selectedLines++;
    server.spinValue = server.selectedLines * server.coinValue;
  }
  var ret = new Object();
  ret.spinValue = server.spinValue;
  ret.selectedLines = server.selectedLines;
  return ret;
}

server.decreaseNumberOfLines = function(){
  if(server.selectedLines > 1){
    server.selectedLines--;
    server.spinValue = server.selectedLines * server.coinValue;
  }
  var ret = new Object();
  ret.spinValue = server.spinValue;
  ret.selectedLines = server.selectedLines;
  return ret;
}

server.setNumberOfLines = function(val){
  server.selectedLines = val;
  server.spinValue = server.selectedLines * server.coinValue;
  var ret = new Object();
  ret.spinValue = server.spinValue;
  ret.selectedLines = server.selectedLines;
  return ret;
}

server.updateWallet = function(){
  server.wallet += server.earnings;
}
