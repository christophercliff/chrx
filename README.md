# chrx

__chrx__ is a collection of CommonJS modules for developing Chrome Extensions. The [`chrome.*` APIs](http://developer.chrome.com/extensions/api_index.html) provided in Chrome are powerful, but their complexity can make simple tasks rather difficult. This project is an attempt to collect some common abstractions and distribute them via [`npm`](https://npmjs.org/).

## API

## [`tabs`](#tabs-1)

- [`getActive()`](#getactiveoptions-callback)
- [`executeScripts()`](#executescriptsoptions-callback)
- [`executeScriptsInActive()`](#executescriptsinactiveoptions-callback)

## [`window`](https://github.com/christophercliff/chrx#window-1)

- [`getActive()`](#getactivecallback)

## `tabs`

### `getActive([options][, callback])`

Gets the active tab in the active window.

```js
chrx.tabs.getActive(function(err, tab){})
```

#### options

- `protocol`

### `executeScripts(options[, callback])`

Executes content scripts in a tab.

```js
chrx.tabs.executeScripts({
    tab: tab,
    scripts: ['underscore.js', 'jquery.js']
}, function(err, tab){})
```

#### options

- `tab` (required)
- `scripts` (required)
- `runAt`

### `executeScriptsInActive(options[, callback])`

Executes content scripts in the active tab.

```js
chrx.tabs.executeScriptsInActive({
    scripts: ['underscore.js', 'jquery.js']
}, function(err, tab){})
```

#### options

- `scripts` (required)
- `runAt`

### `getActive([callback])`

Gets the active window.

```js
chrx.window.getActive(function(err, win){})
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/chrx/blob/master/LICENSE.md) for details.
