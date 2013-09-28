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
