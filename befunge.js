/*
  Befunge.js - an interpreter of sigle commands
*/

var stack = [];

function bef_do(com) {
  switch (com) {
    case '@':
      stop();
			return 0;
  }
	changeDirection(com);
	move();
}
