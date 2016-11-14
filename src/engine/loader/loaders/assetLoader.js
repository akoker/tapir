"use strict";

var pixi = require('pixi.js');

module.exports = function(args){
    var callbackFunc;

    var loader = pixi.loader;
    var counter = 0;

    var loadObject = new Object();

    this.Load = function(callback){
      console.log("loading asset: ");
        callbackFunc = callback;
        args.assets.forEach(v =>{
            loader.add(v.name, args.pathPrefix + v.path);
            loader.once('complete', onAssetsLoaded);
            loader.load();
        });
    }

    function onAssetsLoaded(){
        counter++;
        if(counter == args.assets.length){
          loadObject.name = args.name;
          loadObject.type = args.type;
          loadObject.scene = args.scene;
          loadObject.loader = loader;
          callbackFunc(loadObject);
        }
    }
    return this;
}
