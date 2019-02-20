# chat-bubble
[![npm version](https://badge.fury.io/js/chat-bubble.svg)](https://badge.fury.io/js/chat-bubble)
![dependencies](https://david-dm.org/dmitrizzle/chat-bubble.svg)
![downloads](https://img.shields.io/npm/dt/chat-bubble.svg)

> Simple chatbot UI for the Web with JSON scripting 👋🤖🤙

![Screenshot](screenshot.gif?raw=true)

- Quick set-up & implementation.
- Works with or without Natural Language Classifiers.
- 1KB GZipped. No dependencies. Written with ES5 (compatible with IE11+).

***

**[Demo](#demos--more-usage-examples)** | [Tutorial Video](https://www.youtube.com/watch?v=fkJ935a7VSk)

***

## Installation
#### Yarn/NPM
`yarn add chat-bubble` or `npm install chat-bubble`

#### Download
Get the .ZIP file [here](https://github.com/dmitrizzle/chat-bubble/archive/master.zip).

## Quick start
This method assumes you've got a development environment running that's capable of transpiling ES6 JavaScript. There's a short guide on how to get one working [here](ENV.md). Otherwise see "[I have no ES6 dev environment](https://github.com/dmitrizzle/chat-bubble/new/master#i-have-no-es6-dev-environment)." This guide will show you how to build [this](https://dmitrizzle.github.io/chat-bubble/examples/1-basics.html).

```javascript
/************************************************************************/
/******* CONVENIENCE METHODS AVAILABLE FOR ES6 BUILD ENVIRONMENTS *******/
/************************************************************************/

// the URL of where you've installed the component; you may need to change this:
import { Bubbles, prepHTML } from "../node_modules/chat-bubble/component/Bubbles.js"

// this is a convenience script that builds all necessary HTML,
// imports all scripts and stylesheets; your container DIV will
// have a default `id="chat"`;
// you can specify a different ID with:
// `container: "my_chatbox_id"` option
prepHTML({relative_path: "../node_modules/chat-bubble/"})


/************************************************************************/
/************************ SAMPLE IMPLEMENTATION *************************/
/************************************************************************/

// initialize by constructing a named function...
const chatWindow = new Bubbles(
    document.getElementById('chat'), // ...passing HTML container element...
    "chatWindow" // ...and name of the function as a parameter
);

// `.talk()` will get your bot to begin the conversation
chatWindow.talk(
  // pass your JSON/JavaScript object to `.talk()` function where
  // you define how the conversation between the bot and user will go
  {
    // "ice" (as in "breaking the ice") is a required conversation object
    // that maps the first thing the bot will say to the user
    "ice": {

      // "says" defines an array of sequential bubbles
      // that the bot will produce
      "says": [ "Hey!", "Can I have a banana?" ],

      // "reply" is an array of possible options the user can pick from
      // as a reply
      "reply" : [
        {
          "question" : "🍌",  // label for the reply option
          "answer" : "banana",  // key for the next conversation object
        }
      ]
    }, // end required "ice" conversation object

    // another conversation object that can be queued from within
    // any other conversation object, including itself
    "banana" : {
      "says" : [ "Thank you!", "Can I have another banana?"],
      "reply": [
        {
          "question": "🍌🍌",
          "answer": "banana"
        }
      ]
    } // end conversation object
  } // end conversation object
);
```

## "I have no ES6 dev environment!"
If you don't want to bother with setting up a development server and transpiler for ES6 code, I get it. Simply unzip the [package](https://github.com/dmitrizzle/chat-bubble/archive/master.zip) and create `index.html` inside of that directory. Then add all the JavaScript that you see below the `/*SAMPLE IMPLEMENTATION*/` comment in the code example above. Replace `const` with `var`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>My chat-bubble Project</title>

	<!-- stylesheets are conveniently separated into components -->
	<link rel="stylesheet" media="all" href="../styles/setup.css">
	<link rel="stylesheet" media="all" href="../styles/says.css">
	<link rel="stylesheet" media="all" href="../styles/reply.css">
	<link rel="stylesheet" media="all" href="../styles/typing.css">
	<link rel="stylesheet" media="all" href="../styles/input.css">
</head>
<body>

<!-- container element for chat window -->
<div id="chat"></div>

<!-- import the JavaScript file -->
<script src="./component/Bubbles.js"></script>
<script>
/************************************************************************/
/**************** add "SAMPLE IMPLEMENTATION" code here *****************/
/************************************************************************/
</script>

</body>
</html>
```
Now open this file in your browser. Done!

## Demos & more usage examples:
1. [Basic example](https://dmitrizzle.github.io/chat-bubble/examples/1-basics.html): see how the code above looks in browser.
2. [Custom starting point](https://dmitrizzle.github.io/chat-bubble/examples/2-custom-starting-point.html): what if you wanted to resume conversation from somewhere other than required `ice:{}` starting point? This is how you'd do it.
3. [Keyboard input](https://dmitrizzle.github.io/chat-bubble/examples/3-keyboard-input.html): a basic plugin-like structure that lets you implement your own keyboard input and text recognition (though it does not process natural language).
4. [Run scripts](https://dmitrizzle.github.io/chat-bubble/examples/4-run-scripts.html): your bot's replies can do things. Not only it could say something, but it could point your user towards an action, or perform it by running JavaScript.
5. Natural Language Classifier implementation (coming soon)
6. [Advanced Flows](https://dmitrizzle.github.io/chat-bubble/examples/6-advanced-flows.html): logical branches, recurring references, contextual guidance.

## FAQ:
- Can I add images and HTML code to my bot?
  - **Yes!** custom graphics, YouTube videos - whatever you want!
- How can I contribute?
  - See the contribution guide [here](CONTRIBUTING.md).

## Browser compatibility
- You may need to add in polyfills for [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) and [`String.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

### Who uses chat-bubble?
- **[Archie.AI](https://www.archie.ai)**
- **[Omer Tarik Koc](https://omertarikkoc.com)**
- If you'd like to add your site, pls submit a PR to this README.md ✌️
