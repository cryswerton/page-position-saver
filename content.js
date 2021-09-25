function containsObject(obj, array) {
    var i;
    for (i = 0; i < array.length; i++) {
        if (array[i].link === obj.link) {
            return true;
        }
    }

    return false;
}

function updateChromeStorage(key, obj) {
	var myObjArray = [];
 
	chrome.storage.sync.get(key, function(result) {
		if (result) { 
			myObjArray = result[key];
		}
 

        if(!containsObject(obj, myObjArray)){
            console.log('It does not exist.')
            myObjArray.push(obj)
            chrome.storage.sync.set({key: myObjArray}, function() {
                console.log(`New object added: ${obj.link}`)
            });
        }else{
            console.log('It already exists, updating the scroll position...')
            obj.scrollP = document.getElementsByTagName("html")[0].scrollTop
            pos = myObjArray.map(function(e) { return e.link; }).indexOf(obj.link)
            myObjArray[pos] = obj
            chrome.storage.sync.set({key: myObjArray}, function() {
                console.log(`Scroll position updated: ${obj.scrollP}`)
            });
             
        }
	});
 }

{
     let link = window.location.href
     let scrollP = document.getElementsByTagName("html")[0].scrollTop
     let obj = {link: link, scrollP: scrollP}
     updateChromeStorage('key', obj)

     chrome.storage.sync.get(['key'], function(result){
        if(result['key'].length > 0){
            let myObjArray = result['key']
            console.log(`Database length: ${myObjArray.length}`)
        }
     })
 }









