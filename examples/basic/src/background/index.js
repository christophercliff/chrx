var chrx = require('../../../../')

chrome.browserAction.onClicked.addListener(function(){
    chrx.tabs.executeScriptsInActive({ scripts: ['content.js'] }, function(err){
        if (err) throw err
    })
})
