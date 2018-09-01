// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     // listen for messages sent from background.js
//     // if (request.message === 'hello!') {
//       console.log(request.url) // new url is now in content scripts!
//     // }
// });

// let isDrafting = false;
//
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // read changeInfo data and do something with it
//     // like send the new url to contentscripts.js
//     isDrafting =
//       window.location.host === 'football.fantasysports.yahoo.com'
//         && window.location.pathname.includes('draftclient')
//     //
//     // console.log(changeInfo)
//     // console.log(changeInfo.url)
//     // if (changeInfo.url) {
//     //   chrome.tabs.sendMessage(tabId, {
//     //     message: 'hello!',
//     //     url: changeInfo.url
//     //   })
//     // }
//   }
// );
//
// window.onhashchange = function(e) {
// }


window.onload = () => {
  // chrome.browserAction.setBadgeText({text: 'draft'});
  let isDrafting = false;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    const activeTab = tabs[0];
    isDrafting = activeTab.url.includes('football.fantasysports.yahoo.com/draftclient')
    console.log('isDrafting', isDrafting)

    if (isDrafting) {
      document.querySelector('#status').textContent = 'drafting!';
      document.querySelector('#open-popup').disabled = false;
    }
  });

  document.querySelector('#open-popup').addEventListener('click', (e) => {
    chrome.windows.create({
        url: 'popup.html',
        type: 'panel',
        width: 400,
        height: 300
    });
  })
}
