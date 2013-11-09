// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Loaded');
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('Tab updated' + tabId);
  if(changeInfo.url) {
    console.log("Now url: " + changeInfo.url);
  }
});
