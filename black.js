alert("hi!");
chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });