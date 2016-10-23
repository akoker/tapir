//this
var dataReadTest = exports;

//json file variables

var gameFile = '../src/games/test/data/game.json';

var sceneFiles = [
  '../src/games/test/data/sceneData/slotScene.json',
  '../src/games/test/data/sceneData/gambleScene.json',
  '../src/games/test/data/sceneData/bonusScene.json'
]

var settingsFile = '../src/games/test/data/gameSettings.json';

var symbolTexturesFile = '../src/games/test/data/assetData/symbolTextureAssets.json';

//loader variables
var fileLoader = require('./../engine/loader/loaders/fileLoader.js');


//data variables
var symbolTextureData;
var slotSceneData;
var bonusSceneData;
var gambleSceneData;
var settingsData;
var gameData;

//how many files to be tested
var filesToTest = 6;
var testCounter = 0;

//testing functions************************************************************

//data
dataReadTest.test = function(){
  dataReadTest.readSymbolTextureFile();
  dataReadTest.readSlotSceneFile();
  dataReadTest.readBonusSceneData();
  dataReadTest.readGambleSceneData();
  dataReadTest.readGameData();
  dataReadTest.readSettingsData();
}

//test for symboltextures file
dataReadTest.readSymbolTextureFile = function(){
  fileLoader.loadFile(symbolTexturesFile, symbolTexturesDataReadTestCallBackFunc);
}

//test for slot scene file
dataReadTest.readSlotSceneFile = function(){
  fileLoader.loadFile(sceneFiles[0], slotSceneDataReadTestCallBackFunc);
}

dataReadTest.readGambleSceneData = function(){
  fileLoader.loadFile(sceneFiles[1], gambleSceneDataReadTestCallBackFunc);
}

dataReadTest.readBonusSceneData = function(){
  fileLoader.loadFile(sceneFiles[2], bonusSceneDataReadTestCallBackFunc);
}

dataReadTest.readGameData = function(){
  fileLoader.loadFile(gameFile, gameDataReadTestCallBackFunc);
}

dataReadTest.readSettingsData = function(){
  fileLoader.loadFile(settingsFile, settingsDataReadTestCallBackFunc);
}

//callback functions

function symbolTexturesDataReadTestCallBackFunc(dat){
  symbolTextureData = dat;
  testReturnedData(symbolTextureData, "symbol textures data");
  //console.log(jsonData);
}

function slotSceneDataReadTestCallBackFunc(dat){
  slotSceneData = dat;
  testReturnedData(slotSceneData, "slot scene data");
  //console.log(slotSceneData);
}

function gambleSceneDataReadTestCallBackFunc(dat){
  gambleSceneData = dat;
  testReturnedData(gambleSceneData, "gamble scene data");
  //console.log(gambleSceneData);
}

function bonusSceneDataReadTestCallBackFunc(dat){
  bonusSceneData = dat;
  testReturnedData(bonusSceneData, "bonus scene data");
  //console.log(bonusSceneData);
}

function gameDataReadTestCallBackFunc(dat){
  gameData = dat;
  testReturnedData(gameData, "game data");
  //console.log(gambleSceneData);
}

function settingsDataReadTestCallBackFunc(dat){
  settingsData = dat;
  testReturnedData(settingsData, "settings data");
  //console.log(bonusSceneData);
}

//function to test if returned data is correct or not
//in order to satisfy that, attribute and value has to be added to each json file;
/*
  "testPass" : true
*/
function testReturnedData(returnedData, testName){

  var json = JSON.parse(returnedData);

  if(json.testPass)testCounter++;
  else
    console.log("test has been failed. file name: " + testName + " " + returnedData.testPass);

  if(testCounter == filesToTest)
    console.log("succes: all file loading test passed!")
}
