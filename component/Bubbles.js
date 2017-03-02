function Bubbles(container, self) {

	// constants
	animationTime = 350;	// how long it takes to animate chat bubble, also set in CSS
	typeSpeed = 6;				// delay per character, to simulate the machine "typing"
	widerBy = 2;					// add a little extra width to bubbles to make sure they don't break
	
	// init typing bubble
	var bubbleTyping = document.createElement("div");
	bubbleTyping.className = "bubble-typing imagine";
	for (dots = 0; dots < 3; dots++) {
		var dot = document.createElement("div");
		dot.className = "dot_" + dots + " dot";
		bubbleTyping.appendChild(dot);
	}
	container.appendChild(bubbleTyping);
  
  // accept JSON & create bubbles
  this.talk = function(convo) {
  	this.convo = convo;
  	this.reply();
  }
  this.reply = function(turn) {
  	turn = typeof turn !== "undefined" ? turn : this.convo.default;
  	questionsHTML = "";
		(turn.accepts).forEach(function(el, count){
			questionsHTML
				+= "<span class=\"bubble-button\" style=\"animation-delay: "
				+ ( animationTime / 2 * count ) + "ms\" onClick=\""
				+ self + ".answer('"
				+ el.answer + "')\">"
				+ el.question + "</span>";
		});
		orderBubbles(turn.says, function(){
			bubbleTyping.classList.remove("imagine");
			addBubble(questionsHTML, function(){}, "accepts-two");
		});
  }
  
  // navigate "answers"
  this.answer = function(key){
  	this.reply(this.convo[key]);
  };
  
  // "type" each message within the group
  var orderBubbles = function(q, callback){
  	var start = function(){ setTimeout(function() { callback() }, animationTime); };
  	var position = 0;
  	for (var nextCallback = position + q.length - 1; nextCallback >= position; nextCallback --){
  		(function(callback, index){
  			start = function(){
  				addBubble(q[index], callback);
  			};
  		})(start, nextCallback);
  	}
  	start();
  }
  
  // create a bubble
	var addBubble = function(say, posted, accepts){
		accepts = typeof accepts !== "undefined" ? accepts : "";
		// create bubble element
		var bubble = document.createElement("div");
		var bubbleContent = document.createElement("span");
		bubble.className = "bubble imagine " + accepts;
		bubbleContent.className = "bubble-content";
		bubbleContent.innerHTML = say;
		bubble.appendChild(bubbleContent);
		container.insertBefore(bubble, bubbleTyping);
		// time, size & animate
		wait = animationTime * 2;
		if(say.length * typeSpeed > animationTime && accepts == ""){
			wait += typeSpeed * say.length;
			setTimeout(function() { bubbleTyping.classList.remove("imagine"); }, animationTime );
		}
		setTimeout(function() { bubbleTyping.classList.add("imagine"); }, wait - animationTime * 2 );
		setTimeout(function() {
			bubble.classList.remove("imagine");
			bubble.style.width = bubbleContent.offsetWidth + widerBy;
			bubble.classList.add("say");
			posted();
			// animate scrolling
			scrollDifference = container.scrollHeight - container.scrollTop;
			scrollHop = scrollDifference / 40;
			for(var i = 1; i <= scrollDifference / scrollHop; i++){
				(function(){
					setTimeout(function(){
						container.scrollTop = container.scrollTop + scrollHop;
					}, (15 * i) );
				})();
			}
		}, wait);
	}

}