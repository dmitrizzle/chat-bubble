# 💬 chat-bubble
> Simple chatbot UI for the Web with JSON scripting.

![Screenshot](screenshot.gif?raw=true)

- Super-easy to install & use. Here's the [tutorial bot](https://dmitrizzle.github.io/chat-bubble/index.html) to help you get started.
- 1KB GZipped.
- No dependencies. Written with ES5 (compatible with IE11+, Edge + modern browsers).

## Usage
```html
	<div id="chat"></div>
	<script src="./component/Bubbles.js"></script>
	<script>

	var givemeBubbles = new Bubbles(
	    document.getElementById('chat'),
	    "givemeBubbles"
	);

	// pass the JSON script and you're done!
	givemeBubbles.talk({ "ice": { "says": [ "Hi" ] } });
	
	</script>
```
This component comes with styles in multiple CSS files. You can turn them into Styled Components, SASS or whatever. For now it's just vanilla CSS so that this tool can work anywhere, regardless of the environment. See detailed examples in [./component/examples](https://github.com/dmitrizzle/chat-bubble/tree/master/component/examples) folder.

You can also get this package with NPM: `npm install chat-bubble`

## How to contribute:
If you'd like to contribute, please submit an issue, PR or ping me on twitter: [@dmitrizzle](https://twitter.com/dmitrizzle)

### Who uses chat-bubble?
- **[Archie.AI](https://www.archie.ai)**
- If you'd like to add your site, pls submit a PR to this README.md ✌️
