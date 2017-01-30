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
    console.log("name: " + args.name);
    var propKeys = Object.keys(args);
    var displayObject;

    //set background of the object;
    if(args.background != null){
      if(args.background.substr(0,2) == "0x"){
        displayObject = new pixi.Container();
        var g = new pixi.Graphics();
        g.beginFill(0x003322);
        g.drawRect(0,0,200,200);
        g.endFill();
        displayObject.addChild(g);
      }else{
        displayObject = new pixi.Sprite(assetManager.loader.resources[args.background].texture);
      }
    }
    else
      displayObject = new pixi.Container();

    displayObject.interactive = true;

    displayObject = objectManager.setCommonFunctions(displayObject);

    displayObject = objectManager.registerActions(displayObject, args);

    propKeys.forEach(key=>{
        /*if(displayObject[key].constructor === Function){

        }*/if(key == "children" || key == "background" || key == "actions"){
          //these keys are exception to (not to)process
        }
        else if(key == "state" && args.states != null){
          //if a state is set before declaring states hierarchically on the scene file
          //first register states
          displayObject.states = args.states;
          console.log(displayObject.setState);
          displayObject.setState(args[key]);
        }
        else{
          displayObject[key] = args[key];
        }
    });

    //displayObject = objectManager.setCommonProperties(displayObject, args);

    displayObject.parentObj = this;

    this.displayObject = displayObject;

    objectManager.registerObject(this);

    return displayObject;
  }

  return this;
}
