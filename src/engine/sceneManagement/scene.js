/******************************************************************************
Scene is simply a pixi container. There can be multiple scenes in a game so
there can be multiple instances of scene class. All scnes are manipulated by
sceneManager class which is a singleton.
*******************************************************************************/
"use strict";

var dataManager = require('./../loader/dataManager.js');
var objectManager = require('./../objectManagement/objectManager.js');
var pixi = require('pixi.js');

//constructor
module.exports = function(data){
  this.name = data.name;

  this.container = new pixi.Container();


/*member functions*************************************************************/
  this.initScene = function(data){
    this.createScene(data);
  }

  this.createScene = function(data){
    console.log("scene '" + this.name + "' is getting created");
    var d = this.traverse(data.scene);

    for(var i = 0; i < d.length; i++){
      this.container.addChild(d[i]);
    }

    return this;
  }

  this.addObject = function(object){
    this.addChild(object);
  }

  this.show = function(args){
    this.visible = true;
  }

  this.hide = function(args){
    this.visible = false;
  }

  this.traverse = function(p){
      var objArr = new Array();
      for(var i = 0; i < p.length; i++){
          var v = objectManager.createObject(p[i]);
          console.log("creating object: " + p[i].name);
          if(v!=null){
              objArr.push(v);
              if(p[i].children!=undefined){
                  var ob = this.traverse(p[i].children);
                  for(var j = 0; j < ob.length;j++)
                      v.addChild(ob[j]);
              }
          }
      }
      return objArr;
  }

  this.initScene(data);
}
/*end-member functions*********************************************************/
