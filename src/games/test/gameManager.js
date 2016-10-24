"use strict";

//include pixi
var pixi = require('pixi.js');

//include framwork
var tapir = require('./../../');

var scene = tapir.sceneManagement.scene;
var objectManager = tapir.objectManagement.objectManager;
var sceneManager = tapir.sceneManagement.sceneManager;
var dataManager = tapir.loader.dataManager;
var assetManager = tapir.loader.assetManager;
var dynamicTypes = tapir.objectManagement.objectTypes.dynamicTypes;

//a custom object type declaration example
var spriteType = require('./scripts/types/spriteType.js');

//path of the JSON file containing game data to initialize the game
var gameDataPath = ('src/games/test/data/game.json');

//gameManager is the main class of the game
var gameManager = exports;

//setting up renderer and stage
var interactive = true;
var renderer = pixi.autoDetectRenderer(1280, 800,{transparent: true});
var stage = new pixi.Container();

var gameDiv = document.getElementById('gameDiv');
gameDiv.appendChild(renderer.view);

//function to initialize the game
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
}

function update(){
  requestAnimationFrame(update);
  renderer.render(stage);
}
