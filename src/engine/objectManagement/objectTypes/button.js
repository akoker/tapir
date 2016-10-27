"use strict";

var objectManager = require('./../objectManager.js');
var assetManager = require('./../../loader/assetManager.js');
var pixi = require('pixi.js');

module.exports = function(){

  this.createObject = function(args){
    this.name = args.name;

    //*********************create sprite**********************
    var assetNameArr;
    if(args.images != null && args.images.default != null){
      assetNameArr = args.images.default.split(".");
    }
    else {
      assetNameArr = args.background.split(".");
    }
    var batch = assetManager.findBatchByName(assetNameArr[0]);

    var o = new pixi.Sprite(batch.loader.resources[assetNameArr[1]].texture);
    //********************end create-sprite*******************

    o = objectManager.setCommonProperties(o, args);

    o = objectManager.setCommonFunctions(o);

    o.clicked = false;

    args.toggleButton != null ? o.toggleButton = args.toggleButton : o.toggleButton = false;
    args.active != null ? o.active = args.active : o.active = true;

    if(args.images != null){
      args.images.default != null ? o.defaultImage = args.images.default : o.defaultImage = args.background;
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

    o.mousedown = function(){
      if(args.actions != null && args.actions.mouseDown != null)
        o.processState(args.actions.mouseDown);
    }

    o.mouseup = function(){
      if(args.actions != null && args.actions.mouseUp != null)
        o.processState(args.actions.mouseUp)
    }

    o.mouseover = function(){
      if(o.active){
        if(o.toggleButton){
          if(!o.clicked){
            if(o.overImage != null)
              setTexture(o.overImage);
          }
        }else {
          if(o.overImage != null)
            setTexture(o.overImage);
        }
      }
      if(args.actions != null && args.actions.mouseOver != null)
        o.processState(args.actions.mouseOver)
    }

    o.mouseout = function(){
      if(o.active){
        if(o.toggleButton){
          if(!o.clicked){
            setTexture(o.defaultImage);
          }
        }
        else
          setTexture(o.defaultImage);
      }

      if(args.actions != null && args.actions.mouseOut != null)
        o.processState(args.actions.mouseOut)
    }

    o.click = function(){
      if(o.toggleButton)
        toggle();
      if(args.actions != null && args.actions.click != null)
        o.processState(args.actions.click)
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
      o.active = v;
    }

    function toggle(){
      console.log("toggling");
      if(o.toggleButton && o.active){
        if(!o.clicked){
          o.clicked = true;
          if(o.clickedImage!=null)
            setTexture(o.clickedImage);
        }else{
          o.clicked = false;
          setTexture(o.defaultImage);
        }
      }
    }

    function setTexture(texture){
      let a = texture.split(".");

      let b = assetManager.findBatchByName(a[0]);

      o.texture = b.loader.resources[a[1]].texture;
    }

    return o;
  }

  return this;
}
