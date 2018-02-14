# Get your project environment started for `chat-bubble` with Yarn and WebPack
> This readme is based on [this](https://appdividend.com/2017/03/28/beginners-guide-to-setup-es6-development-environment/) guide (no relation).

It's presumed that you have [Yarn](https://yarnpkg.com/lang/en/docs/install/) installed on your system. NPM will work too, but you'll need to switch the commands. This guide does not include versioning (like GitHub) setup which you should probably have as well.

1. Run `yarn init` in your project directory. You can leave all fields blank.
2. Run `yarn add webpack webpack-dev-server babel-core babel-loader babel-preset-es2015 --save-dev`
3. Create `webpack.config.js` in the root of your project directory with the following code:
```javascript
module.exports = {
    entry: './app/main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        port: 3000
    },
    devtool: 'inline-source-map'
};
```
4. Create `index.html` inside the root of your project directory:
 ```html
 <!DOCTYPE html>
 <html lang="en">
 <head>
    <meta charset="UTF-8">
    <title>My chat-bubble Project</title>
 </head>
 <body>
   <script src="./bundle.js"></script>
 </body>
 </html>
```
5. Run `yarn add chat-bubble` and create `/app` direcotry with `main.js` that has the sample code from [README.md](README.md#quick-start).

Now you can run `yarn webpack-dev-server` and open [http://localhost:3000](http://localhost:3000) in your browser to test your project!
