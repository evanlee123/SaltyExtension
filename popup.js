$(function(){
    chrome.storage.sync.set({'status': "On"});
    chrome.storage.sync.get('status',function(activation){
        $('#stat').text(activation.status)
    })

    $('#toggle').click(function(activation){
        chrome.storage.sync.get('status', function(activation){
            var isOn = "On";
            if (activation.status=="On"){
                isOn = "Off"
            }
            chrome.storage.sync.set({'status': isOn });
            $('#stat').text(isOn);
        })
    })
});