// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Loaded');
});

var curTab_start = new Date().getTime();
var curTab;


function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}




function updateTime(newTab){
  var timeNow = new Date().getTime(); 
  
  if (curTab == null){
    console.log("curTab was null");
  }
  else{

  var domain = getDomain(curTab.url);
  var timeAccum = localStorage[domain]; //The time previously saved for this url
  if (isNaN(timeAccum))   //Presumably because this url hasn't been visited before
    timeAccum = 0;


  var updatedAccum = parseInt(timeNow)-parseInt(curTab_start) + parseInt(timeAccum);
  chrome.tabs.sendMessage(curTab.id, {greeting: "getOpac"}, function(response) {
    console.log("farewell " + response.farewell);
    localStorage.setItem("opacity://" + domain, response.farewell);
  });
  localStorage.setItem(domain, updatedAccum);
  localStorage.setItem("time://" + domain, timeNow);

  
  console.log("domain " + domain + " has added " + (timeNow - curTab_start) + "ms for a total of " + updatedAccum);
  }
  curTab = newTab;
  curTab_start = timeNow;
  chrome.tabs.executeScript(null, {file:"black.js"});
  // chrome.tabs.sendMessage(newTab.tabId, {greeting: "1"}, function(response) {
  //   console.log(response.farewell);
  // });
  var nd = getDomain(newTab.url);
  curOpac = localStorage["opacity://" + nd];
  console.log('logic saved opac = ' + curOpac);
  var oldTime = localStorage["time://" + nd];
  var timeDiff = timeNow - oldTime;
  if(!curOpac || curOpac == undefined || isNaN(curOpac)) {

  }
  else {
    curOpac = Math.min(1, Math.max(0,curOpac) + (timeDiff/1000)*.02);
  }
  
  chrome.storage.local.get("watchedSites", function(data){
      if(data.watchedSites.indexOf(domain) != -1) {
        chrome.tabs.sendMessage(newTab.id, {greeting: curOpac});
      }
  });
}

function getDomain(url){

  var re = new RegExp(":\/\/(.[^/]+)");
  var more = url.match(re)[1].split(".");
  ret = more[more.length-2];
  if (ret == null)
    ret = "other";
  return ret;
}

//When a different tab takes focus
chrome.tabs.onActivated.addListener(function(activeInfo) {
  
    console.log("Activated tab is " + activeInfo.tabId);
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    updateTime(tab);
  });

});

//Usually, when a tab changes url
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('Tab updated' + tabId);
  console.log("new tab url " + tab.url);
  if (tab == "undefined")
    console.log("Updated tab is undefined");
  updateTime(tab);
});

chrome.windows.onFocusChanged.addListener(function(windowId) {

console.log("new windowFocus: " + windowId + " none is (" + chrome.windows.WINDOW_ID_NONE + ")");
if (windowId == chrome.windows.WINDOW_ID_NONE)
  updateTime(null);
else
    chrome.tabs.query({active:true , currentWindow:true}, function(result) {
      updateTime(result[0]);
  });

});








