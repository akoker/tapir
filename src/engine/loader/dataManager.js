"use strict";

var dataManager = exports;

var fileLoader = require('./loaders/fileLoader.js');
var manipulator = require('./../common/manipulations.js');

//all of below are optional to use
dataManager.gameData;
dataManager.settingsData;
dataManager.sceneData = [];
dataManager.assetData = [];
dataManager.animData = [];
//--------end - optional----------

//to keep any kind of data. also optional
dataManager.dataPile = [];

var loadFinishedCallbackFunction;

var loadedCount = 0;
var toLoad = 0;


dataManager.loadData = function(path, callbackFunction, dataType = null ,fileType = "json"){
  toLoad = 0;
  fileLoader.loadFile(path, loadDataCallback, callbackFunction, dataType, fileType);
}

function loadDataCallback(data, callbackFunction, dataType){
  dataManager.registerData(data, dataType);

  if(toLoad == 0)
    callbackFunction(JSON.parse(data));
  else{
    if(checkFinished(toLoad))
      loadFinishedCallbackFunction();
  }

}

dataManager.loadAllGameData = function(gameDataFilePath, callback){
  fileLoader.loadFile(gameDataFilePath, loadAllGameDataCallback);
  loadFinishedCallbackFunction = callback;
}

function loadAllGameDataCallback(data){
  //console.log(JSON.parse(data));
  dataManager.registerData(data, "gameData");
  let datKeys = Object.keys(dataManager.gameData.dataFiles);
  toLoad = 0;
  loadedCount = 0;

  //how many files to be loaded?
  datKeys.forEach(datKey=>{
    dataManager.gameData.dataFiles[datKey].forEach(fKey => {
      toLoad++;
    })
  });

  //load data files
  datKeys.forEach(datKey => {
    let datElems = dataManager.gameData.dataFiles[datKey];

    var datType = "";
    datElems.forEach(datElem=>{
      switch (datKey) {
        case "settingsDataFiles":
          datType = "settingsData";
          break;
        case "assetDataFiles":
          datType = "assetData";
          break;
        case "sceneDataFiles":
          datType = "sceneData";
          break;
        default:
          datType = data.name;
          break;
      }
      fileLoader.loadFile(datElem.path, loadDataCallback, loadFinishedCallbackFunction, datType);
    });
  });
}

dataManager.registerData = function(data, dataType){
  switch(dataType){
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
      dataManager.dataPile.push(JSON.parse(data));
      break;
  }
}

dataManager.getAnimDataByName = function(name, dataBatch = dataManager.assetData){
  var animData = manipulator.searchArrayElemByPropName("type", "animation", dataBatch);
  var animKeys = Object.keys(animData.assets);
  var returnVal;
  animKeys.forEach(animKey => {
    if(animKey == name){
      returnVal = animData.assets[animKey];
    }
  });
  return returnVal;
}

dataManager.getAssetDataByName = function(name, dataBatch = dataManager.assetData){
  return manipulator.searchArrayElemByName(name, dataBatch);
}

dataManager.getSceneDataByName = function(name, dataBatch = dataManager.sceneData){
  return manipulator.searchArrayElemByName(name, dataBatch);
}

function checkFinished(total){
  loadedCount++;
  if(loadedCount == toLoad)
    return true;
  else
    return false;
}
