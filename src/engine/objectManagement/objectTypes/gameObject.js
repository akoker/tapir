"use strict";

var objectManager = require('./../objectManager.js');
var assetManager = require('./../../loader/assetManager.js');
var pixi = require('pixi.js');

module.exports = function(){

  this.createObject = function(args){
    this.name = args.name;
    //find corresponding loader

    //var batch = assetManager.findBatchByName(assetNameArr[0]);

    var texture = assetManager.loader.resources[args.background].texture;
    //console.log("creating " + args.name + "bg: " + assetNameArr[1] + " texture: " + texture);

    var o = new pixi.Sprite(texture);

    o = objectManager.setCommonProperties(o, args);

    o = objectManager.setCommonFunctions(o);

    o = objectManager.registerActions(o, args);

    o.parentObj = this;

    this.displayObject = o;

    objectManager.registerObject(this);

    return o;
  }

  return this;
}
