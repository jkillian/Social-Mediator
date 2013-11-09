chrome.browserAction.onClicked.addListener(function(tab) {
   console.log("clicked button");

   chrome.tabs.create({url: "statsPage.html"});
});