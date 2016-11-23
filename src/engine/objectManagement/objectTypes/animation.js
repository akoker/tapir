"use strict";

var animation = exports;
var assetManager = require('./../../loader/assetManager.js');
var dataManager = require('./../../loader/dataManager.js');
var objectManager = require('./../objectManager.js');
//var slot = require('./../slot/slot.js');

module.exports = function(){
  var mc;
  this.createObject = function(args){

    var data = dataManager.getAnimDataByName(args.animRegName);
    this.name = args.name;

    var resources = gameManager.assetManager.loader.resources;
    //console.log(resources);
    var textureArray = [];
    for (let i=0; i < data.assetCount; i++)
    {
        textureArray.push(resources[data.assetPref + i].texture);
    };

    mc = new PIXI.MovieClip(textureArray);

    mc = objectManager.setCommonProperties(mc, args);
    mc = objectManager.registerActions(mc, args);
    mc = objectManager.setCommonFunctions(mc);

    args.loop != undefined ? mc.loop = args.loop : mc.loop = true;

    if(args.playDefault)
      mc.play();

    this.displayObject = mc;

    mc.completeArgs;

    mc.playAnimation = function(){
        mc.play();
    }

    mc.stopAnimation = function(){
      mc.loop = false;
      mc.stop();
    }

    mc.onAnimationComplete = function(args){
      mc.loop = false;
      mc.completeArgs = args;
    }

    var complete = function(){
      mc.processState(mc.completeArgs);
    }
    mc.onComplete = complete;

    objectManager.registerObject(this);

    return mc;
  }

  this.instantiateAnimByName = function(assetRegName, args = null){
    var data = dataManager.getAnimDataByName(assetRegName);
    this.name = name;

    var resources = gameManager.assetManager.loader.resources;
    //console.log(resources);
    var textureArray = [];
    for (let i=0; i < data.assetCount; i++)
    {
        textureArray.push(resources[data.assetPref + i].texture);
    };

    mc = new PIXI.MovieClip(textureArray);

    this.displayObject = mc;

    objectManager.registerObject(this);

    if(args != null){
      args.loop != undefined ? mc.loop = args.loop : mc.loop = true;

      if(args.playDefault)
        mc.play();
      }

    this.displayObject = mc;

    mc.completeArgs;

    mc.playAnimation = function(){
        mc.play();
    }

    mc.stopAnimation = function(){
      mc.loop = false;
      mc.stop();
    }

    mc.onAnimationComplete = function(args){
      mc.loop = false;
      mc.completeArgs = args;
    }

    var complete = function(){
      mc.processState(mc.completeArgs);
    }
    mc.onComplete = complete;


    return mc;
  }

  return this;
}
