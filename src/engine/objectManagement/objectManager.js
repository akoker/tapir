"use strict";

var pixi = require('pixi.js');
var main = require('./../../');

console.log(main);

var objectTypes = require('./objectTypes');

var dynamicTypes = objectTypes.dynamicTypes;
var gameObject = objectTypes.gameObject;
var container = objectTypes.container;

var assetManager =  require('./../loader/assetManager.js');
var manipulator = require('./../common/manipulations');

var objectManager = exports;

objectManager.objectBatch = [];

objectManager.setCommonProperties = function(o, args){
  args.name != null ? o.name = args.name : o.name = "";
  args.x != null ? o.position.x = args.x : o.position.x = 0;
  args.y != null ? o.position.y = args.y : o.position.y = 0;
  args.visible != null ? o.visible = args.visible : o.visible = true;
  args.tag != null ? o.tag = args.tag : o.tag = "none";

  

  return o;
}

objectManager.createObject = function(args){
  switch (args.type) {
    case "object":
      return new gameObject().createObject(args);
    case "container":
      return new container().createObject(args);
    case "textObject":
      return "";
    case "dynamicObject":
      return dynamicTypes.searchDynamicTypeByName(args.dynTypeName).createObject(args);
    default:
      return new gameObject().createObject(args);
  }
}

objectManager.registerObject = function(o){
  objectManager.objectBatch.push(o);
}

objectManager.getObjectByName = function(name){
  return manipulator.searchArrayElemByName(name, objectManager.objectBatch);
}

function setObjectProperty(o, p, v){
  o[p] = v;
}
