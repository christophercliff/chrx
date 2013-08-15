var _ = require('underscore')
var chrome = require('../chrome')
var util = require('../util')

exports.getActive = getActive

function getActive(callback) {
    _.isFunction(callback) || (callback = util.fn)
    chrome.windows.getLastFocused({
        populate: true
    }, function(w){
        if (!w) return callback(new Error('window does not exist'))
        return callback(null, w)
    });
}
