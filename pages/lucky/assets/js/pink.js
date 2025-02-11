// 6 sectors pink

var wheelConfig_pink_6 = {
    assetPath : 'pink/',
    fontName: 'coiny_54',
    centerOffsetX: 0,
    centerOffsetY: -160,
    prizeTextTint : 0xFFFFFF,
    sectorsTextTint : 0xFFFFFF,
    offsetSectText : 130,
    offsetSectIcon : 210,

    // sectors config
    sectors: [
        {
            win: '30 minutes infinite life',
            text: '30m',
            isBigWin : false,
            icon:'heart'
        },
        {
            win: 'Brush booster x1',
            text: 'x1',
            isBigWin : false,
            icon:'brush'
        },
        {
            win: 'Color bomb booster x1',
            text: 'x1',
            isBigWin : false,
            icon:'color_bomb'
        },
        {
            win: 'Cannon booster x1',
            text: 'x1',
            isBigWin : false,
            icon:'cannon'
        },
        {
            win: '200 coins',
            text: '200',
            isBigWin : false,
            icon:'coin'
        },
        {
            win: 'TNT booster x1',
            text: 'x2',
            isBigWin : false,
            icon:'tnt'
        },
    ],

    sprites: [
        {
            fileName: null,   // filename or null
            name: 'background',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 0
        },
        {
            fileName: 'SpinButton.png',
            name: 'spinbutton',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 550
        },
        {
            fileName: 'SpinButtonHover.png',
            name: 'spinbutton_hover',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 650
        },
        {
            fileName: 'LightSector_6.png',
            name: 'lightsector',
            originX: 0.5,
            originY: 1,
            offsetX: 0,
            offsetY: 3
        },
        {
            fileName: 'Pointer.png',
            name: 'pointer',
            originX: 0.5,
            originY: 0.2,
            offsetX: 0,
            offsetY: -360
        },
        {
            fileName: 'CenterPin.png',
            name: 'centerpin',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 30
        },
        {
            fileName: null,
            name: 'spinarrow',
            originX: 0.5,
            originY: 0.5,
            offsetX: 240,
            offsetY: -85
        },
        {
            fileName: 'Wheel_6.png', //5
            name: 'wheel',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 0
        },
        {
            fileName: 'WheelBorder.png',
            name: 'wheelborder',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 3
        },
        {
            fileName: 'Lamp.png',
            name: 'lamp_off',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        },
        {
            fileName: 'LampOn.png',
            name: 'lamp_on',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        },
        {
            fileName: 'Heart.png',
            name: 'heart',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        },
        {
            fileName: 'Coin.png',
            name: 'coin',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        }, {
            fileName: 'Brush.png',
            name: 'brush',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        }, {
            fileName: 'ColorBomb.png',
            name: 'color_bomb',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        }, {
            fileName: 'Cannon.png',
            name: 'cannon',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        },
        {
            fileName: 'TNT.png',
            name: 'tnt',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        }, {
            fileName: 'Rocket.png',
            name: 'rocket',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        }, {
            fileName: 'Dice.png',
            name: 'dice',
            originX: 0.5,
            originY: 0.5,
            offsetX: 0,
            offsetY: 93
        },
    ],

    lamps:{
        count : 10,
        offset : 340,
    },

    // wheel spin duration range, in milliseconds
    rotationTimeRange: {
        min: 3000,
        max: 4000
    },

    // wheel rounds before it stops
    wheelRounds: {
        min: 3,
        max: 4
    },

    // degrees the wheel will rotate in the opposite direction before it stops
    backSpin: {
        min: 1,
        max: 4
    },
    lightTweenDuration : 500,

    createLamps: function(scene){
       
        scene.lampsArray = []; 
        var angle = Math.PI * 2 / this.lamps.count;
        var piD2 = Math.PI / 2;

        for(var i = 1; i < this.lamps.count; i++)
        {
            var _angle = -angle * i - piD2;
            var _cos = Math.cos (_angle);
            var _sin = Math.sin (_angle)

            var posX = this.lamps.offset * _cos;
            var posY = this.lamps.offset * _sin;
            scene.lamp = new Lamp (scene, posX, posY);
            scene.lamp.on();
            scene.lampsArray.push(scene.lamp);
        }
    },
}





   
