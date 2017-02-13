const _ = require('lodash');
const PerlinGenerator = require('proc-noise');
const TextGenerator = require('./text-generator');

var width = 20;
var height = 20;


class TextTile {
	constructor(params) {
		this.char = '';
		if ( params ) {
			_.extend(this, params);
		}
	}

	setChar(char) {
		this.char = char;
	}

	getText() {
		return this.char;
	}

};


function generate_map(width, height) {

	TextGenerator.setSize(width, height);

	var map = [];

	for ( var row = 0; row < height; row++ ) {
		var rowTiles = [];
		for ( var col = 0; col < width; col++ ) {
			var new_tile = new TextTile({
				char: TextGenerator.getChar(col, row)
			});
			rowTiles.push(new_tile);
		}
		map.push(rowTiles);
	}

	return map;
}

function display_map(map) {
	var rows = _.map(map, (row) => {
		var rowString = [];
		_.each(row, (tile) => {
			rowString.push(tile.getText());
		});

		return rowString.join('');
	});

	console.log(rows.join('\n'));

	
}

var map = generate_map(width, height);
display_map(map);