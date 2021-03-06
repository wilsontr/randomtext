const _ = require('lodash');
const TextGenerator = require('./text-generator');
const ColorGenerator = require('./color-generator');
const TextTile = require('./text-tile');

var width = 40;
var height = 40;


function generate_map(width, height) {

	TextGenerator.setSize(width, height);
	ColorGenerator.setSize(width, height);

	var map = [];

	for ( var row = 0; row < height; row++ ) {
		var rowTiles = [];
		for ( var col = 0; col < width; col++ ) {
			var new_tile = new TextTile({
				char: TextGenerator.getChar(col, row),
				bgColor: ColorGenerator.getBgColor(col, row),
				fgColor: ColorGenerator.getFgColor(col, row)
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

	console.log(rows.join("\x1B[40m\n"));

	
}

var map = generate_map(width, height);
display_map(map);