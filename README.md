# 🤖 chat-bubble
[![npm version](https://badge.fury.io/js/chat-bubble.svg)](https://badge.fury.io/js/chat-bubble) 
[![GitHub version](https://badge.fury.io/gh/dmitrizzle%2Fchat-bubble.svg)](https://badge.fury.io/gh/dmitrizzle%2Fchat-bubble)

> Simple chatbot UI for the Web with JSON scripting.

![Screenshot](screenshot.gif?raw=true)

- Super-easy to install & use. Here's the [tutorial bot](https://dmitrizzle.github.io/chat-bubble/index.html) to help you get started. Or watch [this video](https://www.youtube.com/watch?v=fkJ935a7VSk).
- 1KB GZipped.
- No dependencies. Written with ES5 (compatible with IE11+, Edge + modern browsers).

## [[WATCH THE TUTORIAL VIDEO](https://www.youtube.com/watch?v=fkJ935a7VSk)]

## [SIMPLE] Usage
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

## Usage with build tools
`npm install chat-bubble` or `yarn add chat-bubble`

#### ES6 imports & quickstart
```javascript
import { Bubbles, prepHTML } from "./node_modules/chat-bubble/component/Bubbles.js"

// HTML is ready-build for you here
prepHTML()
// if you have a different dir structure from the example in the import method above pass it as an option:
// prepHTML({relative_path: "./node_modules_dir_name/chat-bubble/"})
// You can also specify a different ID name for the container div (default is "chat"):
// prepHTML({container: "my_chatbox_id"})

// this is your JSON conversation structure; see tutorial video & examples for more info
const convo = { "ice": { "says": [ "Hi" ] } }

// set up the chatbot script
const givemeBubbles = new Bubbles(
	document.getElementById('chat'), 	// attach chatbot to placeholder above ^^
	"givemeBubbles",										// you need to pass the name of the constructor variable that evokes Bubble function here
);

// pass JSON to your function and you're done!
givemeBubbles.talk(convo);
```


## How to contribute:
If you'd like to contribute, please submit an issue, PR or ping me on twitter: [@dmitrizzle](https://twitter.com/dmitrizzle)

### Who uses chat-bubble?
- **[Archie.AI](https://www.archie.ai)**
- If you'd like to add your site, pls submit a PR to this README.md ✌️
