var $ = require('jquery-browserify')
var _ = require('underscore')
var chrome = require('../chrome')
var EventEmitter = require('events').EventEmitter
var util = require('../util')

exports.create = create
exports.parent = createParent

var MAX_Z_INDEX = '99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999'
var CSS = {
    display: 'block',
    visibility: 'hidden',
    position: 'fixed',
    left: 0,
    top: 0,
    border: 'none',
    zIndex: MAX_Z_INDEX,
    width: '100%',
    height: '100%'
}
var SIGNATURE = 'e0d77184-5af5-40f1-9e26-f8856fdc2dca'
var CONTENT = 'dd7ebb1c-d58d-48ac-8130-b066c051e74b'

function create(options) {
    util.validate(options, 'src')
    options = options || {}
    options.css = _.defaults((options.css || {}), CSS)
    var $iframe = $('<iframe/>').css(options.css).appendTo(document.body)
    var obj = Object.create(_.extend(EventEmitter.prototype, {
        isLoading: true,
        isVisible: false,
        trigger: function (e) {
            var msg = {}
            msg[SIGNATURE] = e
            msg[CONTENT] = _.toArray(arguments)
            this.$el.get(0).contentWindow.postMessage(msg, '*')
            return this
        },
        show: function () {
            if (this.isLoading || this.isVisible) return
            this.isVisible = true
            this.$el.css({ visibility: 'visible' })
            this.trigger('show')
            return this
        },
        hide: function () {
            if (this.isLoading || !this.isVisible) return
            this.isVisible = false
            this.$el.css({ visibility: 'hidden' })
            this.trigger('hide')
            return this
        }
    }))
    $iframe
        .attr('src', [chrome.extension.getURL(options.src), '#', TAB_ID].join('') )
        .load(function(){
            process.nextTick(function(){
                obj.isLoading = false
                obj.emit('load')
            })
        })
    obj.$el = $iframe
    window.addEventListener('message', function(e){
        if (!e.data[SIGNATURE]) return
        obj.emit.apply(obj, e.data[CONTENT])
    })
    return obj
}

function createParent() {
    var obj = Object.create(_.extend(EventEmitter.prototype, {
        trigger: function (e) {
            var msg = {}
            msg[SIGNATURE] = e
            msg[CONTENT] = _.toArray(arguments)
            window.parent.postMessage(msg, '*')
            this.emit.apply(this, arguments)
            return this
        }
    }))
    window.addEventListener('message', function(e){
        if (!e.data[SIGNATURE]) return
        obj.emit.apply(obj, e.data[CONTENT])
    })
    return obj;
}
