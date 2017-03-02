function Bubbles(container) {

	// constants
	animationTime = 350;	// how long it takes to animate chat bubble, also set in CSS
	typeSpeed = 6;				// delay per character, to simulate the machine "typing"
	
	// init typing bubble
	var bubbleTyping = document.createElement("div");
	bubbleTyping.className = "bubble-typing imagine";
	for (dots = 0; dots < 3; dots++) {
		var dot = document.createElement("div");
		dot.className = "dot_" + dots + " dot";
		bubbleTyping.appendChild(dot);
	}
	container.appendChild(bubbleTyping); // dispatch typing bubble immediately
	setTimeout(function() { bubbleTyping.classList.remove("imagine"); }, 100);
  
  // accept JSON & create bubbles
  this.talk = function(convo) {  	
		orderBubbles(convo.default.says);
  }  
  
  // "type" each message within the group
  var orderBubbles = function(q){
  	var start = function(){};
  	var position = 0;
  	for (var nextCallback = position + q.length - 1; nextCallback >= position; nextCallback --){
  		(function(callback, index){
  			start = function(){
  				addBubble(q[index], callback);
  				setTimeout(function() { bubbleTyping.classList.remove("imagine"); }, animationTime);
  			};
  		})(start, nextCallback);
  	}
  	start();
  }
  
  // create new bubble element with message
	var addBubble = function(say, posted){
		// create bubble element
		var bubble = document.createElement("div");
		var bubbleContent = document.createElement("span");
		bubble.className = "bubble imagine";
		bubbleContent.className = "bubble-content";
		bubbleContent.innerHTML = say;
		bubble.appendChild(bubbleContent);
		container.insertBefore(bubble, bubbleTyping);
		// time, size & animate
		wait = animationTime * 2;
		if(say.length * typeSpeed > animationTime) wait += typeSpeed * say.length;				
		setTimeout(function() { bubbleTyping.classList.add("imagine"); }, wait );
		setTimeout(function() {
			bubble.classList.remove("imagine");
			bubble.style.width = bubbleContent.offsetWidth;
			bubble.classList.add("say");
			posted();
		}, wait + animationTime);
	}

}