window.onload = function() {
  const sendMessage = (msg) => {
    chrome.tabs.query({active: true, currentWindow: false}, (tabs) => {
      const realTabs = tabs.filter(tab => tab.url != 'chrome://extensions/')
      const tabId = realTabs[0].id;
      console.log('sending message to tabid', tabId, msg)
      chrome.tabs.sendMessage(tabId, msg);
    });
  }
  console.log('extension active');


  const state = {
    active: false,
  };

  document.querySelector('#toggle-active').addEventListener('click', (e) => {
    state.active = !state.active
    sendMessage({type: 'SET_ACTIVE', active: state.active});
    //
    if (state.active) {
      document.querySelector('#active').innerText = 'Running!'
      document.querySelector('#toggle-active').innerText = 'Disable'
    //
    //   clear = startLoop(player => {
    //     console.log('found player', player);
    //     document.querySelector('#current-player').innerText = player
    //   });
    //
    } else {
      document.querySelector('#active').innerText = 'Not running!'
      document.querySelector('#toggle-active').innerText = 'Enable'
      document.querySelector('#current-player').innerText = 'none'
    //   clear();
    //   clear = null;
    //   player = null;
    }
  })

  document.querySelector('#query-selector').addEventListener('change', (e) => {
    console.log(e)
  });
}
