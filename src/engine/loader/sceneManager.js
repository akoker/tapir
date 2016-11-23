"use strict";

var pixi = require('pixi.js');
var scene = require('./scene.js');
var manipulator = require('./../common/manipulations.js');
var dataManager = require('./../loader/dataManager.js');

var sceneManager = exports;

sceneManager.scenes = [];
sceneManager.currentScene;

sceneManager.initScenes = function(){

}

sceneManager.createScene = function(args){
  //to-do
  //sceneManager.scenes.push(new scene(args));
  return new scene(args);
}

sceneManager.getSceneByName = function(name){
  return manipulator.searchArrayElemByName(name, sceneManager.scenes);
}

sceneManager.openScene = function(name){
  sceneManager.currentScene.hide();
  sceneManager.getSceneByName(name).show();
}

sceneManager.closeScene = function(name){
  sceneManager.getSceneByName(name).hide();
}

sceneManager.closeCurrentScene = function(){
  sceneManager.currentScene.hide();
}
