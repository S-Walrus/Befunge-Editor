/*
  Befunge.js - an interpreter of sigle commands
*/

var stack = [];

function updateStack() {
	$("#stack-box").html("");
	stack.forEach(function(item) {
		$("#stack-box").append('<div class="stack-cell"><h1>' + item + '</h1></div>');
	});
}

function bef_do(com) {
  switch (com) {
			
    case '@':
      stop();
			return 0;
			
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			stack.push(parseInt(com));
			break;
			
		case '+':
			stack.push(stack.pop() + stack.pop());
			break;
		case '-':
			stack.push(-(stack.pop() - stack.pop()));
			break;
		case '*':
			stack.push(stack.pop() * stack.pop());
			break;
		case '/':
			stack.push(1 / stack.pop() * stack.pop());
			break;
		case '%':
			a = stack.pop();
			stack.push(stack.pop() % a);
			break;
			
		case '!':
			if (stack.pop() == 0) {
				stack.push(1);
			} else {
				stack.push(0);
			}
			break;

		case '`':
			// if a > b in [..., a, b]
			if (stack.pop() < stack.pop()) {
				stack.push(1);
			} else {
				stack.push(0);
			}
			break;

		case '?':
			changeDirection(Math.floor(Math.random() * 4));
			break;

		case '_':
			if (stack.pop() == 0) {
				changeDirection('>');
			} else {
				changeDirection('<');
			}
			break;
			
		case '|':
			if (stack.pop() == 0) {
				changeDirection('v');
			} else {
				changeDirection('^');
			}
			break;
  }
	updateStack();
	changeDirection(com);
	move();
}
