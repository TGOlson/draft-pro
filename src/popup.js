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
      document.querySelector('#active').innerText = 'running!'
      document.querySelector('#toggle-active').innerText = 'Disable'
    //
    //   clear = startLoop(player => {
    //     console.log('found player', player);
    //     document.querySelector('#current-player').innerText = player
    //   });
    //
    } else {
      document.querySelector('#active').innerText = 'not running'
      document.querySelector('#toggle-active').innerText = 'Enable'
      document.querySelector('#current-player').innerText = 'none'
    //   clear();
    //   clear = null;
    //   player = null;
    }
  })

  document.querySelector('#query-selector').addEventListener('keyup', (e) => {
    sendMessage({type: 'SET_QUERY_SELECTOR', selector: e.target.value})
  });

  const handleAction = (action) => {
    console.log('received action from content script', action);

    switch(action.type) {
      case 'VALUE_CHANGE': {
        document.querySelector('#current-player').innerText = (action.value && action.value.trim()) || 'none'
        break;
      }

      default: console.log('Unknown action: ', action);
    }
  }

  chrome.runtime.onMessage.addListener(handleAction);
}
