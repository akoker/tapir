"use strict";

var objectManager = require('./../objectManager.js');

var pixi = require('pixi.js');
module.exports = function(){

  this.createObject = function(args){
    this.name = args.name;
    var o = new pixi.Container(true);
    o = objectManager.setCommonProperties(o, args);

    this.displayObject = o;
    objectManager.registerObject(this);

    return o;
  }

  return this;
}
