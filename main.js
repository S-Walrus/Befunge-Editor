var len_x = 40;
var len_y = 20;
const interval = 200;
const null_char = ' ';
var direction = 1;							// Number of quarters from top clockwise
var pointer_x = 0;
var pointer_y = 0;
var timerId;
var isRunning = false;					// If the program is running (timer is set)
var started = false;						// If the program is started and it hasn't been stopped
var terminal;
var def_prompt;									// Default terminal prompt
var prompt = '';								// Current terminal prompt (used to output strings)
var map_save;

// Get len_x, len_y from parameters
var parameters = location.search.substring(1).split("&");
if (parameters.length > 1) {
	len_x = parseInt(parameters[0].split('=')[1]);
	len_y = parseInt(parameters[1].split('=')[1]);
}

var grid = new Array(len_x);		// An array of elements contained in the grid
var map = new Array(len_x);			// An array of value of elements, also the Befunge code
// Initialize arrays
for (i = 0; i < len_x; i++) {
	grid[i] = new Array(len_y);
	map[i] = new Array(len_y);
	// Fill 'map' with null characters
	for (j = 0; j < len_y; j++) {
		map[i][j] = null_char;
	}
}


// Deep copy of a 2-dimentional array
function deep_copy(arr) {
	var res = Array(arr.length);
	for (var i = 0; i < arr.length; i++) {
		res[i] = arr[i].slice();
	}
	return res;
}

// Make values in the grid the same as values in the map
function sync_grid() {
	for (x = 0; x < len_x; x++)
		for (y = 0; y < len_y; y++) {
			grid[x][y].val(map[x][y]);
		}
}

// Changes direction of the pointer (it have to change the indicator state also)
function changeDirection(val) {
	if (typeof(val) == "string") {
		switch (val) {
			case '^':
				direction = 0;
				break;
			case '>':
				direction = 1;
				break;
			case 'v':
				direction = 2;
				break;
			case '<':
				direction = 3;
				break;
		}
	} else if (typeof(val) == "number") {
		direction = val % 4;
	}
}

// Moves the pointer
function move(dir) {

	if (dir == null) {
		dir = direction;
	}

	switch (dir) {
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


// Pause the program
function pause() {
	clearInterval(timerId);
	isRunning = false;
}


// Clears temporary edits in the editor
function clear() {
	map = deep_copy(map_save);
	sync_grid();
	
	pointer_x = 0;
	pointer_y = 0;
	grid[pointer_x][pointer_y].focus();
	
	started = false;
	
	direction = 1;
	
	stack = [];
	update_stack();
}


// Runs the program
function run() {
	if (!started) {
		map_save = deep_copy(map);
	}
	isRunning = true;
	started = true;
	timerId = setInterval(function() { bef_do(map[pointer_x][pointer_y]) }, interval);
}


// Outputs 'str' to the terminal without entering a new line
function print_inline(str) {
	prompt += str;
	terminal.set_prompt(prompt);
}


// Creates a new line in the terminal and sets the default prompt
function new_line() {
	terminal.set_prompt(def_prompt);
	if (prompt != '') {
		terminal.echo(prompt);
		prompt = '';
	}
}


// The main function
$(document).ready(function() {
	
	// Init the map save (as a precaution)
	map_save = deep_copy(map);
	
	// Init the terminal
	terminal = $('#terminal').terminal(function(command, term) {
		input += command;
	}, {
		greetings: "JQuery Terminal:\nCopyright (c) 2011-2018 Jakub Jankiewicz <http://jcubic.pl/me>"
	});
	
	// Set the default prompt
	def_prompt = terminal.get_prompt();
	
	// Initialize the grid
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
			grid[x-1][y-1].val(null_char);

			// On click
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

			// On edit
			grid[x-1][y-1].on("input", function() {
				// Cut chars except for the last one
				$(this).val($(this).val().slice(-1));

				val = $(this).val();
				if (val == '') {
					map[pointer_x][pointer_y] = null_char;
				} else {
					map[pointer_x][pointer_y] = val;
				}

				changeDirection(val);
				move();
			});
		}
});

// #333A42, #485058, #A6A5A1, #F1ECE9, #D7443F
