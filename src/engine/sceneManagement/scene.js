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

  this.container = new pixi.Container(true);


/*member functions*************************************************************/
  this.initScene = function(data){
    this.createScene(data);
  }

  this.createScene = function(data){
    //console.log("scene '" + this.name + "' is getting created");
    let d = this.traverse(data.scene);

    d.forEach(v => {
      this.container.addChild(v);
    });

    return this;
  }

  this.addObject = function(object){
    this.addChild(object);
  }

  this.show = function(){
    this.container.visible = true;
  }

  this.hide = function(){
    this.container.visible = false;
  }

  this.traverse = function(p){
      var objArr = new Array();
      for(let i = 0; i < p.length; i++){
          //console.log("creating object: " + p[i].name + " objectManager: " + objectManager);
          let v = objectManager.createObject(p[i]);
          if(v!=null){
              objArr.push(v);
              if(p[i].children!=undefined){
                  let ob = this.traverse(p[i].children);
                  for(let j = 0; j < ob.length;j++)
                      v.addChild(ob[j]);
              }
          }
      }
      return objArr;
  }

  this.initScene(data);
}
/*end-member functions*********************************************************/
