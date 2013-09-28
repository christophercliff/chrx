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
