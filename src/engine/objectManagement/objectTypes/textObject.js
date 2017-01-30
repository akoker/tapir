"use strict";

var objectManager = require('./../objectManager.js');

var pixi = require('pixi.js');
module.exports = function(){
  this.createObject = function(args){
    //console.log(args);
    this.name = args.name;
    var fFamily;
    args.props.fontFamily == null ? fFamily = 'Arial' : fFamily = args.props.fontFamily;
    var fSize;
    args.props.fontSize == null ? fSize = 20 : fSize = args.props.fontSize;
    var fFill;
    args.props.fill == null ? fFill = 0xffffff : fFill = args.props.fill;
    var style = {fontFamily : fFamily, fontSize: fSize, fill : fFill}
    var text = new PIXI.Text(args.content, style);
    if(args.props.width != undefined)text.textWidth = args.props.width;
    if(args.props.height != undefined)text.textHeight = args.props.height;

    switch(args.props.align){
      case "center":
        text.anchor.set(0.5,0.5);
        break;
      case "left":
        text.anchor.set(0,0.5);
        break;
      case "right":
        text.anchor.set(1,0.5);
        break;
      default:
        text.anchor.set(0,0.5);
        break;
    }
    text.name = args.name;

    args.x == null ? text.position.x = 0 : text.position.x = args.x;
    args.y == null ? text.position.y = 0 : text.position.y = args.y;
    args.visible == null ? text.visible = true : text.visible = args.visible;

    text.setProperty = function(args){
      args.foreach(e => {
        text[e.property] = e.value;
      })
    }

    text.executeFunction = function(name, args){
      text[name](args);
    }

    text.background = function(assetID){
      /*var assetNameArr = assetID.split(".");
      var batch = assetManager.findBatchByName(assetNameArr[0]);

      text.texture = batch.loader.resources[assetNameArr[1]].texture;*/
    }

    text.content = function(txt){
      text.text = txt;
    }

    text.setProperty = function(args){
      //processes every key in the properties list and applies them to the object
      Object.keys(args).forEach(key => {
        //property set also can be defined as function such as "background"
        //where displayObject texture has to be changed and applied
        if(text[key].constructor === Function)
          text.executeFunction(key, args[key]);
        else
          //or it's a property to set.
          text[key] = args[key];
      });
    }

    text.setObjectProperty = function(args){
      var objToSet = objectManager.getObjectByName(args.target);
      objToSet.displayObject.setProperty(args.props);
    }

    text.processState = function(args){
      if(args.constructor !== Array){
        Object.keys(args).forEach(key => {
          if(key != "state" && text[key].constructor === Function){
            text.executeFunction(key, args[key]);
          }else if(key == "state")
            text.setState(args[key]);
          else
            text[key] = args[key];
        });
      }
      else{
        args.forEach(elm => {
          Object.keys(elm).forEach(key => {
            if(key != "state" && text[key].constructor === Function){
              text.executeFunction(key, elm[key]);
            }else if(key == "state")
              text.setState(elm[key]);
            else
              text[key] = elm[key];
          });
        })
      }
    }

    text.setState = function(stateName){
      var args = text.states[stateName];
      text.processState(args);
    }

    text.executeDynamicCode = function(funcData){

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

    text.registerDynamicFunction = function(funcData){
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

    text.executeDynamicFunction = function(funcData){
      let f = gameManager[funcData.functionName];
      f(...funcData.args);
    }

    this.displayObject = text;

    objectManager.registerObject(this);

    return text;
  }

  return this;
}
