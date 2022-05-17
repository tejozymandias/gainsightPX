
const currentDomain = document.domain;
document.getElementById('ratingBtn').addEventListener("click", function() {
  setTimeout(()=>{
    document.cookie = 'apt.sid="";expires=Thu, 01 Jan 1970 00:00:00 UTC;domain='+currentDomain+'; path=/';
	console.log('reset apt.sid ccokie');   
  },2000);
});

function kcbShow() {
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



