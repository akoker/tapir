"use strict";

var dataManager = exports;

var fileLoader = require('./loaders/fileLoader.js');
var manipulator = require('./../common/manipulations.js');

dataManager.gameData;

dataManager.settingsData;

dataManager.sceneData = [];

dataManager.assetData = [];

var loadFinishedCallbackFunction;

var loadedCount = 0;
var toLoad;

dataManager.loadAllGameData = function(gameDataFilePath, callback){
  loadFinishedCallbackFunction = callback;
  dataManager.getGameData(gameDataFilePath);
}

dataManager.getGameData = function(path){
  fileLoader.loadFile(path, getGameDataCallBack);
}

function getGameDataCallBack(data){
  dataManager.gameData = JSON.parse(data);
  toLoad = 1 + dataManager.gameData.assetDataFiles.length
             + dataManager.gameData.sceneFiles.length;

  //console.log("settings path: " + dataManager.gameData.dataFiles.settingsFile);
  dataManager.getData(dataManager.gameData.dataFiles.settingsFile, "settingsData");

  for(var i = 0; i < dataManager.gameData.assetDataFiles.length; i++){
    dataManager.getData(dataManager.gameData.assetDataFiles[i].path, "assetData");
  }
  for(var i = 0; i < dataManager.gameData.sceneFiles.length; i++){
    dataManager.getData(dataManager.gameData.sceneFiles[i].path, "sceneData");
  }
}

dataManager.getData = function(path, varToSet, dataType = "json"){
  fileLoader.loadFile(path, getDataCallback, varToSet);
}

dataManager.getSceneByName = function(name){
  return manipulator.searchArrayElemByName(name, dataManager.sceneData);
}

function getDataCallback(data, varToSet){
  switch (varToSet) {
    case "gameData":
      dataManager.gameData = JSON.parse(data);
      break;
    case "settingsData":
      dataManager.settingsData = JSON.parse(data);
      break;
    case "sceneData":
      dataManager.sceneData.push(JSON.parse(data));
      break;
    case "assetData":
      dataManager.assetData.push(JSON.parse(data));
      break;
    default:
      dataManager.gameData = JSON.parse(data);
      break;
  }
  if(checkFinished(toLoad)){
    console.log("data is loaded");
    loadFinishedCallbackFunction.apply();
  }
}

function checkFinished(total){
  loadedCount++;
  if(loadedCount == toLoad)
    return true;
  else
    return false;
}
