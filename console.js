var i = false,timer,backspacing,mode,rWait,doFakeBackspace,timer2,cursor,command,console;
doFakeBackspace=true;
keysUnDefaulted=[47];
mode=false;
function flip(b){(b)?b=false:b=true;return b;};
function backspace(source){
	if((!source)&&backspacing&&doFakeBackspace){
		// If a backspace is already in progress and this did not come from the timer, this means that backspace key repeats, stop emulating it
		console.append("It looks like this system supports key repeating backspace, key repeat faking for backspace has been disabled");
		doFakeBackspace=false;
		clearInterval(timer2);
	}
	var cmdtxt=command.text();
	command.text(cmdtxt.substring(0, cmdtxt.length-1));
	if((doFakeBackspace&&(!backspacing||rWait))){
		clearInterval(timer2);
		var t; // Do it longer the first time to avoid accidentally deleting two characters with a tap
		(rWait)?t=50:t=250;
		rWait=flip(rWait);
		timer2=setInterval('backspace(true)', t);					
	}
	backspacing=true;

}

window.onload=function() {
	setTimes();
	console=$("#console");
	command=$("#command");
	 
	rWait=false;

	console.empty();
	console.append("Welcome<br/>This screen verifies that you have javascript enabled.<br/>");
	$(document).keydown(function(event) {
		if(event.which==8){
			if(!mode){
				backspace(false);
			}
		}else if(event.which==13){
			console.append("<br/>"+command.html());
			command.empty();	
		}
	 });
	 
	$(document).keyup(function(event) {
		if(event.which==8){
			backspacing=false;
			rWait=false;
			clearInterval(timer2);
		}
	});
					 
	$(document).keypress(function(event) {
		if(event.which==8){
			if(!mode){
				mode=true;
				console.append("Your system supports keypress for backspace.<br/>");
				// Do not send a backspace this time, because a keydown is also sent and we would backspace twice

			}else{
				backspace(false);
			}
		 }
		else if(event.which>=33&&event.which<=126){
			command.append(String.fromCharCode(event.which));
		}else if(event.which==32){
			command.append("&nbsp;");
		}
		for(i=0;i<keysUnDefaulted.length;i++){
			if(event.which==keysUnDefaulted[i]){
				event.preventDefault(); // Prevent '/' from triggering the quick find
				break;
			}
		}
	});
	cursor= document.getElementById('cursor');
	timer = setInterval('blink()', 500);
	whiteCursor();
}

function zeroPad(num,count)
{
	var numZeropad = num + '';
	while(numZeropad.length < count) {
		numZeropad = "0" + numZeropad;
	}
	return numZeropad;
}

function formatDate(time){
	var hr=(time.getHours()%12);
	(hr==0) ? hr=12 : null;
	(time.getHours()>11)? b="PM" : b="AM";
	return hr+":"+zeroPad(time.getMinutes(),2)+":"+zeroPad(time.getSeconds(),2)+b;
}

function setTimes(){
	$("time").text(formatDate(new Date()));	
}
function whiteCursor(){cursor.style.backgroundColor = '#ffffff';i=false};
function darkCursor(){cursor.style.backgroundColor = '#000000';i=true};
function blink() {
	setTimes();
	(i==true) ? whiteCursor() : darkCursor();
}