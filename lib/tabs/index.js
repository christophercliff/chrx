var _ = require('underscore')
var async = require('async')
var chrome = require('../chrome')
var util = require('../util')
var win = require('../window')

exports.getActive = getActive
exports.executeScripts = executeScripts
exports.executeScriptsInActive = executeScriptsInActive

function getActive(options, callback) {
    _.isFunction(options) && (callback = options, options = {})
    _.isFunction(callback) || (callback = util.fn)
    options = _.defaults((options || {}), {
        protocol: /^(http|https):\/\//g
    })
    win.getActive(function(err, w){
        if (err) return callback(err)
        chrome.tabs.query({
            windowId: w.id,
            active: true
        }, function(tabs){
            if (!tabs || tabs.length < 1) return callback(new Error('window does not exist'))
            var tab = tabs[0]
            if (!tab.url.match(options.protocol)) return callback(new Error('protocol is invalid'))
            return callback(null, tab);
        });
    })
}

function executeScripts(options, callback) {
    var series
    _.isFunction(callback) || (callback = util.fn)
    options = _.defaults((options || {}), {
        tab: null,
        scripts: [],
        runAt: 'document_start'
    })
    util.validate(options, 'tab')
    series = _.map(options.scripts, function(s){
        return function (c) {
            chrome.tabs.executeScript(options.tab.id, {
                allFrames: false,
                runAt: options.runAt,
                file: s
            }, function(){
                c(null)
            })
        }
    })
    // Set a global variable TAB_ID
    series.unshift(function(c){
        chrome.tabs.executeScript(options.tab.id, {
            allFrames: false,
            runAt: 'document_start',
            code: 'TAB_ID="' + options.tab.id + '";'
        }, function(){
            c(null)
        })
    })
    async.series(series, function(res){
        return callback(null, options.tab)
    })
}

function executeScriptsInActive(options, callback) {
    _.isFunction(callback) || (callback = util.fn)
    getActive(function(err, tab){
        if (err) return callback(err)
        executeScripts(_.extend((options || {}), {
            tab: tab
        }), callback)
    })
}
