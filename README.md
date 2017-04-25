# 💬 chat-bubble
## A super-simple, tiny script for creating chat bot interfaces

![Screenshot](screenshot.gif?raw=true)

- Super-easy to install & use! Here's the [tutorial bot](https://htmlpreview.github.io/?https://github.com/dmitrizzle/chat-bubble/blob/master/component/examples/0-tutor.html).
- Insanely small footprint, 1KB GZipped.
- No dependencies. Written with ES5, vanilla JavaScript. Works with modern browsers.

### Usage
```html
	<div id="chat"></div>
```

```javascript

	// set up the chatbot script
	var givemeBubbles = new Bubbles(
		document.getElementById('chat'), 	// attach chatbot to placeholder above ^^
		"givemeBubbles"										// you need to pass the name of the constructor variable that evokes Bubble function here
	);

	// pass JSON to your function and you're done!
	givemeBubbles.talk({ "ice": { "says": [ "Hi" ] } });
```
Please see examples and the [tutorial bot](https://htmlpreview.github.io/?https://github.com/dmitrizzle/chat-bubble/blob/master/component/examples/0-tutor.html) link to learn more on how to use this thing.

This component comes with styles in CSS files. They are separated in to multiple files. You can turn them into styled components, SASS or whatever for your convenience. For now it's just vanilla CSS so that this tool can work anywhere, regardless of the environment.

If you'd like to contribute, simply submit an issue, PR or simply ping me on twitter: @dmitrizzle

### Who uses chat-bubble?
[Archie.ai](https://www.archie.ai)
