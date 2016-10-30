var PIXI = require('pixi.js');
var reelLines = exports;
var gameManager = require('./../../gameManager.js');

//list of winning lines
var p = [
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
//var p = [2,1,1,2,0];
var pArgs = new Object();
pArgs.leftPos = 260;
pArgs.rightPos = 740;
pArgs.topMargin = 124;
pArgs.symbolWidth = 144;
pArgs.symbolHeight = 144;
pArgs.reelMargin = 10;
pArgs.numberOfReels = 5;
pArgs.numberOfLines = 9;

//draw only possible line
reelLines.drawLine = function (index){
    var g = new PIXI.Graphics();
    g.lineStyle(4, 0xffd900, 1);
    var btnCont = gameManager.objectManager.getObjectByName("lineButtonContainer").displayObject;
    var name = "btnLine" + (index);
    var sP = gameManager.objectManager.getObjectByName(name).displayObject;
    g.moveTo(btnCont.x + sP.position.x + 50, btnCont.y + sP.position.y + 25);
    for(var i = 0; i < pArgs.numberOfReels; i++){
        g.lineTo(pArgs.leftPos + pArgs.reelMargin*i + i*pArgs.symbolWidth + pArgs.symbolWidth/2, pArgs.topMargin + pArgs.symbolHeight*p[index-1][i] + pArgs.symbolHeight/2);
        g.moveTo(pArgs.leftPos + pArgs.reelMargin*i + i*pArgs.symbolWidth + pArgs.symbolWidth/2, pArgs.topMargin + pArgs.symbolHeight*p[index-1][i] + pArgs.symbolHeight/2);
    }

    g.endFill();

    return g;
}

//draws winning line with squares
reelLines.drawWinningLine = function (index, count){
    console.log("drawing winning line: " + index);
    var g = new PIXI.Graphics();
    g.lineStyle(4, 0xaad900, 1);

    var btnCont = gameManager.objectManager.getObjectByName("lineButtonContainer");
    var name = "btnLine" + (index);
    var sP = gameManager.objectManager.getObjectByName(name);
    console.log("sp.y = " + sP.y);
    g.moveTo(btnCont.position.x + sP.position.x + 50, btnCont.position.y + sP.position.y + 25);
    g.lineTo(pArgs.leftPos, pArgs.topMargin + pArgs.symbolHeight*p[index][0] + pArgs.symbolHeight/2);
    for(var i = 0; i < count-1; i++){
        g.moveTo(pArgs.leftPos + pArgs.reelMargin*i + (i+1)*pArgs.symbolWidth, pArgs.topMargin + pArgs.symbolHeight*p[index][i] + pArgs.symbolHeight/2);
        g.lineTo(pArgs.leftPos + pArgs.reelMargin*i + (i+1)*pArgs.symbolWidth + pArgs.reelMargin, pArgs.topMargin + pArgs.symbolHeight*p[index][i+1] + pArgs.symbolHeight/2);
    }
    g.moveTo(pArgs.leftPos + pArgs.reelMargin*(count-1) + (count)*pArgs.symbolWidth, pArgs.topMargin + pArgs.symbolHeight*p[index][count-1] + pArgs.symbolHeight/2);
    for(i = count; i < 5; i++){
        g.lineTo(pArgs.leftPos + pArgs.reelMargin*i + i*pArgs.symbolWidth + pArgs.symbolWidth/2, pArgs.topMargin + pArgs.symbolHeight*p[index][i] + pArgs.symbolHeight/2);
        g.moveTo(pArgs.leftPos + pArgs.reelMargin*i + i*pArgs.symbolWidth + pArgs.symbolWidth/2, pArgs.topMargin + pArgs.symbolHeight*p[index][i] + pArgs.symbolHeight/2);
    }
    for(var i = 0; i < count; i++){
        g.drawRect(pArgs.leftPos + i*pArgs.symbolWidth + i*pArgs.reelMargin, p[index][i]*pArgs.symbolHeight + pArgs.topMargin, pArgs.symbolWidth, pArgs.symbolHeight);
    }


    g.endFill();
    return g;
}

reelLines.animateWinningLines = function(winArr){
    console.log("winning lines are being animated " + winArr);
    var f = winArr[0][0]-1;
    var g = winArr[0][1];
    console.log("f: " + f + " g: " + g);
    return reelLines.drawWinningLine(f,g);
}

//randomizes reel line data so that you can see it works on all conditions
function randomizeReelLines(){
    for(var i = 0; i < pArgs.numberOfReels; i++){
        p[i] = Math.floor((Math.random() * 3) + 0)
    }
    console.log("winning line: " + p[0] + " " + p[1] + " " + p[2] + " " + p[3] + " " + p[4]);
}

function normalizeIndexNumber(ind, arraySize){
    if(ind < 0){
        return Math.abs(arraySize + ind);
    }
    if(ind >= arraySize){
        return Math.abs(arraySize - ind);
    }else
        return ind;
}
