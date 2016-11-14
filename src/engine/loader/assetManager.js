"use strict";


var assetManager = exports;

var pixi = require('pixi.js');

var assetLoader = require('./loaders/assetLoader.js');
var animAssetLoader = require('./loaders/animAssetLoader.js');
var fileLoader = require('./loaders/fileLoader.js');
var manipulator = require('./../common/manipulations.js');
var callbackFunc = null;
var callbackFuncArgs = null;

//contains all of the visual assets
assetManager.loader = pixi.loader;
assetManager.animations = [];

assetManager.loadImageBatch = function(args, callback){
  var ctr = 0;
  var toLoad = args.assets.length;
  args.assets.forEach(elm=>{
    //console.log("name: " + elm.name + " path: " + (args.pathPrefix + elm.path));
    loadFile(elm.name, args.pathPrefix + elm.path);
  })

  function loadFile(name, path){
    assetManager.loader.add(name, path);
    assetManager.loader.once('complete', loadCallback);
    assetManager.loader.load();
  }

  function loadCallback(){
    ctr++;
    if(ctr == toLoad)
      callback();
  }
}

assetManager.loadAnimBatch = function(args, callback){
  var ctr = 0;
  var toLoad = 0;
  var assetArr = args.assets;
  var animDataKeys = Object.keys(assetArr);
  animDataKeys.forEach(key=>{
    var elem = assetArr[key];
    toLoad = elem.assetCount * animDataKeys.length;
    var sInd;
    elem.startIndex != null ? sInd = elem.startIndex : sInd = 0;
    for(var i = sInd; i < sInd + elem.assetCount; i++){
      if(i < 10)
        var ind = "0" + i.toString();
      else {
        var ind = i;
      }
      var name = elem.assetPref + (i - sInd);
      assetManager.loader.add(name, elem.path + elem.assetPref + ind + "." + elem.fileType);
      assetManager.loader.once('complete', loadCallback);
      assetManager.loader.load();
    }
  });
  function loadCallback(){
    ctr++;
    if(ctr == toLoad){
      callback();
    }
  }
}

function createAnimAssetBatchCallback(o){
    assetManager.registerAnimAssetBatch(o);
}

assetManager.registerAssetBatch = function(o, type = null){
  switch (type) {
    case "image":
      assetManager.assets.push(o);
      break;
    case "animation":
      assetManager.animAssets.push(o);
      break;
    case "sound":
      assetManager.soundAssets.push(o);
      break;
    default:
      assetManager.assets.push(o);
      break;
  }
  assetManager.assets.push(o);
}

assetManager.registerAnimAssetBatch = function(o){
  assetManager.animAssets.push(o);
}

assetManager.findBatchByName = function(name){
  return manipulator.searchArrayElemByName(name, assetManager.assets);
}

assetManager.findBatchBySceneName = function(sceneName){
  return manipulator.searchArrayElemByPropName("scene", sceneName, assetManager.assets);
}
