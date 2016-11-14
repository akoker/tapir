"use strict";

var pixi = require('pixi.js');

module.exports = function(args){
    var callbackFunc;

    var loader = pixi.loader;
    var counter = 0;
    var toLoad = 0;

    var loadObject = new Object();
    var startIndex;
    var pileName;

    this.Load = function(key, callback){
        pileName = key;
        console.log("path: " + args.path);
        args.startIndex != null ? startIndex = args.startIndex : startIndex = 0;
        console.log("startIndex: "+ args.count);
        callbackFunc = callback;
        toLoad = args.count;
        for(let i = startIndex; i < (args.startIndex + args.count); i++){
          console.log("loading");
          if(i < 10)
            var ind = "0" + i.toString();
          else
            var ind = i;
          loader.add(args.assetPref + ind, args.path + args.assetPref + ind + "." + args.fileType);
          loader.once('complete', onAssetsLoaded);
          loader.load();
        }
    }

    function onAssetsLoaded(){
      console.log("checking");
        counter++;
        if(counter == toLoad){
          loadObject.name = pileName;
          loadObject.type = args.type;
          loadObject.scene = args.scene;
          loadObject.loader = loader;
          callbackFunc(loadObject);
        }
    }
    return this;
}
