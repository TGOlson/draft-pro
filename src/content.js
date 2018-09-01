// function startLoop(cb) {

const state = {
  active: false,
  clearLoop: null,
  querySelector: '#ys-auction-draft-controls .ys-player .Fw-500'
};

const onValueChange = (value) => {
  console.log('found new value', value);
  chrome.runtime.sendMessage({type: 'VALUE_CHANGE', value});
}

const setActive = (active) => {
  if(active) {
    state.clearLoop = runLoop(state.querySelector, onValueChange);
  } else {
    state.clearLoop();
    state.clearLoop = null;
  }

  state.active = active;
}

const handleAction = (action) => {
  console.log('received action from background script', action);
  switch(action.type) {
    case 'SET_ACTIVE': {
      setActive(action.active);
      break;
    }

    case 'SET_QUERY_SELECTOR': {
      state.querySelector = action.selector;
      if (state.active) {
        setActive(false);
        setActive(true);
      }

      break;
    }

    default: console.log('Unknown action: ', action);
  }
}

window.onload = function() {
  console.log('running content script');
  chrome.runtime.onMessage.addListener(handleAction);
}

const findNodeText = (querySelector) => {
  let node = null;

  try {
    node = document.querySelector(querySelector)
  } catch(err) {
    console.log('caught error in findNodeText', err);
  }

  return node && node.textContent;
}

const runLoop = (querySelector, onChange) => {
  console.log('using query selector', querySelector);

  let value = findNodeText(querySelector);
  onChange(value);

  const id = setInterval(() => {
    var nextValue = findNodeText(querySelector)
    if (nextValue !== value) {
      // player = node.textContent
      value = nextValue;
      onChange(value);
    }
  }, 200)

  return () => clearInterval(id);
}
