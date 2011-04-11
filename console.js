function Console(e){
	this.i=true;
	this.e=e;
	this.timer;
	this.backspacing;
	this.mode=false;
	this.test=2;
	this.keysUnDefaulted=[47];
	this.cursor;
	this.command;
	this.console;	
	this.backspace=backspace;
	this.whiteCursor=whiteCursor;
	this.darkCursor=darkCursor;
	this.blink=blink;
	this.init=init;
	this.init();
	
}

function backspace(source){
	var cmdtxt=this.command.text();
	this.command.text(cmdtxt.substring(0, cmdtxt.length-1));
}



function init() {
	setTimes();
	this.console=$("#console",this.e);
	this.command=$("#command",this.e);
	
	this.rWait=false;
	this.console.empty();
	this.console.append("Welcome<br/>This screen verifies that you have javascript enabled.<br/>");
	
	$(document).keydown({t:this},function(event) {
		t=event.data.t;
		if(event.which==8){
			if(!t.mode){
				t.backspace(false);
			}
		}else if(event.which==13){
			t.console.append("<br/>"+t.command.html());
			t.command.empty();	
		}
	 });
	 
	$(document).keyup({t:this},function(event) {
	});
	

	$(document).keypress({t:this},function(event) {
		t=event.data.t;
		if(event.which==8){
			if(!t.mode){
				t.mode=true;
				t.console.append("Your system supports keypress for backspace.<br/>");
				// Do not send a backspace this time, because a keydown is also sent and we would backspace twice

			}else{
				t.backspace(false);
			}
		 }
		else if(event.which>=33&&event.which<=126){
			t.command.append(String.fromCharCode(event.which));
		}else if(event.which==32){
			t.command.append("&nbsp;");
		}
		for(i=0;i<t.keysUnDefaulted.length;i++){
			if(event.which==t.keysUnDefaulted[i]){
				event.preventDefault(); // Prevent '/' from triggering the quick find
				break;
			}
		}
	});
	this.cursor=$("#cursor",this.e);
	this.cursor.css("background-color",'#ffffff')
	this.timer = setInterval(jQuery.proxy(this.blink,this), 500);
	this.whiteCursor();
}

function whiteCursor(){this.cursor.css("background-color",'#ffffff');this.i=false};
function darkCursor(){this.cursor.css("background-color",'#000000');this.i=true};

function blink() {
	setTimes();
	(this.i==true) ? this.whiteCursor() : this.darkCursor();
}

