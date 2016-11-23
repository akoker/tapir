"use strict";

var pixi = require('pixi.js');
var main = require('./../../');

var objectTypes = require('./objectTypes');

var dynamicTypes = objectTypes.dynamicTypes;
var gameObject = objectTypes.gameObject;
var container = objectTypes.container;
var button = objectTypes.button;
var textObject = objectTypes.textObject;
var animation = objectTypes.animation;

var assetManager =  require('./../loader/assetManager.js');
var manipulator = require('./../common/manipulations');

var objectManager = exports;

objectManager.objectBatch = [];

objectManager.setCommonProperties = function(o, args){
  //console.log("o: " + o + " args.name: " + args.name);

  args.name != null ? o.name = args.name : o.name = "";
  args.x != null ? o.position.x = args.x : o.position.x = 0;
  args.y != null ? o.position.y = args.y : o.position.y = 0;
  args.visible != null ? o.visible = args.visible : o.visible = true;
  args.tag != null ? o.tag = args.tag : o.tag = "none";
  args.interactive != null ? o.interactive = args.interactive : o.interactive = true;
  if(args.width != null) o.width = args.width;
  if(args.height != null) o.height = args.height;
  if(args.states != null) o.states = args.states;
  args.buttonMode != null ? o.buttonMode = args.buttonMode : o.buttonMode = false;

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

  /*o.setProperty = function(args){
    args.foreach(e => {
      o[e.property] = e.value;
    })
  }*/

  o.executeFunction = function(name, args){
    o[name](args);
  }

  o.background = function(assetID){
    o.texture = assetManager.loader.resources[assetID].texture;
  }

  o.setProperty = function(args){
    //processes every key in the properties list and applies them to the object
    Object.keys(args).forEach(key => {
      //property set also can be defined as function such as "background"
      //where displayObject texture has to be changed and applied
      if(o[key].constructor === Function)
        o.executeFunction(key, args[key]);
      else
        //or it's a property to set.
        o[key] = args[key];
    });
  }

  o.setObjectProperty = function(args){
  //console.log("setting object property " + objToSet.displayObject.name);
    if(args.target != "this"){
      var objToSet = objectManager.getObjectByName(args.target);
      objToSet.displayObject.setProperty(args.props);
    }
    else{
      var objToSet = objectManager.getObjectByName(o.name);
      o.setProperty(args.props);
    }
  }

  o.processState = function(args){
    if(args.constructor !== Array){
      Object.keys(args).forEach(key => {
        if(key != "state" && o[key].constructor === Function){
          o.executeFunction(key, args[key]);
        }else if(key == "state")
          o.setState(args[key]);
        else
          o[key] = args[key];
      });
    }
    else{
      args.forEach(elm => {
        Object.keys(elm).forEach(key => {
          if(key != "state" && o[key].constructor === Function){
            o.executeFunction(key, elm[key]);
          }else if(key == "state")
            o.setState(elm[key]);
          else
            o[key] = elm[key];
        });
      })
    }
  }

  o.setState = function(stateName){
    var args = o.states[stateName];
    o.processState(args);
  }

  o.executeDynamicCode = function(funcData){

    //determine if code in json file is written multi-line or single-line
    var codePart;
    if(funcData.code.constructor === Array){
      codePart = funcData.code.join(" ");
    }else {
      codePart = funcData.code;
    }

    var f = Function(codePart);
    f();
  }

  o.registerDynamicFunction = function(funcData){
    //determine if code in json file is written multi-line or single-line
    var codePart;
    if(funcData.code.constructor === Array){
      codePart = funcData.code.join(" ");
    }else {
      codePart = funcData.code;
    }

    let f = Function(...funcData.args, codePart);

    gameManager[funcData.functionName] = f;
  }

  o.executeDynamicFunction = function(funcData){
    let f = gameManager[funcData.functionName];
    f(...funcData.args);
  }
  return o;
}

objectManager.processProperty = function(o){

}

objectManager.createObject = function(args){
  //console.log("inisde createobject in object manager")
  switch (args.type) {
    case "object":
      //console.log("game object");
      return new gameObject().createObject(args);
    case "animation":
      //console.log("game object");
      return new animation().createObject(args);
    case "container":
      //console.log("container object");
      return new container().createObject(args);
    case "button":
      //console.log("button object");
      return  new button().createObject(args);
    case "textObject":
      //console.log("text object");
      return new textObject().createObject(args);
    case "dynamicObject":
      //console.log("dynamic object");
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

objectManager.registerFunctionToObject = function(objectName, functionName, f){
  var o = objectManager.getObjectByName(objectName);
  o[functionName] = f;
}

objectManager.registerFunction = function(functionName, f){
  objectManager[functionName] = f;
}

//TO-DO
objectManager.broadcastMessage = function(o, args){

}
