"use strict";

var objectManager = require('./../objectManager.js');

var pixi = require('pixi.js');
module.exports = function(){

  this.createObject = function(args){
    var o = new pixi.Container();
    o = objectManager.setCommonProperties(o, args);

    return o;
  }
  
  return this;
}
