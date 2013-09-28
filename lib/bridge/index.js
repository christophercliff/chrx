var _ = require('underscore')
var chrome = require('../chrome')
var own = require('own')

var SIGNATURE = 'asdf'
var CONTEXTS = {
    BACKGROUND: 'BACKGROUND',
    CONTENT: 'CONTENT'
}
var CONTEXT = getContext()

exports.connect = connect
exports.share = share
exports.getContext = getContext

function connect(tab) {
    if (CONTEXT !== CONTEXTS.BACKGROUND) throw new Error('method must be run in background context')
    return Object.create({

        use: function (obj) {
            var self = this
            _.forEach(obj, function(val, key){
                if (!_.isFunction(val)) return
                self[key] = function () {
                    var args = _.toArray(arguments)
                    var callback = args.pop()
                    send(key, args, callback)
                }
            })
            return self
        }

    }, own({
        tab: tab,
        fn: {}
    }))
}

function share(obj) {
    if (CONTEXT !== CONTEXTS.CONTENT) throw new Error('method must be run in content context')
    if (once()) return
    chrome.runtime.onMessage.addListener(function(message, sender, callback){
        if (!method[SIGNATURE]) return
        var fn = obj[message.key]
        if (!_.isFunction(fn)) return callback({ error: 'Method' + message.name + 'does not exist' })
        message.args.push(function(){
            callback({
                error: null,
                args: _.toArray(arguments)
            })
        })
        fn.apply(null, message.args)
    })
}

function getContext() {
    if ((this.outerWidth > 0 && this.outerHeight > 0)) return CONTEXTS.CONTENT
    return CONTEXTS.BACKGROUND
}

function send(tab, key, args, callback) {
    var msg = {
        key: key,
        args: args
    }
    msg[SIGNATURE] = true
    chrome.tabs.sendMessage(tab.id, msg, function(res){
        if (!res) return callback(new Error('The receiving tab does not exist'))
        if (res.error) return callback(res.error)
        return callback.apply(null, res.args)
    })
}

var hasRunOnce = false

function once() {
    if (hasRunOnce) return true
    hasRunOnce = true
    return false
}
