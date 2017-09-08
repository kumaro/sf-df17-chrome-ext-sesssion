"use strict";
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if(!sender.tab && request.tab) sender.tab = request.tab;

    if(request.action === 'BKG-GET-ORG-SID'){

        return chrome.cookies.getAll({"name":"sid","url":sender.tab.url},function (cookies){

            if(!cookies || !cookies.length || !cookies[0].value) return;

            var oid  = cookies[0].value.split('!')[0];

            var message = {
                action: "CNT-SET-ORG-SID", 
                cookies: cookies,
            };
            return chrome.tabs.sendMessage(sender.tab.id,message);
        });
    }
});
