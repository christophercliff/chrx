# chrx

__chrx__ is a collection of CommonJS modules for developing Chrome Extensions. This project is an attempt to collect some useful abstractions for developing Chrome Extensions and distribute them via [`npm`](https://npmjs.org/).

## Installation

Install via [`npm`](https://npmjs.org/package/chrx):

```
$ npm install chrx
```

## Usage

Reference using `require`:

```js
var chrx = require('chrx')
```

__chrx__ is designed to be used with [browserify](http://browserify.org/) (or [watchify](https://github.com/substack/watchify)). This approach is demonstrated in the [included examples](https://github.com/christophercliff/chrx/tree/master/examples). It's also explained in this [Chrome Apps Office Hours video](https://www.youtube.com/watch?v=gkb_x9ZN0Vo).

## Background API

Modules and methods for use in [background](http://developer.chrome.com/extensions/background_pages.html) or [event](http://developer.chrome.com/extensions/event_pages.html) scripts.

- [`tabs.getActive()`](#getactiveoptions-callback)
- [`tabs.executeScripts()`](#executescriptsoptions-callback)
- [`tabs.executeScriptsInActive()`](#executescriptsinactiveoptions-callback)
- [`window.getActive()`](#getactivecallback)

### `tabs.getActive([options][, callback])`

Gets the active tab in the active window.

```js
tabs.getActive(function(err, tab){})
```

#### options

- `protocol`

### `tabs.executeScripts(options[, callback])`

Executes content scripts in a tab.

```js
tabs.executeScripts({
    tab: tab,
    scripts: ['underscore.js', 'jquery.js']
}, function(err, tab){})
```

#### options

- `tab` (required)
- `scripts` (required)
- `runAt`

### `tabs.executeScriptsInActive(options[, callback])`

Executes content scripts in the active tab.

```js
tabs.executeScriptsInActive({
    scripts: ['underscore.js', 'jquery.js']
}, function(err, tab){})
```

#### options

- `scripts` (required)
- `runAt`

### `window.getActive([callback])`

Gets the active window.

```js
window.getActive(function(err, win){})
```

## Content API

Modules and methods for use in [content](http://developer.chrome.com/extensions/content_scripts.html) scripts.

- [`frame.create()`](#)
- [`frame.parent()`](#)

### `frame.create(options)`

Creates an iframe in in the web page. This is useful for creating sandboxed overlay applications that run on top of the current page.

```js
var f = frame.create({
    src: 'pages/menu.html',
    css: {
        left: '10px',
        top: '10px',
        width: '100px',
        height: '100px'
    }
})
```

#### options

- `src` (required)
- `css`

### `f.on(event[, callback])`

Bind a callback function to the frame. The callback will be invoked whenever the event is fired.

```js
f.on('hide', f.hide)
```

### `f.trigger(event[, *args])`

Triggers callbacks for the given event. Subsequent arguments to trigger will be passed along to the event callbacks.

```js
f.trigger('alert', 'Hello!')
```

### `frame.parent()`

Creates an object that is "bound" to the parent context. Used in the context of a child frame, this object allows for simple two-way communication with the parent.

```js
var p = frame.parent()
```

### `p.on(event[, callback])`

Bind a callback function to the frame. The callback will be invoked whenever the event is fired.

```js
p.on('alert', displayAlertInsideTheFrame)
```

### `p.trigger(event[, *args])`

Triggers callbacks for the given event. Subsequent arguments to trigger will be passed along to the event callbacks.

```js
p.trigger('hide')
```

## Tests

Install dependencies and run:

```
$ npm install
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/chrx/blob/master/LICENSE.md) for details.
