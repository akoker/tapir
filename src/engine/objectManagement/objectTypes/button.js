"use strict";

var objectManager = require('./../objectManager.js');
var assetManager = require('./../../loader/assetManager.js');
var pixi = require('pixi.js');

module.exports = function(){

  this.createObject = function(args){
    this.name = args.name;

    //*********************create sprite**********************
    var bgAsset;
    if(args.images != null && args.images.default != null){
      bgAsset = args.images.default;
    }
    else {
      bgAsset = args.background;
    }
    //var batch = assetManager.findBatchByName(assetNameArr[0]);

    var o = new pixi.Sprite(assetManager.loader.resources[bgAsset].texture);
    //********************end create-sprite*******************

    o = objectManager.setCommonProperties(o, args);

    o = objectManager.setCommonFunctions(o);

    o.clicked = false;

    args.toggleButton != null ? o.toggleButton = args.toggleButton : o.toggleButton = false;
    args.active != null ? o.active = args.active : o.active = true;

    if(o.background != null)
      o.defaultImage = args.background;
    if(args.images != null){
      if(args.images.default != null) o.defaultImage = args.images.default;
      o.clickedImage = args.images.clicked;
      o.activeImage = args.images.active;
      o.passiveImage = args.images.passive;
      o.overImage = args.images.over;
      o.downImage = args.images.down;
      o.upImage = args.images.up;
    }

    o.parentObj = this;

    this.displayObject = o;

    objectManager.registerObject(this);

    o.setTexture = function(textureName){
      o.texture = assetManager.loader.resources[textureName].texture;
    }

    o.mousedown = function(){
      if(args.actions != null && args.actions.mouseDown != null)
        o.processState(args.actions.mouseDown);
    }

    o.mouseup = function(){
      if(args.actions != null && args.actions.mouseUp != null){
        o.processState(args.actions.mouseUp)}
    }

    o.mouseover = function(){
      if(args.actions != null && args.actions.mouseOver != null)
        o.processState(args.actions.mouseOver)
      if(o.active){
        if(o.toggleButton){
          if(!o.clicked){
            if(o.overImage != null)
              o.setTexture(o.overImage);
          }
        }else {
          if(o.overImage != null)
            o.setTexture(o.overImage);
        }
      }
    }

    o.mouseout = function(){
      if(args.actions != null && args.actions.mouseOut != null)
        o.processState(args.actions.mouseOut)
      if(o.active && !o.clicked){
        o.setTexture(o.defaultImage);}
    }

    o.click = function(){
      if(args.actions != null && args.actions.click != null)
        o.processState(args.actions.click)
      if(o.toggleButton)
        o.toggle();
    }
    /*
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
*/

    o.setActive = function(v){
      if(o.active){
        o.setTexture(o.passiveImage);
      }
      else{
        if(o.activeImage != null)
          o.setTexture(o.activeImage);
        else
          o.setTexture(o.defaultImage);
      }
      o.active = v;
    }

    o.toggleActive = function(){
      if(o.active){
        o.setTexture(o.passiveImage);
        o.active = false;
      }
      else{
        if(o.activeImage != null)
          o.setTexture(o.activeImage);
        else
          o.setTexture(o.defaultImage);

        o.active = true;
      }
    }

    o.toggle = function(){
      if(o.toggleButton && o.active){
        if(!o.clicked){
          o.clicked = true;
          if(o.clickedImage!=null)
            o.setTexture(o.clickedImage);
        }else{
          o.clicked = false;
          o.setTexture(o.defaultImage);
        }
      }
    }
    return o;
  }

  return this;
}
