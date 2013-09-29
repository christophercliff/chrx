var _ = require('underscore')
var chrome = require('../chrome')
var util = require('../util')

exports.forceReflow = forceReflow
exports.getActive = getActive
exports.getSize = getSize
exports.getState = getState
exports.setSize = setSize
exports.setState = setState

function forceReflow(id, callback) {
    getSize(id, function(err, size){
        if (err) return callback(err)
        setSize(id, { width: size.width + 1 }, function(err){
            if (err) return callback(err)
            setSize(id, { width: size.width }, callback)
        })
    })
}

function getActive(callback) {
    _.isFunction(callback) || (callback = util.fn)
    chrome.windows.getLastFocused({
        populate: true
    }, function(w){
        if (!w) return callback(new Error('window does not exist'))
        return callback(null, w)
    })
}

function getSize(id, callback) {
    chrome.windows.get(id, null, function(w){
        callback(null, {
            width: w.width,
            height: w.height
        })
    })
}

function getState(id, callback) {
    chrome.windows.get(id, null, function(w){

        try {
            var state = _.clone(w)
            delete state.alwaysOnTop
            delete state.id
            delete state.incognito
            delete state.type
            delete state.state
        } catch (ex) {
            return callback(ex)
        }
        return callback(null, state)
    })
}

function setSize(id, options, callback) {
    options = options || {}
    chrome.windows.get(id, null, function(w){
        chrome.windows.update(w.id, {
            width: options.width || w.width,
            height: options.height || w.height
        }, function(){
            callback(null)
        })
    })
}

function setState(id, options, callback) {
    options = options || {}
    chrome.windows.get(id, null, function(w){
        chrome.windows.update(w.id, options, function(){
            return callback(null)
        })
    })
}
