// chrome.runtime.onInstalled.addListener(function() {
//   console.log("Extension starting up!");
//
//   chrome.browserAction.setBadgeText({text: 'ON'});
//   chrome.pageAction.show();
// });
//
// chrome.runtime.onMessage.addListener(function(req, sender) {
//   // chrome.storage.local.set({'address': req.address})
//   chrome.pageAction.show(sender.tab.id);
//   chrome.pageAction.setTitle({tabId: sender.tab.id, title: req.address});
// });
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // read changeInfo data and do something with it
//     // like send the new url to contentscripts.js
//     console.log(tabId, changeInfo, tab)
//     console.log(tab.url)
//     if (tab.url && tab.url.includes('football.fantasysports.yahoo.com/draftclient')) {
//       chrome.tabs.sendMessage(tabId, {action: 'SET_BADGE', value: 'draft'});
//       chrome.browserAction.setBadgeText({text: 'draft'});
//     } else {
//       chrome.browserAction.setBadgeText({text: ''});
//     }
//   }
// );

chrome.pageAction.onClicked.addListener(() => {
  chrome.windows.create({
      url: 'popup.html',
      type: 'panel',
      width: 400,
      height: 300
  });
})

//
chrome.runtime.onInstalled.addListener(function() {
  // chrome.browserAction.setBadgeText({text: 'draft'});

  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'chrome' },
            // pageUrl: { urlContains: 'football.fantasysports.yahoo.com/draftclient' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log(request);
//     if (request.type == "set_active") {
//       if (request.active) {
//         chrome.browserAction.setBadgeText({text: 'ON'});
//       } else {
//         chrome.browserAction.setBadgeText({text: 'OFF'});
//       }
//     }
//
//     return true;
//   });

// chrome.runtime.onMessage.addListener(function(req, sender) {
//   // chrome.storage.local.set({'address': req.address})
//   chrome.pageAction.show(sender.tab.id);
//   chrome.pageAction.setTitle({tabId: sender.tab.id, title: req.address});
// });
