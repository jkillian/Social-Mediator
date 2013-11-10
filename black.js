curOpac = 1;
var elem = document.getElementsByTagName("body")[0];

function doSomething (curOpac)
{
  var newOpac = parseFloat(curOpac) - .25;
  if (newOpac < 0)
  	return;
  console.log("new Opac " + newOpac);
  elem.style.opacity = newOpac;

  setTimeout ( "doSomething(" + newOpac + ")", 1000 );
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	alert('message receieved!');
    curOpac = parseFloat(request.greeting);
    elem.style.opacity = curOpac;
    setTimeout ( "doSomething(" + curOpac + ")", 1000 );
  });