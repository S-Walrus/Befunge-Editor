/*
  Befunge.js - an interpreter of sigle commands
*/

var input = '';
var stack = [];
var string_mode = false;
var wait = false;

function update_stack() {
	$("#stack-box").html("");
	stack.forEach(function(item) {
		$("#stack-box").append('<div class="stack-cell"><h1>' + item + '</h1></div>');
	});
}

function bef_do(com) {
	if (string_mode && com != '"') {
		stack.push(com.charCodeAt(0));
	} else {
		switch (com) {

			case '@':
				pause();
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

			case '"':
				string_mode = !string_mode;
				break;

			case ':':
				a = stack.pop();
				stack.push(a, a);
				break;

			case '\\':
				a = stack.pop();
				b = stack.pop();
				stack.push(a, b);
				break;

			case '$':
				stack.pop();
				break;

			case '#':
				move();
				break;

			case 'p':
				v = stack.pop();
				y = stack.pop();
				x = stack.pop();
				map[x][y] = String.fromCharCode(v);
				grid[x][y].val(String.fromCharCode(v));
				break;

			case 'g':
				var y = stack.pop();
				var x = stack.pop();
				stack.push(map[x][y].charCodeAt(0));
				break;
				
			case '.':
				new_line();
				terminal.echo('[[b;green;]' + stack.pop() + ']');
				break;
				
			case ',':
				print_inline(String.fromCharCode(stack.pop()));
				break;
				
			case '~':
				if (input == '') {
					new_line();
					terminal.focus();
					wait = true;
				} else {
					wait = false;
					stack.push(input.charCodeAt(0));
					input = input.substring(1);
					terminal.focus(false);
				}
				break;
				
			case '&':
				if (input == '') {
					new_line();
					terminal.focus();
					wait = true;
				} else {
					wait = false;
					stack.push(parseInt(input));
					input = '';
					terminal.focus(false);
				}
				break;
		}
	}
	update_stack();
	if (!wait) {
		changeDirection(com);
		move();
	}
}
