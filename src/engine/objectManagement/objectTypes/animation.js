"use strict";

var animation = exports;
var assetManager = require('./../../loader/assetManager.js');
var dataManager = require('./../../loader/dataManager.js');
//var slot = require('./../slot/slot.js');

module.exports = function(){
  var mc;
  this.createObject = function(args){

    var data = dataManager.getAnimDataByName(args);
    console.log(data);
    this.name = args;

    var resources = gameManager.assetManager.loader.resources;
    //console.log(resources);
    var textureArray = [];
    for (let i=0; i < data.assetCount; i++)
    {
        textureArray.push(resources[data.assetPref + i].texture);
    };

    mc = new PIXI.MovieClip(textureArray);

    this. displayObject = mc;
    return mc;
  }

  this.playAnimation = function(animName){
      mc.play();
  }

  this.stopAnimation = function(){
      mc.stop();
  }

  this.gotoAndPlay = function(ind){
      mc.gotoAndPlay(ind);
  }
  return this;
}
