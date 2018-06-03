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
		var code = "";
		for (var y = 0; y < len_y; y++) {
			for (var x = 0; x < len_x; x++) {
				code = code + map[x][y];
			}
			code = code + '\n';
		}
		var file = new Blob([code], {type: 'text/plain'});
		$('#save').attr('href', URL.createObjectURL(file));
	});

  $('#open').on('click', function() {
    if ($('#input-file').length > 0) {
      $('#input-file').remove();
    } else {
      $('#top-bar').append('<input id="input-file" type=file style="position: absolute" accept=".bf" onchange="handleFile(this.files[0])" />');
    }
  });

  function handleFiles(file) {
    // TODO
  }
});
