chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({'saltLatency': 2, 'saltDownloadThroughput':30 * 1024 * 1024, 'saltUploadThroughput': 15 * 1024 * 1024}, function(){
        
    });
});

chrome.alarms.onAlarm.addListener(function(alarm){
    if (alarm.name == "SaltyTimer"){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs){
            var tab = tabs[0];
            var debuggeeId = { tabId: tab.id};
            chrome.storage.sync.get(['saltLatency','saltDownloadThroughput','saltUploadThroughput','saltyTimeUnusable'], function(saltNetworkConditions){
                networkSpeedDecay = Math.pow((0.1/30),1/(parseInt(saltNetworkConditions.saltyTimeUnusable*2)));
                chrome.debugger.sendCommand(debuggeeId, 'Network.emulateNetworkConditions', {
                    offline: 0,
                    latency: saltNetworkConditions.saltLatency/networkSpeedDecay,
                    downloadThroughput: saltNetworkConditions.saltDownloadThroughput*networkSpeedDecay,
                    uploadThroughput: saltNetworkConditions.saltUploadThroughput*networkSpeedDecay
                });
            });
        });
    }
});




chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
    chrome.storage.sync.get('status',function(stat){
        var isOn = false;
        if (stat.status == "On"){
            isOn= true;
        }
        if (changeInfo.url){
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var tab = tabs[0];
                var url = new URL(tab.url);
                var domain = url.hostname;
                if (['www.youtube.com','www.reddit.com','www.twitter.com','www.facebook.com'].indexOf(domain) >=0){
                    initializeTimer();x 
                } else {
                    chrome.alarms.clear("saltyTimer");
                    var debuggeeId = { tabId: tab.id};
                    alert(tab.URL);
                    chrome.debugger.sendCommand(debuggeeId, 'Network.emulateNetworkConditions', {
                        offline: 0,
                        latency: 2,
                        downloadThroughput: 30 * 1024 * 1024,
                        uploadThroughput: 15 * 1024 * 1024
                    });
                    chrome.storage.sync.set({'saltLatency': 2, 'saltDownloadThroughput':30 * 1024 * 1024, 'saltUploadThroughput': 15 * 1024 * 1024}, function(){});
                }
                // `domain` now has a value like 'example.com'
            })
        }
    })
});

function calculateNetworkDecay(total_minutes){
    

}



function initializeTimer(){
    chrome.storage.sync.get(['saltyTimerAllocated','saltyTimeUnsable'],function(timer) {
        chrome.alarms.getAll(function(allAlarms){
            for (alarm in allAlarms){
                if (alarm.name=="saltyTimer"){
                    return;
                }
            }
            chrome.alarms.create("saltyTimer",{"delayInMinutes":timer.saltyTimerAllocated,
                                           "periodInMinutes":0.5});
            alert("timer start");
        });
        
    });
}



