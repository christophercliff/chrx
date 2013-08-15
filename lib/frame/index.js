var $ = require('jquery-browserify')
var chrome = require('../chrome')
var util = require('../util')

exports.create = create

var MAX_Z_INDEX = '99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999'
var CSS = {
    visibility: 'hidden',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: MAX_Z_INDEX,
    width: '100%',
    height: '100%'
}

function create(options) {
    util.require(options, 'src')
    options = options || {}
    _.defaults(options.css, CSS)
    return var $frame = $('<iframe/>')
        .css(options.css)
        .attr('src', chrome.extension.getURL(options.src))
}

var frame = frame.create({ src: 'frame.html' })

frame
    .on('load', frame.show)
    .on('message', onMessage
    .on('error', onError)

$(document.body)
    .append(frame)
