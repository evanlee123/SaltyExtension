$(function(){
    chrome.storage.sync.get(['saltyTimeAllocated','saltyTimeUnsable'],function(timer){
        $('#timeAllocated').text(timer.saltyTimeAllocated);
        $('#timeUnusable').text(timer.saltyTimeUnusable);
    });

    $('#reset').click(function(){
        chrome.storage.sync.set({'saltyTimeAllocated': 17, 
                                 'saltyTimeUnusable': 5});
        $('#timeUnusable').text(5);
        $('#timeAllocated').text(17);
    });

    $('#timeAmount').click(function(){
        var timeAllocated = parseInt($('#amount').val());
        var timeUnusable = parseInt($('#unusableAmount').val());       
        
        if (isNaN(timeAllocated)){
            timeAllocated = parseInt($('#timeAllocated').text());
        }
        if (isNaN(timeUnusable)){
            var timeUnusable = parseInt($('#timeUnusable').text());
        }

        chrome.storage.sync.set({'saltyTimeAllocated': timeAllocated, 
                                 'saltyTimeUnusable': timeUnusable});

        $('#timeUnusable').text(timeUnusable);
        $('#timeAllocated').text(timeAllocated);
        
    });


});