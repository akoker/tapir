var slot = require('./../slot.js');
var gameManager = require('./../../../gameManager.js');

module.exports = function (reelData, settingsData, assetData){
  //console.log("reel is being initialized");
    this.numOfSymbols = settingsData.settings.totalLength;
    var noOfReels = settingsData.settings.numberOfReels;
    var symbolWidth = settingsData.symbolProps.symbolWidth;
    var symbolHeight = settingsData.symbolProps.symbolHeight;
    var iterations = settingsData.settings.totalSpinIterations;
    var numberOfSymbolsOnReel = settingsData.settings.numberOfSymbolsOnReel;
    var symbolPath;
    this.isSpinning = false;
    this.spinSpeed = settingsData.settings.spinSpeed;
    this.maxSpeed = settingsData.settings.spinMaxSpeed;
    var spinInc = this.spinSpeed;
    this.textureArr;
    this.textureChanged = false;
    this.reelIndex;
    this.settingsData = settingsData;
    this.assetData = assetData;
    this.reelData = reelData;
    this.reelIndex = 0;

    //reelcontainer
    this.cont = new PIXI.Container();

    var brt = new PIXI.BaseRenderTexture(symbolWidth, this.numOfSymbols * symbolHeight, PIXI.SCALE_MODES.LINEAR, 1);

    //render texture for the reel. it will be used inside update function to render
    //the tiling sprite
    this.rendText = new PIXI.RenderTexture(brt);

    //tiling sprite for masking and spin animation
    this.tile = new PIXI.extras.TilingSprite(this.rendText, symbolWidth, symbolHeight*numberOfSymbolsOnReel);

    //init reel
    this.createReel = function(target, index){
        this.reelIndex = index;
        for(var i = 0; i<this.numOfSymbols; i++){
            var v =  "symbol0" + (reelData[this.reelIndex][normalizeIndexNumber(target+ i, this.reelData[0].length)] + 1);
            var s = new PIXI.Sprite(gameManager.assetManager.loader.resources[v].texture);
            s.position.y = (i)*symbolHeight;
            this.cont.addChild(s);
        }
    }

    //replace symbols of the reel according to new spin data
    this.replaceTexture = function(target){
        this.cont.removeChildren();
        for(var i = 0; i<this.numOfSymbols; i++){
            var v =  "symbol0" + (reelData[this.reelIndex][normalizeIndexNumber(target+ i, this.reelData[0].length)] + 1);
            var s = new PIXI.Sprite(gameManager.assetManager.loader.resources[v].texture);
            s.position.y = (i)*symbolHeight;
            this.cont.addChild(s);
        }
        this.textureChanged = true;
        return this.cont;
    }

    this.startSpin = function(target){
        spinInc = this.spinSpeed;
        this.tile.tilePosition.y = 0;
        this.isSpinning = true;
        this.currentTarget = target;
    }

    //spin reel
    this.spinReel = function(){
        //before upper speed limit, speed up spin
        if(this.tile.tilePosition.y < (iterations*symbolHeight*this.numOfSymbols)*0.6 && spinInc < this.maxSpeed){
                spinInc+=0.1;
            }
        //while on top speed, replace textures according to the target
        else if(this.tile.tilePosition.y > (iterations*symbolHeight*this.numOfSymbols)*0.6 && this.tile.tilePosition.y < (iterations*symbolHeight*this.numOfSymbols)*0.8){
            if(!this.textureChanged){
                this.cont = this.replaceTexture(this.currentTarget);
            }
        }
        //speed down for last %20 of spin
        else if(this.tile.tilePosition.y > (iterations*symbolHeight*this.numOfSymbols)*0.8 && spinInc > this.spinSpeed){
            spinInc-=0.35;
        }
        //spin the reel by increment tile position
        if(this.tile.tilePosition.y < iterations * symbolHeight*this.numOfSymbols)
            this.tile.tilePosition.y += spinInc;
        //if increment variable messes up, place the reel into its targeted position
        else if(this.tile.tilePosition.y > iterations*symbolHeight*this.numOfSymbols){
            this.tile.tilePosition.y = iterations*symbolHeight*this.numOfSymbols;
            this.isSpinning = false;
            slot.finishedReelCount++;
            if(slot.finishedReelCount == noOfReels)
                slot.finishSpinSequence();
        }
    }

    //stop reel
    this.stopReel = function(target){
        if(!this.textureChanged)
          this.cont = this.replaceTexture(target);
        this.tile.tilePosition.y = 0;
        this.isSpinning = false;
        slot.finishedReelCount++;
        if(slot.finishedReelCount == noOfReels)
            slot.finishSpinSequence();
    }
    return this;
}

//if the reel index start index + target index is greater than size of the reel
//returns the correct index from beginning. Otherwise index will get out of bounds.
function normalizeIndexNumber(ind, arraySize){
    if(ind < 0){
        return Math.abs(arraySize + ind);
    }
    if(ind >= arraySize){
        return Math.abs(arraySize - ind);
    }else
        return ind;
}
