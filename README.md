# draft-pro

helping you be really efficient at losing your fantasy football league

#### design

```
"matches": ["*://football.fantasysports.yahoo.com/draftclient/*"],
```

* small go server, accepts POST requests to update current player name
* serves some programmable stat set
* displayed as small dropdown within Electron dock app

trick is getting current player info into server. for yahoo it should look something like this:

```js
let player = null;

setInterval(() => {
  var node = document.querySelector('#ys-auction-draft-controls .ys-player .Fw-500')

  if (node && node.textContent !== player) {
    player = node.textContent
    // post to server here
    console.log('player changed to:', player)
  }
}, 200)
```

notes

get player

```js
var z = document.querySelector('#ys-auction-draft-controls .ys-player .Fw-500')
z.textContent
> "Alex Collins"
```
