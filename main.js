const len_x = 40;
const len_y = 20;
const interval = 100;
const null_char = '';
// Number of quarters from top clockwise
var direction = 0;
var pointer_x = 0;
var pointer_y = 0;
var timerId;
var isRunning = false;
var stack = [];

var grid = new Array(len_x);		// An array of elements contained in the grid
var map = new Array(len_x);			// An array of value of elements, also the Befunge code
// Initialize arrays
for (i = 0; i < len_x; i++) {
	grid[i] = new Array(len_y);
	map[i] = new Array(len_y);
	// Fill 'map' with null characters
	for (j = 0; j < len_y; j++) {
		map[j] = null_char;
	}
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
			if (pointer_y != 0) {
				pointer_y--;
			} else {
				pointer_y = len_y - 1;
			}
			break;
		case 1:
			if (pointer_x != len_x - 1) {
				pointer_x++;
			} else {
				pointer_x = 0;
			}
			break;
		case 2:
			if (pointer_y != len_y - 1) {
				pointer_y++;
			} else {
				pointer_y = 0;
			}
			break;
		case 3:
			if (pointer_x != 0) {
				pointer_x--;
			} else {
				pointer_x = len_x - 1;
			}
			break;
	}
	grid[pointer_x][pointer_y].focus();
}


function stop() {
	clearInterval(timerId);
	isRinning = false;
}


function runNext() {
	switch (map[pointer_x][pointer_y]) {
		case '@':
			stop();
			break;
		default:
			move(map[pointer_x][pointer_y]);
			break;
	}
}


function run() {
	isRunning = true;
	timerId = setInterval(function() { runNext() }, interval);
}


$(document).ready(function() {
	for (x = 1; x < len_x + 1; x++)
		for (y = 1; y < len_y + 1; y++) {
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
				if (val == '') {
					map[pointer_x][pointer_y] = null_char;
				} else {
					map[pointer_x][pointer_y] = val;
				}

				move(val);
			});

			// Key pressed
			grid[x-1][y-1].on("keydown", function(event) {
				prevent = true;
				switch (event.which) {
					case 38:
						changeDirection(0);
						break;
					case 39:
						changeDirection(1);
						break;
					case 40:
						changeDirection(2);
						break;
					case 37:
						changeDirection(3);
						break;
					
					case 13:
						if (isRunning) {
							stop();
						} else {
							run();
						}
						break;
						
					case 8:
						direction = (direction + 2) % 4;
						move();
						direction = (direction + 2) % 4;
						map[pointer_x][pointer_y] = null_char;
						grid[pointer_x][pointer_y].val(null_char);
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
