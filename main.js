// Number of quarters from top clockwise
var direction = 0
var pointer_x = 0
var pointer_y = 0
var len = 9

var grid = new Array(len);
var map = new Array(len);
for (i = 0; i < len; i++) {
	grid[i] = new Array(len);
	map[i] = new Array(len);
}


function changeDirection(new_dir) {
	direction = new_dir;
}


function move(val) {
	switch (val) {
		case '^':
			changeDirection(0);
			break;
		case '>':
			changeDirection(1);
			break;
		case 'v':
			changeDirection(2);
			break;
		case '<':
			changeDirection(3);
			break;
	}

	switch (direction) {
		case 0:
			grid[pointer_x][pointer_y-1].focus();
			pointer_y--;
			break;
		case 1:
			grid[pointer_x+1][pointer_y].focus();
			pointer_x++;
			break;
		case 2:
			grid[pointer_x][pointer_y+1].focus();
			pointer_y++;
			break;
		case 3:
			grid[pointer_x-1][pointer_y].focus();
			pointer_x--;
			break;
	}
}


function run() {
	while (map[x][y] != '@') {
		switch (map[x][y]) {
				TODO
		}
	}
}


$(document).ready(function() {
	for (x = 1; x < len+1; x++)
		for (y = 1; y < len+1; y++) {
			$("#bef-box").append('<input class="cell"' +
														'id="' + (x-1) + '-' + (y-1) +
														'" type="text" style="' +
														'grid-column-start: ' + x + ';' +
														'grid-column-end: ' + x + ';' +
														'grid-row-start: ' + y + ';' +
														'grid-row-end: ' + y + ';' +
														'"/>');
			grid[x-1][y-1] = $('#' + (x-1) + '-' + (y-1));

			// Click
			grid[x-1][y-1].on("click", function() {
				// Move cursor to the end of the input
				val = $(this).val()
				$(this).val("");
				$(this).val(val);
				// Move pointer to the clicked cell
				temp = this.id.split("-")
				pointer_x = Number(temp[0]);
				pointer_y = Number(temp[1]);
			});

			// Edit
			grid[x-1][y-1].on("input", function() {
				// Cut chars except for the last one
				$(this).val($(this).val().slice(-1));

				val = $(this).val();
				map[pointer_x][pointer_y] = val;

				move(val);
			});

			// Key pressed
			grid[x-1][y-1].on("keydown", function(event) {
				prevent = true;
				switch (event.which) {
					case 38:
					case 87:
					case 75:
						changeDirection(0);
						break;
					case 39:
					case 68:
					case 76:
						changeDirection(1);
						break;
					case 40:
					case 83:
					case 74:
						changeDirection(2);
						break;
					case 37:
					case 65:
					case 72:
						changeDirection(3);
						break;
					
					case 82:
						run();
						break;
						
					default:
						prevent = false;
				}
				if (prevent) {
					event.preventDefault();
				}
			})
		}
});

// #333A42, #485058, #A6A5A1, #F1ECE9, #D7443F
