"use strict";

var objectManager = require('./../../engine/objectManagement/objectManager.js');
var pixi = require('pixi.js');
var sceneManager = require('./../../engine/sceneManagement/sceneManager.js');
var dataManager = require('./../../engine/loader/dataManager.js');
var assetManager = require('./../../engine/loader/assetManager.js');

var spriteType = require('./scripts/types/spriteType.js');
var dynamicTypes = require('./../../engine/objectManagement/objectTypes/dynamicTypes.js')

var gameDataPath = ('src/games/test/data/game.json');
var scene = require('./../../engine/sceneManagement/scene.js');

var gameManager = exports;

var interactive = true;
var renderer = pixi.autoDetectRenderer(1280, 800,{transparent: true});
var stage = new pixi.Container();

var gameDiv = document.getElementById('gameDiv');
gameDiv.appendChild(renderer.view);

gameManager.initGame = function(gameDataFilePath){
  //load json files and keep data inside dataManager.
  loadGameData();

  //start updating stage
  update();
}

function loadAssets(){
  console.log("started loading game!");

  //load assets
  assetManager.registerAllAssets(dataManager.assetData, assetsLoaded);

  //example of registering a dynamic object type
  dynamicTypes.registerDynamicObjectType(new spriteType());
}

function assetsLoaded(){
  console.log("all assets are loaded!");
  //create scenes
  stage.addChild(new scene(dataManager.getSceneByName("slotScene")).container);
}

function loadGameData(){
  dataManager.loadAllGameData(gameDataPath, loadAssets);

  /*var a = dynamicTypes.searchDynamicTypeByName("spriteType");
  var ob = a.createObject("");
  stage.addChild(ob);
  console.log("dynamic type: " + ob);*/
}

function update(){
  requestAnimationFrame(update);
  renderer.render(stage);
}
