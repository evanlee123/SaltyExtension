$(function(){
    chrome.storage.sync.get('time',function(timer){
        $('#timeAllocated').text(timer.time)
    })

    $('#timeAmount').click(function(){
        var time = parseInt($('#amount').val());
        chrome.storage.sync.set({'time': time });
        $('#timeAllocated').text(time);
        $('#amount').val('');
    })


});