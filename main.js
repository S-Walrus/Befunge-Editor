// Number of quarters from top clockwise
var direction = 0
var pointer_x = 0
var pointer_y = 0

var arr = new Array(9);
for (i = 0; i < 9; i++) {
  arr[i] = new Array(9);
}

$(document).ready(function() {
  for (x = 1; x < 10; x++)
    for (y = 1; y < 10; y++) {
      $("#bef-box").append('<input class="cell" id="' + (x-1) + '-' + (y-1) + '" type="text" style="' +
                            'grid-column-start: ' + x + ';' +
                            'grid-column-end: ' + x + ';' +
                            'grid-row-start: ' + y + ';' +
                            'grid-row-end: ' + y + ';' +
                            '"/>');
      arr[x-1][y-1] = $('#' + (x-1) + '-' + (y-1));

      // Move cursor to the end of input
      arr[x-1][y-1].on("click", function() {
        val = $(this).val()
        $(this).val("");
        $(this).val(val);

        temp = this.id.split("-")
        pointer_x = temp[0];
        pointer_y = temp[1];
      });

      arr[x-1][y-1].on("input", function() {
        // Cut chars except for the last one
        $(this).val($(this).val().slice(-1));
        // TODO if char is direction, change direction
        // Move pointer
        switch(direction) {
          case 0:
            arr[pointer_x][pointer_y-1].focus();
            pointer_y--;
        }
      });
    }
    // TODO CTRL+arrow or CTRL+hjkl changes direction
});

// #333A42, #485058, #A6A5A1, #F1ECE9, #D7443F
