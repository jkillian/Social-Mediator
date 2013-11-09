// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Loaded');
});

var time = new Date().getTime();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('Tab updated' + tabId);
  if(changeInfo.url) {
    console.log("Now url: " + changeInfo.url);
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log('activated!' + activeInfo.tabId)
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    var time2 = new Date().getTime();
    console.log('tab url:' + tab.url + " time: " + (time2-time));
    time = time2;
  });
});


chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {

console.log("removed " + tabId)

});

chrome.windows.onFocusChanged.addListener(function(windowId) {

console.log("new windowFocus: " + windowId + " none is (" + chrome.windows.WINDOW_ID_NONE + ")");

});