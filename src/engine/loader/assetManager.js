"use strict";

var assetManager = exports;

var assetLoader = require('./loaders/assetLoader.js');
var fileLoader = require('./loaders/fileLoader.js');
var manipulator = require('./../common/manipulations.js');
var callbackFunc;
var callbackFuncArgs;
var loadCount = 0;
var toLoad;

//array of objects of asset batches
assetManager.assets = [];
//assetManager.defaultBatches = ["ui", "symbols", "symbolAnims", "slotAnims",
//                              "bonus", "bonusAnims", "gamble", "gambleAnims"]

assetManager.registerAllAssets = function(assetData, callback, callbackArgs = null){
  console.log("registering all assets");
  callbackFunc = callback;
  callbackFuncArgs = callbackArgs;
  toLoad = assetData.length;
  loadCount = 0;

  assetData.forEach(v => {
    createPileAssetBatch(v)
  });

}

function createPileAssetBatch(data){
  var loader = new assetLoader(data);
  loader.name = data.name;
  loader.type = data.type;
  loader.scene = data.scene;
  loader.Load(createPileAssetBatchCallback);
}

function createPileAssetBatchCallback(o){
  assetManager.registerAssetBatch(o);
  loadCount++;
  if(loadCount == toLoad){
    if(callbackFuncArgs==null)
      callbackFunc();
    else
      callbackFunc(callbackFuncArgs);
  }
}

assetManager.createSingleAssetBatch = function(data, callback , callbackArgs = null){
  callbackFunc = callback;
  callbackFuncArgs = callbackArgs;
  var loader = new assetLoader(data);
  loader.Load(createAssetBatchCallback);
}

function createSingleAssetBatchCallback(o){
  assetManager.registerAssetBatch(o);
  if(callbackFuncArgs==null)
    callbackFunc();
  else
    callbackFunc(callbackFuncArgs);
}

assetManager.registerAssetBatch = function(o){
  assetManager.assets.push(o);
}

assetManager.findBatchByName = function(name){
  return manipulator.searchArrayElemByName(name, assetManager.assets);
}

assetManager.findBatchBySceneName = function(sceneName){
  return manipulator.searchArrayElemByPropName("scene", sceneName, assetManager.assets);
}
