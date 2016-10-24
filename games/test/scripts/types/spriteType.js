var pixi = require('pixi.js');

var tapir = require('./../../../../src');
var objectManager = tapir.objectManagement.objectManager;
var assetManager = tapir.loader.assetManager;

module.exports = function(){
  this.dynTypeName = "spriteType";

  this.createObject = function(args){
    this.name = args.name;
    //find corresponding loader
    var assetNameArr = args.background.split(".");

    var batch = assetManager.findBatchByName(assetNameArr[0]);

    var o = new pixi.Sprite(batch.loader.resources[assetNameArr[1]].texture);

    o = objectManager.setCommonProperties(o, args);

    this.displayObject = o;

    objectManager.registerObject(this);

    return o;
  }
  this.makeInvisible = function(){
    this.displayObject.visible = false;
  }
  return this;
}
