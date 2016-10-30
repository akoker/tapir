"use strict";

var animation = exports;
var assetManager = require('./../../loader/assetManager.js');
//var slot = require('./../slot/slot.js');

module.exports = function(){

  this.createObject = function(args){

    this.name = args.name;

    //set animation asset batch
    var animArr = slot.gameManager.assetManager.animAssets;

    var textureArray = [];

    for (var k=1; k < args.animLength+1; k++)
    {
        if(k < 10) n = args.assetName + '0';
        else n = args.assetName;

        n = n + k;
        textureArray.push(gameManager.assetManager.animArr.resources[n].texture);
    };

    var mc = new PIXI.MovieClip(textureArray);

    this.playAnimation = function(animName){

        mc.play();

        return mc;
    }

    this.stopAnimation = function(){
        mc.stop();
    }

    this.gotoAndPlay = function(ind){
        mc.gotoAndPlay(ind);
    }

    this.displayObject = mc;
  }



  return this;
}
