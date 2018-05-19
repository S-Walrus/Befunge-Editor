// To handle input even when <input> is focused
key.filter = function(event) {
  var tagName = (event.target || event.srcElement).tagName;
  return !(tagName == 'SELECT' || tagName == 'TEXTAREA');
}


// Change direction
key('ctrl+up', function() {
  changeDirection(0);
  return false;
});
key('ctrl+right', function() {
  changeDirection(1);
  return false;
});
key('ctrl+down', function() {
  changeDirection(2);
  return false;
});
key('ctrl+left', function() {
  changeDirection(3);
  return false;
});

// Move
key('up', function() {
  temp = direction;
  direction = 0;
  move();
  direction = temp;
  return false;
});
key('right', function() {
  temp = direction;
  direction = 1;
  move();
  direction = temp;
  return false;
});
key('down', function() {
  temp = direction;
  direction = 2;
  move();
  direction = temp;
  return false;
});
key('left', function() {
  temp = direction;
  direction = 3;
  move();
  direction = temp;
  return false;
});

// Run
key('ctrl+r, enter', function() {
  if (isRunning) {
    pause();
		clear();
  } else {
    run();
  }
  return false;
});

// Backspace
key('backspace', function() {
  direction = (direction + 2) % 4;
  move();
  direction = (direction + 2) % 4;
  map[pointer_x][pointer_y] = null_char;
  grid[pointer_x][pointer_y].val(null_char);
  return false;
});


$(document).ready(function() {
	
	$('#run').on('click', function() {
		run();
	});
	
	$('#pause').on('click', function() {
		pause();
	});
	
	$('#stop').on('click', function() {
		pause();
		clear();
	});
	
	$('#save').on('click', function() {
		// TODO записывать код Befunge в файл
		var file = new Blob(['test'], {type: 'text/plain'});
		$('#save').attr('href', URL.createObjectURL(file));
	});
});
