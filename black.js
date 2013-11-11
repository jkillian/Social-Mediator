/* Do nothing for now, feature not complete
var elem = document.getElementsByTagName("body")[0];
var intTimer;

function doSomething ()
{
  curOpac = curOpac - .025;
  if (curOpac < 0)
  	return;
  console.log("new Opac " + curOpac);
  elem.style.opacity = curOpac;

  //setTimeout ( "doSomething()", 500 );
}

 //  if(!window['added']) 
   {
      console.log('added');
      added  = true;
      chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   if (request.greeting == "getOpac"){
      sendResponse({farewell: elem.style.opacity});
      clearInterval(intTimer);
      return true;
   }
    curOpac = parseFloat(request.greeting);
    console.log("received curOpac " + curOpac);
    if (!curOpac || isNaN(curOpac)){
      console.log("isNan");
      curOpac = 1;
    }

    console.log("Start fade");
    elem.style.opacity = curOpac;
    clearInterval(intTimer);
    intTimer = setInterval ( "doSomething()", 100 );
    //setTimeout(doSomething, 100, [curOpac]);

  });

}
*/