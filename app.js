console.log("hello world");

var gameManager = require('./games/test/gameManager.js');

//for unit testing
//var dataReadTest = require('./unitTesting/dataReadTest.js');
//dataReadTest.test();


var gameFile = '/games/test/data/game.json';

gameManager.initGame(gameFile);
