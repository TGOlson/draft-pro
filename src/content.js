// function startLoop(cb) {

const state = {
  clearLoop: null,
  querySelector: '#ys-auction-draft-controls .ys-player .Fw-500'
};

const handleAction = (action) => {
  switch(action.type) {
    case 'SET_ACTIVE': {
      if(action.active) {
        state.clearLoop = runLoop(state.querySelector, (v) => console.log('found new value', v))
      } else {
        state.clearLoop();
        state.clearLoop = null;
      }

      return;
    }

    default: console.log('Unknown action: ', action);
  }
}

window.onload = function() {
  console.log('running content script');
  chrome.runtime.onMessage.addListener(handleAction);
}

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log('got message', request);
//     // var data = request.data || {};
//     //
//     // var linksList = document.querySelectorAll('a');
//     // [].forEach.call(linksList, function(header) {
//     //     header.innerHTML = request.data;
//     // });
//     // sendResponse({data: data, success: true});
// });

// let player = null;
//
const findNodeText = (querySelector) => {
  var node = document.querySelector(querySelector)
  return node && node.textContent;
}

const runLoop = (querySelector, onChange) => {
  console.log('using query selector', querySelector);

  let value = findNodeText(querySelector);
  console.log('initial value', value);

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
