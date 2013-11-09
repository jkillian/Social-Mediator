// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Loaded');
});

var curTab_start = new Date().getTime();
var curTab;
localStorage.clear();



function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

//Usually, when a tab changes url
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('Tab updated' + tabId);
  console.log("new tab url " + tab.url);
  if (tab == "undefined")
    console.log("Updated tab is undefined");
  updateTime(tab);
});


function updateTime(newTab){
  if (curTab == null){
    curTab = newTab;
    curTab_start = new Date().getTime();
    return;
  }
  var timeNow = new Date().getTime(); 
  var timeAccum = localStorage[curTab.url]; //The time previously saved for this url
  if (isNaN(timeAccum))   //Presumably because this url hasn't been visited before
    timeAccum = 0;


  var updatedAccum = parseInt(timeNow)-parseInt(curTab_start) + parseInt(timeAccum);
  localStorage.setItem(curTab.url, updatedAccum);
  console.log("url " + curTab.url + " has added " + (timeNow - curTab_start) + "ms for a total of " + updatedAccum);

  curTab = newTab;
  curTab_start = timeNow;

}

//When a different tab takes focus
chrome.tabs.onActivated.addListener(function(activeInfo) {
  
    console.log("Activated tab is " + activeInfo.tabId);
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    if (tab == undefined)
      console.log("Updated tab is undefined");
    updateTime(tab);
  });

});


//When a tab closes
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {

console.log("removed " + tabId)

});

chrome.windows.onFocusChanged.addListener(function(windowId) {

console.log("new windowFocus: " + windowId + " none is (" + chrome.windows.WINDOW_ID_NONE + ")");

});








