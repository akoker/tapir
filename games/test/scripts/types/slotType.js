var pixi = require('pixi.js');

var tapir = require('./../../../../src');
var objectManager = tapir.objectManagement.objectManager;
var assetManager = tapir.loader.assetManager;
var slot = require('./../slot/slot.js');
var gameManager = require('./../../gameManager.js');

module.exports = function(){
  this.dynTypeName = "slotType";

  this.createObject = function(args){
    
    this.name = args.name;
    //find corresponding loader

    gameManager.server = require('./../slot/serverSim/serverSim.js');

    var reelData = gameManager.server.randomizeReels(100);

    var spinData = gameManager.server.randomizeSpin();

    console.log("initial spin data: " + spinData);
    gameManager.slot = slot.initializeSlot(spinData, reelData);

    var o = gameManager.slot.cont.displayObject;

    //o = objectManager.setCommonProperties(o, args);

    this.displayObject = o;

    objectManager.registerObject(this);

    console.log("creating slot object");

    return o;
  }
  this.makeInvisible = function(){
    this.displayObject.visible = false;
  }
  return this;
}
