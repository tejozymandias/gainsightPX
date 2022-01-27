


function kcbshow() {
    aptrinsic('kcb', 'show', {
        onDone: console.log,
        onError: console.error
      });
}

function kcbOpen() {
    aptrinsic('kcb', 'open', {
        onDone: console.log,
        onError: console.error
      });
}

function kcbHide() {
    aptrinsic('kcb', 'hide', {
        onDone: console.log,
        onError: console.error
      });
}

function kcbClose() {
    aptrinsic('kcb', 'close', {
        onDone: console.log,
        onError: console.error
      });
}