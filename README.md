# chrx

## CommonJS modules for developing Chrome Extensions

This project is an attempt to collect some reusable modules for developing Chrome Extensions and distribute them via [`npm`](https://npmjs.org/).

At time of writing, everything is pretty experimental and unstable.

## Installation

Install via [`npm`](https://npmjs.org/package/chrx):

```
$ npm install chrx
```

## Usage

__chrx__ is designed to be used with [browserify](http://browserify.org/) (or [watchify](https://github.com/substack/watchify)). This approach is demonstrated in the [included examples](https://github.com/christophercliff/chrx/tree/master/examples).

## Modules

### Background

Modules and methods for use in [background](http://developer.chrome.com/extensions/background_pages.html) or [event](http://developer.chrome.com/extensions/event_pages.html) scripts.

### [`chrx.tabs`](lib/tabs)

Manipulate tabs

### [`chrx.window`](lib/window)

Manipulate windows

### Content

Modules and methods for use in [content](http://developer.chrome.com/extensions/content_scripts.html) scripts.

### [`chrx.frame`](lib/frame)

Create sandboxed Content environments

### Combo

Modules and methods that integrate Background and Content.

### [`chrx.bridge`](lib/bridge)

Create shared Content and Background APIs

## Tests

Install dependencies and run:

```
$ npm install
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/chrx/blob/master/LICENSE.md) for details.
