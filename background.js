chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "content.js"});
 });

   
//function called once the extension is installed
chrome.runtime.onInstalled.addListener( function(){
    let myObjArray = []
      chrome.storage.sync.get(['key'], function(result){
        if(result['key']){
          if(result['key'].length > 0){
            myObjArray = result['key']
          }
        }
        chrome.storage.sync.set({key: myObjArray}, function(){
          console.log('Database successfully initialized.')
          console.log('Amount of keywords loaded: ' + myObjArray.length)
        })
      })
      })