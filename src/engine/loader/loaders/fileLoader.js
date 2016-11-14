"use strict";

var fileLoader = exports;
var dataManager = require('./../dataManager.js');

//loads text file from server, casts its MIME type
//when load is finished, executes callback function
fileLoader.loadFile = function (path, callback, callbackVar = null, dataType = null, fileType = "json") {
    var fileObject = new XMLHttpRequest();
    switch (fileType) {
      case "json":
        fileObject.overrideMimeType("application/json");
        break;
      case "xml":
        fileObject.overrideMimeType("text/xml");
        break;
      default:
        fileObject.overrideMimeType("application/json");
        break;
    }

    fileObject.open('GET', path, true);

    fileObject.onreadystatechange = function() {
        if (fileObject.readyState == 4 && fileObject.status == "200") {
          if(callbackVar != null){
            if(dataType != null)
              callback(fileObject.responseText, callbackVar, dataType);
            else
              callback(fileObject.responseText, callbackVar);
          }
          else
            callback(fileObject.responseText)
        }
    }
    fileObject.send(null);
}
