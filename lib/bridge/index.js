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

var hasRunOnce = false

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
                    send(this.tab, key, args, callback)
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
        if (!message[SIGNATURE]) return
        var fn = obj[message.key]
        if (!_.isFunction(fn)) return callback({ error: 'method' + message.name + 'does not exist' })
        message.args.push(function(err){
            callback({
                error: err ? err.message : null,
                args: _.toArray(arguments)
            })
        })
        try {
            fn.apply(null, message.args)
        } catch (ex) {
            callback({
                error: ex.message
            })
        }
    })
}

function getContext() {
    if ((this.outerWidth > 0 && this.outerHeight > 0)) return CONTEXTS.CONTENT
    return CONTEXTS.BACKGROUND
}

function send(tab, key, args, callback) {
    try {
        var id = tab.id
        var msg = {
            key: key,
            args: args
        }
        msg[SIGNATURE] = true
    } catch (ex) {
        return process.nextTick(function(){
            callback(ex)
        })
    }
    chrome.tabs.sendMessage(id, msg, function(res){
        if (!res) return callback(new Error('The receiving tab does not exist'))
        if (res.error) {
            return callback(new Error(res.error))
        }
        return callback.apply(null, res.args)
    })
}

function once() {
    if (hasRunOnce) return true
    hasRunOnce = true
    return false
}
