var chatBubble = new Class({
	Implements: Options,
	options: {
		animationTime: 350,
		typeDelay: 6,
		scrollSensitivity: 1000,
		mediumBubble: {
			charLength: [80, 120],
			width: 450
		},
		contentWidthShim: 50
	},

	bubbleChain: [],
	bubbleLog: [],

	add: function(html, css, bookmark){
		if(typeof html === 'string'){
			var c = this, ch = c.bubbleChain,
				contentLength = html.stripTags().length,
				at = c.options.animationTime,
				td = c.options.typeDelay,
				bubbleDelay = at*2;
			if(contentLength*td > at){
				bubbleDelay = (td*contentLength+at*2);
			}
			ch.push({
				'options': {
					'cssClass': css || '',
					'bookmark': bookmark || false
				},
				'properties': {
					'id': this.guid(),
					'content': html,
					'bubbleDelay': bubbleDelay
				}
			});
			if(!c.bubbleChain[1]){
				c.step();
			}
		}
	},
	follow: function(fn){
		var c = this, w = c.options.chatWindow;
		var fn = fn;
		if(!c.options.visible) {
			w.addEvent('fullyvisible', fn);
		}
		else {
			fn();
		}
		// if chat window not visible, wait until it becomes so before going ahead:
		window.addEvent('scroll', fireVisible); fireVisible();
		function fireVisible(){
			if(w.isFullyVisible() && !c.options.visible){
				(function(){
					if(w.isFullyVisible() && !c.options.visible){
						w.fireEvent('fullyvisible');
						c.options.visible = true;
					}
				}).delay(c.scrollSensitivity);
			}
			else if(!w.isFullyVisible()) {
				c.options.visible = false;
			}
		}
	},
	step: function(){
		var c = this, ch = c.bubbleChain;
		if(ch[0] && !c.isDuplicateBubble(ch[0].properties.id)){
			c.follow(function(){ c.link(); });
		}
	},
	link: function(){
		var c = c || this,
			ch = c.bubbleChain,
			bl = c.bubbleLog,
			at = c.options.animationTime,
			wait = wait || 0;

		if(ch[0]){
			if(ch[0].properties.bubbleDelay > at*2){
				(function(){ c.waitBubble(c.options.chatWindow); }).delay(at);
			}
			bubble.delay(ch[0].properties.bubbleDelay);
			function bubble(){
				if(ch[0] && ch[0].properties.content && !c.isDuplicateBubble(ch[0].properties.id)){
					bl.push(ch[0]);
					c.createBubble();
				}
			}
		}
		else {
			//console.log('repeat');
		}
	},
	createBubble: function(){
		var c = this,
			ch = c.bubbleChain,
			bl = c.bubbleLog,
			cssClass = ch[0].options.cssClass || c.options.cssClass || '',
			content = ch[0].properties.content || '...',
			blLoc = c.findBubbleId(bl, ch[0].properties.id),
			contentLength = ch[0].properties.content.stripTags().length, date = (new Date());

		// create bubble element:
		var chatBubble = new Element('div', {
			'class': 'chatBubble preBubble ' + cssClass,
			'html': '<span class="bubbleContent">' + content + '</span>',
			'title': date.format('Message delivered at %l:%M%p'),
			'style': 'transform:none'
		}).inject(c.options.chatWindow.getChildren('.bubbleTyping')[0], 'before');

		chatBubbleWidth = chatBubble.getChildren('.bubbleContent')[0].getSize().x;
		chatBubble.setStyle('transform', '');

		// set smart width fo the text bubble:
		chatBubble.setStyle('width', chatBubbleWidth + 33 );
		if(contentLength < c.options.mediumBubble.charLength[1] && contentLength > c.options.mediumBubble.charLength[0]){
			chatBubble.setStyle('width', c.options.mediumBubble.width);
		}
		c.insertBubble(chatBubble);
		bl[blLoc].timestamp = date.getTime();

		(function(){
			ch.shift();
			c.step();
		}).delay(bl[blLoc].bubbleDelay);
	},
	insertBubble: function(chatBubble){
		var w = this.options.chatWindow, at = this.options.animationTime;
		(function(){ w.getChildren('.bubbleTyping').addClass('preBubble'); }).delay(0); // (at/2)
		(function(){ chatBubble.removeClass('preBubble'); }).delay(at);
		(function(){
			(function(){ new Fx.Scroll(w).toBottom(); }).delay(at);
			chatBubble.addClass('showContent');
			chatBubble.getElements('input').each(function(el,i){
				el.focus();
			});
		}).delay(at*2);
	},
	waitBubble: function(){
		var w = this.options.chatWindow, at = this.options.animationTime;
		(function(){
			w.getChildren('.bubbleTyping').removeClass('preBubble');
			(function(){ new Fx.Scroll(w).toBottom(); }).delay(at);
		}).delay(at);
	},
	guid: function() {
		function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	},
	findBubbleId: function(chain, key){
		var result = false;
		chain.each(function(el,i){
			if (el.properties && el.properties.id == key) {
				result = i;
			}
		});
		return result;
	},
	isDuplicateBubble: function(id){
		var c = this, ch = c.bubbleChain;
		if(!c.findBubbleId(ch, id) && !c.findBubbleId(c.bubbleLog, id))
			return false;
		else return true;
	},
	initialize: function(options){
		this.setOptions(options);
		Element.implement({
			isFullyVisible: function() {
				if(this.isVisible()) {
					var coord = this.getCoordinates(), wS = window.getScroll(), wH = window.getSize();
					return (wS.y <= coord.top && wS.y + wH.y >= (parseInt(coord.bottom) - 70 ));
				} else {
					return false;
				}
			}
		});
	}
});
