
//const PerlinGenerator = require('proc-noise');
var Simplex = require('perlin-simplex');
const _ = require('lodash');

var ColorGenerator = (function() {
	
	var FgPerlin = new Simplex();
	var BgPerlin = new Simplex();

	const fgColorSet = [
		'30',
		'31',
		'32',
		'33',
		'34',
		'35',
		'36',
		'37',
		'90',
		'91',
		'92',
		'93',
		'94',
		'95',
		'96',
		'97'
	];


	const bgColorSet = [
		'40',
		'41',
		'42',
		'43',
		'44',
		'45',
		'46',
		'47',
		'100',
		'101',
		'102',
		'103',
		'104',
		'105',
		'106',
		'107'
	];	

	var width = 10;
	var height = 10;

	function _quantizeToColorIndex(noiseVal, set) {
		var setSize = set.length;
		var floatIndex = noiseVal * setSize;
		var intVal = Math.round(floatIndex);
		return intVal;
	}

	function _scaleNoise(noise) {
		return (noise / 2) + 0.5;
	}

	function _getBgNoise(x, y) {
		return _scaleNoise(BgPerlin.noise(x, y));
	}

	function _getFgNoise(x, y) {
		return _scaleNoise(FgPerlin.noise(x, y));
	}

	function _getBgColorIndex(x, y) {
		var noise = _getBgNoise(x, y);
		var colorIndex = _quantizeToColorIndex(noise, bgColorSet);
		return colorIndex;		
	}

	function _getFgColorIndex(x, y) {
		var noise = _getFgNoise(x, y);
		var colorIndex = _quantizeToColorIndex(noise, fgColorSet);
		return colorIndex;		
	}

	function _getForegroundColor(x, y) {
		let colorIndex = _getFgColorIndex(x, y);
		let color = fgColorSet[colorIndex];
		if ( _.isUndefined(color) ) {
			color = fgColorSet[0];
		}			
		
		return color;
	}

	function _getBackgroundColor(x, y) {
		let colorIndex = _getBgColorIndex(x, y);
		let color = bgColorSet[colorIndex];
		if ( _.isUndefined(color) ) {
			color = bgColorSet[0];
		}			
		
		return color;
	}	


	return {

		setSize: function(w, h) {			
			width = w;
			height = h;
		},

		getFgColor: function(x, y) {
			var color = _getForegroundColor(x, y);
			return color;
		},

		getBgColor: function(x, y) {
			var color = _getBackgroundColor(x, y);
			return color;
		}		
	}
});

module.exports = new ColorGenerator();