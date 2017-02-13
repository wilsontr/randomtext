const _ = require('lodash');

class TextTile {
	constructor(params) {
		this.char = '';
		this.bgColor = 30;
		this.fgColor = 39;

		if ( params ) {
			_.extend(this, params);
		}
	}

	getText() {
		let fgColorCode = "\x1B[" + this.fgColor + 'm';
		let bgColorCode = "\x1B[" + this.bgColor + 'm';
		return [
			fgColorCode,
			bgColorCode,
			this.char
		].join('');
	}

};


module.exports = TextTile;