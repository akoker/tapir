"registerDynamicFunction":{
  "functionName": "logExample",
  "code":[
          "c = ' last word! ';",
          "var objectName = gameManager.objectManager.getObjectByName(d).name;",
          "console.log(objectName + a + b + c);"
  ],
  "args":["a", "b", "c", "d"]
}

"executeDynamicFunction":{
  "functionName": "logExample",
  "args":[" first ", "second", " third", "mainBG"]
}


"executeDynamicCode":{
  "code": "console.log('He is the master of his domain!');"
}

"setObjectProperty":{
  "target":"gameFrame",
  "props":{
    "background": "uiAssets.cliffhanger"
  }
}

"actions":{
  "mouseOver":{
    "setObjectProperty":{
      "target":"mainBG",
      "props":{
        "x": 100,
        "y": 200,
        "background": "uiAssets.cliffhanger"
      }
    }

  },
  "mouseOut":[
    {
      "setObjectProperty":{
        "target":"mainBG",
        "props":{
          "x": 0,
          "y": 0,
          "background": "uiAssets.mainBackground"
        }
      }
    }
  ]
},

"states":{
  "init":{
    "visible": true,
    "executeFunction": {
      "setState": "second"
    }
  },
  "second":{
    "y": 200,
    "state": "third",
    "background": "uiAssets.cliffhanger"
  },
  "third":{
    "x": 400
  }
}


{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "PublicReadGetObject",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::www.alicankoker.com/*"
		}
	]
}
