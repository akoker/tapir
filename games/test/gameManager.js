"use strict";

//include pixi
var pixi = require('pixi.js');
var timer = require('pixi-timer');//adds timer class to pixi

//include framwork
var tapir = require('./../../src/');

//gameManager is the main class of the game
var gameManager = exports;

//managers are assigned to the game Manager to be reachable from dynamic code
gameManager.objectManager = tapir.objectManagement.objectManager;
gameManager.sceneManager = tapir.sceneManagement.sceneManager;
gameManager.dataManager = tapir.loader.dataManager;
gameManager.assetManager = tapir.loader.assetManager;
gameManager.reelLines = require('./scripts/slot/reels/reelLines.js');
gameManager.spinning = false;

var animType = tapir.objectManagement.objectTypes.animation;

var scene = tapir.sceneManagement.scene;
var dynamicTypes = tapir.objectManagement.objectTypes.dynamicTypes;

//custom object type declaration example
var spriteType = require('./scripts/types/spriteType.js');
var slotType = require('./scripts/types/slotType.js');

//path of the JSON file containing game data to initialize the game
var gameDataPath = ('games/test/data/game.json');

//setting up renderer and stage
var renderer = pixi.autoDetectRenderer(1280, 800,{transparent: true});
gameManager.stage = new pixi.Container();

var gameDiv = document.getElementById('gameDiv');
gameDiv.appendChild(renderer.view);

var r;

//add gameManager to the window so that the dynamic code can reach namespace
window.gameManager = gameManager;

//function to initialize the game
gameManager.initGame = function(gameDataFilePath){
  //load json files and keep data inside dataManager.
  loadGameData();

  //start updating stage
  update();
}

function loadGameData(){
  console.log("started loading game data!");
  //loads all game data. callback function load assets is called after all data is loaded.
  gameManager.dataManager.loadAllGameData(gameDataPath, loadAssets);
  //gameManager.dataManager.loadData(gameDataPath, loadAssets, "myGameData");
}

function loadAssets(){
  var count = 0;
  //registering a dynamic object type
  dynamicTypes.registerDynamicObjectType(new spriteType());
  dynamicTypes.registerDynamicObjectType(new slotType());

  console.log("started loading assets ");

  //load assets. callback function assetsLoaded is called after all assets are loaded.
  gameManager.assetManager.loadImageBatch(gameManager.dataManager.getAssetDataByName("symbolTextures"), assetsLoaded);
  gameManager.assetManager.loadImageBatch(gameManager.dataManager.getAssetDataByName("uiAssets"), assetsLoaded);
  gameManager.assetManager.loadAnimBatch(gameManager.dataManager.getAssetDataByName("animAssets"), assetsLoaded);


  function assetsLoaded(to, loaded){
    count++;
    if(count == 3){
      //create scene
      var s = gameManager.dataManager.getSceneDataByName("slotScene");
      console.log("all assets are loaded! ");
      var sc = new scene(s);
      gameManager.stage.addChild(sc.container);

      gameManager.server = require('./scripts/slot/serverSim/serverSim.js');

      //var reelData = gameManager.server.randomizeReels(100);

      //var spinData = gameManager.server.randomizeSpin();

      //console.log("initial spin data: " + spinData);

      //console.log("slot object: " + gameManager.slot.reelArr[0].rendText);
      /*var anim = new animType();
      sc.container.addChild(anim.createObject("symbolAnim"));
      anim.displayObject.x = 100;
      anim.displayObject.y = 100;
      anim.displayObject.visible = false;
      anim.playAnimation();
      anim.displayObject.visible = true;

      var reel = require('./scripts/slot/reels/reel.js');
      r = new reel(reelData, gameManager.dataManager.settingsData, gameManager.dataManager.assetData);
      r.createReel(0, gameManager.assetManager.loader);
      console.log(r.cont);
      //sc.container.addChild(r.cont);
      r.tile.position.x = 200;
      sc.container.addChild(r.tile);*/

      //sc.container.addChild(gameManager.slot.cont.displayObject);

      /*for(var i = 0; i < 5; i++){
        sc.container.addChild(gameManager.slot.reelArr[i].tile);
        gameManager.slot.reelArr[i].tile.x = gameManager.slot.cont.displayObject.position.x + 154*i;
        gameManager.slot.reelArr[i].tile.y = gameManager.slot.cont.displayObject.position.y;
      }*/

      //sc.container.addChild(gameManager.slot.cont);
    }
  }

}


function update(){
  requestAnimationFrame(update);
  renderer.render(gameManager.stage);
    pixi.timerManager.update();
  for(var i = 0; i < 5; i++){
    if(gameManager.slot != undefined && gameManager.slot.reelArr[i]!=undefined){
      renderer.render(gameManager.slot.reelArr[i].cont, gameManager.slot.reelArr[i].rendText);
      if(gameManager.slot.reelArr[i].isSpinning){
          gameManager.slot.reelArr[i].spinReel(20);
      }
    }
  }
}
