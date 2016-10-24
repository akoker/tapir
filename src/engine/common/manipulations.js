"use strict";

var manipulator = exports;

manipulator.searchArrayElemByName = function(name, array){
  let returnVal = null;
  //ES 6
  array.forEach(o => {
    if(o.name == name){
      returnVal = o;
    }
  })
  return returnVal;
}

manipulator.searchChildByName = function(name, object){
  return manipulator.searchArrayElemByName(name, object.children);
}

//to-do
manipulator.traverseData = function(object){
  return array;
}

manipulator.searchArrayElemByPropName = function(propName, propValue, array){
  //ES 5
  for(var i = 0; i < array.length; i++){
    var o = array[i];
    if(o[propName] == propValue)
      return array[i];
  }
  return null;
}
