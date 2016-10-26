"use strict";

var pixi = require('pixi.js');
var main = require('./../../');

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
  if(args.width != null) o.width = args.width;
  if(args.height != null) o.height = args.height;
  if(args.states != null) o.states = args.states;
  o.interactive = true;
  args.buttonMode != null ? o.buttonMode = args.buttonMode : o.buttonMode = false;

  o = objectManager.setCommonFunctions(o);

  o = objectManager.registerActions(o, args);

  if(args.state != null)o.setState(args.state);

  return o;
}

objectManager.registerActions = function(o, args){

  if(args.actions!=null){
    if(args.actions.mouseDown != null){
      o.mousedown = function(){
        o.processState(args.actions.mouseDown);
      }
    }
    if(args.actions.mouseUp != null){
      o.mouseup = function(){
        o.processState(args.actions.mouseUp)
      }
    }
    if(args.actions.mouseOver != null){
      o.mouseover = function(){
        o.processState(args.actions.mouseOver)
      }
    }
    if(args.actions.mouseOut != null){
      o.mouseout = function(){
        o.processState(args.actions.mouseOut)
      }
    }
    if(args.actions.click != null){
      o.click = function(){
        o.processState(args.actions.click)
      }
    }
    if(args.actions.touchStart != null){
      o.touchstart = function(){
        o.processState(args.actions.touchstart)
      }
    }
    if(args.actions.touchEnd != null){
      o.touchend = function(){
        o.processState(args.actions.touchend)
      }
    }
    if(args.actions.tap != null){
      o.tap = function(){
        o.processState(args.actions.tap)
      }
    }
    if(args.actions.mouseUpOutside != null){
      o.mouseupoutside = function(mouseData){
        o.mouseData = mouseData;
        o.processState(args.actions.mouseUpOutside)
      }
    }
    if(args.actions.mouseMove != null){
      o.mousemove = function(mouseData){
        o.mouseData = mouseData;
        o.processState(args.actions.mouseMove)
      }
    }
    if(args.actions.touchEndOutside != null){
      o.touchendoutside = function(mouseData){
        o.mouseData = mouseData;
        o.processState(args.actions.touchEndOutside)
      }
    }
    if(args.actions.touchMove != null){
      o.touchmove = function(mouseData){
        o.mouseData = mouseData;
        o.processState(args.actions.touchMove)
      }
    }
  }
  return o;
}

objectManager.setCommonFunctions = function(o){

  o.setProperty = function(args){
    args.foreach(e => {
      o[e.property] = e.value;
    })
  }

  o.executeFunction = function(name, args){
    o[name](args);
  }

  o.background = function(assetID){
    var assetNameArr = assetID.split(".");
    var batch = assetManager.findBatchByName(assetNameArr[0]);

    o.texture = batch.loader.resources[assetNameArr[1]].texture;
  }

  o.setProperty = function(args){
    //list of properties to set
    var propNames = args;

    //processes every key in the properties list and applies them to the object
    Object.keys(propNames).forEach(key => {
      //property set also can be defined as function such as "background"
      //where displayObject texture has to be changed and applied
      if(o[key].constructor === Function)
        o.executeFunction(key, propNames[key]);
      else
        //or it's a property to set.
        o[key] = propNames[key];
    });
  }

  o.setObjectProperty = function(args){
    var objToSet = objectManager.getObjectByName(args.target);
    objToSet.displayObject.setProperty(args.props);
  }

  o.processState = function(args){
    Object.keys(args).forEach(key => {
      if(key != "state" && o[key].constructor === Function){
        o.executeFunction(key, args[key]);
      }else if(key == "state")
        o.setState(args[key]);
      else
        o[key] = args[key];
    });
  }

  o.setState = function(stateName){
    var args = o.states[stateName];
    o.processState(args);
  }

  return o;
}

objectManager.processProperty = function(o){

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
  let v = manipulator.searchArrayElemByName(name, objectManager.objectBatch);
  return v;
}

//TO-DO
objectManager.broadcastMessage = function(o, args){

}
