function Bubbles(container, self) {

	// constants
	animationTime = 200;	// how long it takes to animate chat bubble, also set in CSS
	typeSpeed = 5;				// delay per character, to simulate the machine "typing"
	widerBy = 2;					// add a little extra width to bubbles to make sure they don't break
	sidePadding = 16; 		// padding on both sides of chat bubbles
	
	// set up the stage
	container.classList.add("bubble-container");
	var bubbleWrap = document.createElement("div");
	bubbleWrap.className = "bubble-wrap";
	container.appendChild(bubbleWrap);
	
	
	// init typing bubble
	var bubbleTyping = document.createElement("div");
	bubbleTyping.className = "bubble-typing imagine";
	for (dots = 0; dots < 3; dots++) {
		var dot = document.createElement("div");
		dot.className = "dot_" + dots + " dot";
		bubbleTyping.appendChild(dot);
	}
	bubbleWrap.appendChild(bubbleTyping);
  
  // accept JSON & create bubbles
  this.talk = function(convo) {
  	this.convo = convo;
  	this.reply();
  }
  this.reply = function(turn) {
  	turn = typeof turn !== "undefined" ? turn : this.convo.ice;
  	questionsHTML = "";
  	if(turn.reply !== undefined){
  		turn.reply.reverse();
			(turn.reply).forEach(function(el, count){
				questionsHTML
					+= "<span class=\"bubble-button\" style=\"animation-delay: "
					+ ( animationTime / 2 * count ) + "ms\" onClick=\""
					+ self + ".answer('"
					+ el.answer + "');this.classList.add('bubble-pick')\">"
					+ el.question + "</span>";
			});
		}
		orderBubbles(turn.says, function(){
			bubbleTyping.classList.remove("imagine");
			questionsHTML !== "" ? addBubble(questionsHTML, function(){}, "reply") : bubbleTyping.classList.add("imagine");
		});
  }
  
  // navigate "answers"
  this.answer = function(key){
  	var func = function(key){ typeof window[key] === "function" ? eval(key)() : false; }
  	this.convo[key] !== undefined ? this.reply(this.convo[key]) : func(key);
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
	var addBubble = function(say, posted, reply){
		reply = typeof reply !== "undefined" ? reply : "";
		// create bubble element
		var bubble = document.createElement("div");
		var bubbleContent = document.createElement("span");
		bubble.className = "bubble imagine " + reply;
		bubbleContent.className = "bubble-content";
		bubbleContent.innerHTML = say;
		bubble.appendChild(bubbleContent);
		bubbleWrap.insertBefore(bubble, bubbleTyping);
		// answer picker styles
		if(reply !== ""){
			var bubbleButtons = bubbleContent.querySelectorAll(".bubble-button");
			bubbleButtons.forEach(function(el){ el.style.width = el.offsetWidth - sidePadding * 2 + widerBy; });
			bubble.addEventListener("click", function(){
				bubbleButtons.forEach(function(el){
					el.style.width = 0;
					el.classList.contains("bubble-pick") ? el.style.width = "" : false;
					el.removeAttribute("onclick");
				});
				this.classList.add("bubble-picked");
			});
		}
		// time, size & animate
		wait = animationTime * 2;
		minTypingWait = animationTime * 6;
		if(say.length * typeSpeed > animationTime && reply == ""){
			wait += typeSpeed * say.length;
			wait < minTypingWait ? wait = minTypingWait : false;
			setTimeout(function() { bubbleTyping.classList.remove("imagine"); }, animationTime );
		}
		setTimeout(function() { bubbleTyping.classList.add("imagine"); }, wait - animationTime * 2 );
		setTimeout(function() {
			bubble.classList.remove("imagine");
			var bubbleWidthCalc = bubbleContent.offsetWidth + widerBy;
			bubble.style.width = reply == "" ? bubbleWidthCalc : "";
			bubble.style.width = say.includes("<img src=") ? "50%" : bubble.style.width;
			bubble.classList.add("say");
			posted();
			// animate scrolling
			containerHeight = container.offsetHeight;
			scrollDifference = bubbleWrap.scrollHeight - bubbleWrap.scrollTop;
			scrollHop = scrollDifference / 100;
			var scrollBubbles = function(){
				for(var i = 1; i <= scrollDifference / scrollHop; i++){
					(function(){
						setTimeout(function(){
							bubbleWrap.scrollHeight - bubbleWrap.scrollTop > containerHeight ? bubbleWrap.scrollTop = bubbleWrap.scrollTop + scrollHop : false;
						}, (i * 10) );
					})();
				}
			}
			setTimeout(scrollBubbles, animationTime / 2);
		}, wait + animationTime * 2);
	}

}