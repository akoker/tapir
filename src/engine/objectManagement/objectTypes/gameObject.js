"use strict";

var objectManager = require('./../objectManager.js');
var assetManager = require('./../../loader/assetManager.js');
var pixi = require('pixi.js');

module.exports = function(){

  this.createObject = function(args){
    this.name = args;
    //find corresponding loader
    var assetNameArr = args.background.split(".");

    var batch = assetManager.findBatchByName(assetNameArr[0]);

    var o = new pixi.Sprite(batch.loader.resources[assetNameArr[1]].texture);

    o = objectManager.setCommonProperties(o, args);

    return o;
  }

  return this;
}
