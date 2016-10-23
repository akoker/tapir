"use strict";
var manipulator = require('./../../common/manipulations.js');
var dynamicTypes = exports;

dynamicTypes.types = [];

dynamicTypes.registerDynamicObjectType = function(o){
  dynamicTypes.types.push(o);
}

dynamicTypes.searchDynamicTypeByName = function(name){
  return manipulator.searchArrayElemByPropName("dynTypeName", name, dynamicTypes.types);
}
