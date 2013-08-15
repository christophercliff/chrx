var _ = require('underscore')

exports.validate = validate
exports.fn = fn

function validate(obj) {
    _.toArray(arguments).slice(1).forEach(function(p){
        if (!obj.hasOwnProperty(p)) throw new Error('object requires the `' + p + '` property')
    })
}

function fn() {}
