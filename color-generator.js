
//const PerlinGenerator = require('proc-noise');
var Simplex = require('perlin-simplex');
const _ = require('lodash');

	const fgColorSet = [
		'30', // black
		'31', // red 
		'32', // green
		'33', // yellow
		'34', // blue
		'35', // magenta
		'36', // cyan
		'37', // light gray
		'90', // dark gray
		'91', // light red
		'92', // light green
		'93', // light yellow
		'94', // light blue
		'95', // light magenta 
		'96', // light cyan
		'97'  // white
	];


	const bgColorSet = [
		'40', // black
		'41', // red 
		'42', // green
		'43', // yellow
		'44', // blue
		'45', // magenta
		'46', // cyan
		'47', // light gray
		'100', // dark gray
		'101', // light red
		'102', // light green
		'103', // light yellow
		'104', // light blue
		'105', // light magenta 
		'106', // light cyan
		'107'  // white
	];


var ColorGenerator = (function() {
	
	var FgPerlin = new Simplex();
	var BgPerlin = new Simplex();

	var width = 10;
	var height = 10;

	var xScaleFactor = 0.1;
	var yScaleFactor = 0.1;

	var fgMapStart, fgMapScale;
	var bgMapStart, bgMapEnd;

	_setNoiseScaling();

	function _setNoiseScaling() {

		xScaleFactor = Math.random() * 0.2;
		yScaleFactor = Math.random() * 0.2;

		var fgNoiseMapping = _getNoiseMapping();
		var bgNoiseMapping = _getNoiseMapping();

		fgMapStart = fgNoiseMapping.start;
		fgMapEnd = fgNoiseMapping.end;

		bgMapStart = bgNoiseMapping.start;
		bgMapEnd = bgNoiseMapping.end;
	}

	function _getNoiseMapping() {
		var mapStart = Math.random();
		var mapEnd = mapStart + (Math.random() * 0.5);
		if ( mapEnd > 1 ) {
			mapEnd = 1;
		}

		return {
			start: mapStart,
			end: mapEnd
		};
	}


	function _quantizeToColorIndex(noiseVal, start, end, set) {
		var mapScale = end - start;
		var scaledNoise = (noiseVal * mapScale) + start;
		var floatIndex = scaledNoise * set.length;
		var intVal = Math.round(floatIndex);
		return intVal;
	}

	function _constrain(value, lowerBound, upperBound) {
		var result;

		if ( value > upperBound ) {
			result = upperBound;
		} else if ( value < lowerBound ) {
			result = lowerBound;
		} else {
			result = value;
		}

		return result;
	}

	function _scaleNoise(noise) {
		return (noise / 2) + 0.5;
	}

	function _getBgNoise(x, y) {
		return _scaleNoise(BgPerlin.noise(x * xScaleFactor, y * yScaleFactor));
	}

	function _getFgNoise(x, y) {
		return _scaleNoise(FgPerlin.noise(x * xScaleFactor, y * yScaleFactor));
	}

	function _getBgColorIndex(x, y) {
		var noise = _getBgNoise(x, y);
		var colorIndex = _quantizeToColorIndex(noise, bgMapStart, bgMapEnd, bgColorSet);
		return colorIndex;		
	}

	function _getFgColorIndex(x, y) {
		var noise = _getFgNoise(x, y);
		var colorIndex = _quantizeToColorIndex(noise, fgMapStart, fgMapEnd, fgColorSet);
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
			_setNoiseScaling();
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