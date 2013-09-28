# `chrx.bridge`

A pattern for exposing [content script](#) APIs to the background context.

Content scripts have limited access to [`chrome.*` APIs](#), and background scripts have no access to the DOM API. A `bridge` allows you to leverage both the `chrome.*` and DOM APIs in one place.

## Installation

Install via [npm](#):

```
$ npm install chrx-bridge
```

## Usage

Initialize the `bridge` in both the background and the content scripts using a shared module. The bridged API is now accessible from the background context.

```js
// content.js

chrx.bridge.share(require('your-dom-manipulation-api'))

// background.js

var bridge = chrx.bridge.connect(tab).use(require('your-dom-manipulation-api'))

bridge.getElementsByTagName('h1', function(err, elements){})
```

## Background API

### `chrx.bridge.connect(tab)`

Creates a bridge connection to a tab.

```js
var bridge = chrx.bridge.connect(tab)
```

### `bridge.use(api)`

Exposes a shared content-specific API to the background context.

```js
bridge.use(api)
```

## Content API

### `chrx.bridge.share(api)`

Shares a content-specific API with a background context.

```js
chrx.bridge.share(api)
```
