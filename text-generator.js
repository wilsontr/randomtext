
var Simplex = require('perlin-simplex');
const PerlinGenerator = require('proc-noise');
const _ = require('lodash');

var TextGenerator = (function() {
	//var textNoise = new Simplex();
	var Perlin = new PerlinGenerator();
	var ChancePerlin = new PerlinGenerator();

	const chanceThreshold = 0.5;

	const characterSet = [
		'\u0000',
		'\u263A',
		'\u263B',
		'\u2665',
		'\u2666',
		'\u2663',
		'\u2660',
		'\u2022',
		'\u25D8',
		'\u25CB',
		'\u25D9',
		'\u2642',
		'\u2640',
		'\u266A',
		'\u266B',
		'\u263C'
	];

	var width = 10;
	var height = 10;

	function _quantizeToCharIndex(noiseVal) {
		var setSize = characterSet.length;
		var floatIndex = noiseVal * setSize;
		var intVal = Math.round(floatIndex);
		return intVal;
	}

	function _xDimensionToProportion (x) {
		//return x / width;
		return x;
	}

	function _yDimensionToProportion (y) {
		return y;
	}

	function _getNoise(x, y) {
		return Perlin.noise(x, y);
	}

	function _getPerlinChar(x, y) {
		var noise = _getNoise(x, y);
		var charIndex = _quantizeToCharIndex(noise);
		return charIndex;		
	}

	function _getRandomChar(x, y) {
		var noise = Math.random();
		var charIndex = _quantizeToCharIndex(noise);
		if ( _.isUndefined(charIndex) ) {
			charIndex = 0;
		}
		return charIndex;
	}

	function _getChar(x, y) {
		let charChance = ChancePerlin.noise(x, y);
		let char = ' ';
		if ( charChance > chanceThreshold ) {
			let charIndex = _getPerlinChar(x, y);
			char = characterSet[charIndex];
			if ( _.isUndefined(char) ) {
				char = characterSet[0];
			}			
		}
		return char;
	}


	return {

		setSize: function(w, h) {			
			width = w;
			height = h;
		},

		getChar: function(x, y) {
			var noiseX = _xDimensionToProportion(x);
			var noiseY = _yDimensionToProportion(y);
			var char = _getChar(noiseX, noiseY);
			return char;
		}
	}
});

module.exports = new TextGenerator();