
const Simplex = require('perlin-simplex');
const _ = require('lodash');

var TextGenerator = (function() {
	var Perlin = new Simplex();
	var ChancePerlin = new Simplex();

	const chanceThreshold = 0.7;

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
		'\u263C',

		'\u25BA',
		'\u25C4',
		'\u2195',
		'\u203C',
		'\u00B6',
		'\u00A7',
		'\u25AC',
		'\u21A8',
		'\u2191',
		'\u2193',
		'\u2192',
		'\u2190',
		'\u221F',
		'\u2194',
		'\u25B2',
		'\u25BC'
	];

	var width = 10;
	var height = 10;

	var xScaleFactor = Math.random() * 0.2;
	var yScaleFactor = Math.random() * 0.2;

	function _quantizeToCharIndex(noiseVal) {
		var setSize = characterSet.length;
		var floatIndex = noiseVal * setSize;
		var intVal = Math.round(floatIndex);
		return intVal;
	}

	function _getNoise(x, y) {
		return _scaleNoise(Perlin.noise(x * xScaleFactor, y * xScaleFactor));
	}

	function _scaleNoise(noise) {
		return (noise / 2) + 0.5;
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

	function getCharChance(x, y) {
		return _scaleNoise(ChancePerlin.noise(x * xScaleFactor, y * xScaleFactor));
	}

	function _getChar(x, y) {
		let charChance = getCharChance(x, y);
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
			var char = _getChar(x, y);
			return char;
		}
	}
});

module.exports = new TextGenerator();