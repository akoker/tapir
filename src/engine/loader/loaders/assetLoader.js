"use strict";

var pixi = require('pixi.js');

module.exports = function(args){
    var callbackFunc;

    var loader = pixi.loader;
    var counter = 0;

    var loadObject = new Object();

    this.Load = function(callback){
        callbackFunc = callback;
        for(var i = 0; i < args.assets.length; i++){
            loader.add(args.assets[i].name, args.pathPrefix + args.assets[i].path);
            loader.once('complete', onAssetsLoaded);
            loader.load();
        }
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
