var pixi = require('pixi.js');

var objectManager = require('./../../../../engine/objectManagement/objectManager.js');
var assetManager = require('./../../../../engine/loader/assetManager.js');

module.exports = function(){
  this.dynTypeName = "spriteType";

  this.createObject = function(args){
    this.name = args.name;
    //find corresponding loader
    var assetNameArr = args.background.split(".");

    var batch = assetManager.findBatchByName(assetNameArr[0]);

    var o = new pixi.Sprite(batch.loader.resources[assetNameArr[1]].texture);

    o = objectManager.setCommonProperties(o, args);

    return o;
  }

  return this;
}
