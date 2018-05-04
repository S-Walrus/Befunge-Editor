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

      // Move cursor to the end of input
      grid[x-1][y-1].on("click", function() {
        val = $(this).val()
        $(this).val("");
        $(this).val(val);

        temp = this.id.split("-")
        pointer_x = temp[0];
        pointer_y = temp[1];
      });

      grid[x-1][y-1].on("input", function() {
        // Cut chars except for the last one
        $(this).val($(this).val().slice(-1));

        val = $(this).val();
        map[pointer_x][pointer_y] = val;

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
      });
    }
    // TODO CTRL+arrow or CTRL+hjkl changes direction
});

// #333A42, #485058, #A6A5A1, #F1ECE9, #D7443F
