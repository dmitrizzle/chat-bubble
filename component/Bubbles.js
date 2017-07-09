function Bubbles(container, self, options) {

	// options
	options = 				typeof options !== "undefined" ? options : {};
	animationTime = 	options.animationTime || 200;			// how long it takes to animate chat bubble, also set in CSS
	typeSpeed = 			options.typeSpeed || 5;						// delay per character, to simulate the machine "typing"
	widerBy = 				options.widerBy || 2;							// add a little extra width to bubbles to make sure they don't break
	sidePadding = 		options.sidePadding || 6; 				// padding on both sides of chat bubbles
	inputCallbackFn = options.inputCallbackFn || false;	// should we display an input field?
	
  var standingAnswer = "ice"; // remember where to restart convo if interrupted
		
		
		
	// set up the stage
	container.classList.add("bubble-container");
	var bubbleWrap = document.createElement("div");
	bubbleWrap.className = "bubble-wrap";
	container.appendChild(bubbleWrap);
	
	// install user input textfield
	this.typeInput = function(callbackFn){
		var inputWrap = document.createElement("div");
		inputWrap.className = "input-wrap";
		var inputText = document.createElement("textarea");
		inputText.setAttribute("placeholder", "Type your question...");
		inputWrap.appendChild(inputText);
		inputText.addEventListener("keypress", function(e){ // register user input
			if(e.keyCode == 13){
				e.preventDefault();
				typeof bubbleQueue !== false ? clearTimeout(bubbleQueue) : false; // allow user to interrupt the bot
				var lastBubble = document.querySelectorAll(".bubble.say"); lastBubble = lastBubble[lastBubble.length-1];
				lastBubble.classList.contains("reply") && !lastBubble.classList.contains("reply-freeform")  ? lastBubble.classList.add("bubble-hidden") : false;
				addBubble("<span class=\"bubble-button bubble-pick\">" + this.value + "</span>", function(){}, "reply reply-freeform");
				// callback
				typeof callbackFn === "function" ? callbackFn({
					"input" : this.value,
					"convo" : convo,
					"standingAnswer": standingAnswer
				}) : false;
				this.value = "";
			}
		});
		container.appendChild(inputWrap);
		bubbleWrap.style.paddingBottom = "100px";
		inputText.focus();
	}
	inputCallbackFn ? this.typeInput(inputCallbackFn) : false;
	
	
	
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
  this.talk = function(convo, here) {
  	this.convo = convo;
  	this.reply(this.convo[here]);
  	here ? standingAnswer = here : false;
  }
  this.reply = function(turn) {
  	turn = typeof turn !== "undefined" ? turn : this.convo.ice;
  	questionsHTML = "";
  	if(turn.reply !== undefined){
  		turn.reply.reverse();

  			for(var i=0; i<turn.reply.length; i++)
  			{
  				randomstuff(turn.reply[i], i);
  			}
			//(turn.reply).forEach(

			//	function(el, count)
			//{
			//	questionsHTML
			//		+= "<span class=\"bubble-button\" style=\"animation-delay: "
			//		+ ( animationTime / 2 * count ) + "ms\" onClick=\""
			//		+ self + ".answer('"
			//		+ el.answer + "');this.classList.add('bubble-pick')\">"
			//		+ el.question + "</span>";
			//}

			//);
		}
		orderBubbles(turn.says, function(){
			bubbleTyping.classList.remove("imagine");
			questionsHTML !== "" ? addBubble(questionsHTML, function(){}, "reply") : bubbleTyping.classList.add("imagine");
		});
  }
  function randomstuff(el, count)
			{
				questionsHTML
					+= "<span class=\"bubble-button\" style=\"animation-delay: "
					+ ( animationTime / 2 * count ) + "ms\" onClick=\""
					+ self + ".answer('"
					+ el.answer + "');this.classList.add('bubble-pick')\">"
					+ el.question + "</span>";
			}
  // navigate "answers"
  this.answer = function(key){
  	var func = function(key){ typeof window[key] === "function" ? window[key]() : false; }
  	this.convo[key] !== undefined ? (this.reply(this.convo[key]), standingAnswer = key) : func(key);
  };
  
  // api for typing bubble
  this.think = function(){
  	bubbleTyping.classList.remove("imagine");
  	this.stop = function(){
  		bubbleTyping.classList.add("imagine");
  	}
  }
  
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
  
  function looooper(el){
					el.style.width = 0 + "px";
					el.classList.contains("bubble-pick") ? el.style.width = "" : false;
					el.removeAttribute("onclick");
				}
  function last_fix(el){
				if(!el.parentNode.parentNode.classList.contains("reply-freeform"))
				el.style.width = el.offsetWidth - sidePadding * 2 + widerBy + "px";
			}
  
  // create a bubble
  var bubbleQueue = false;
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

			for(var z =0; z<bubbleButtons.length; z++)
			{
				last_fix(bubbleButtons[z]);
			}
			//last_fix()
			//bubbleButtons.forEach(function(el){
			//	if(!el.parentNode.parentNode.classList.contains("reply-freeform"))
			//	el.style.width = el.offsetWidth - sidePadding * 2 + widerBy + "px";
			//});
			bubble.addEventListener("click", function(){

				for (var i = 0; i < bubbleButtons.length; i++)
				{
					looooper(bubbleButtons[i]);
				}

				//bubbleButtons.forEach(function(el){
				//	el.style.width = 0 + "px";
				//	el.classList.contains("bubble-pick") ? el.style.width = "" : false;
				//	el.removeAttribute("onclick");
				//});

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
		bubbleQueue = setTimeout(function() {
			bubble.classList.remove("imagine");
			var bubbleWidthCalc = bubbleContent.offsetWidth + widerBy + "px";
			bubble.style.width = reply == "" ? bubbleWidthCalc : "";
			bubble.style.width = say.includes("<img src=") ? "50%" : bubble.style.width;
			bubble.classList.add("say");
			posted();
			// animate scrolling
			containerHeight = container.offsetHeight;
			scrollDifference = bubbleWrap.scrollHeight - bubbleWrap.scrollTop;
			scrollHop = scrollDifference / 200;
			var scrollBubbles = function(){
				for(var i = 1; i <= scrollDifference / scrollHop; i++){
					(function(){
						setTimeout(function(){
							bubbleWrap.scrollHeight - bubbleWrap.scrollTop > containerHeight ? bubbleWrap.scrollTop = bubbleWrap.scrollTop + scrollHop : false;
						}, (i * 5) );
					})();
				}
			}
			setTimeout(scrollBubbles, animationTime / 2);
		}, wait + animationTime * 2);
	}



}  // close function