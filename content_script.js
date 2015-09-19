var buttonMain = document.querySelector('.playControl');
var playing = false;

setInterval(function() {
  var buttons = document.querySelectorAll('.playControl, .skipControl, .sound__waveform, .sc-button-play, .heroPlayButton');

  [].forEach.call(buttons, function(button) {
    button.removeEventListener('click', onClick)
    button.addEventListener('click', onClick)
  })
}, 500)

function onClick() {
  playing = buttonMain.classList.contains('playing')
  chrome.runtime.sendMessage({
    playing: playing
  });
}

chrome.runtime.onMessage.addListener(function(message, sender) {
  if ((message == 'pause' && playing) ||
      (message == 'play' && !playing)) {
    var e = document.createEvent('Events')
    e.initEvent('click', true, false)
    buttonMain.dispatchEvent(e)
  }
})

window.addEventListener('load', function() {
  setTimeout(function() {
    if (buttonMain.classList.contains('playing')) {
      chrome.runtime.sendMessage({
        playing: true
      });
      playing = true
    }
  }, 1000)
})

window.addEventListener('unload', function() {
  if (playing) {
    chrome.runtime.sendMessage({
      playing: false
    });
  }
})