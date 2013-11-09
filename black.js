var elem = document.getElementsByTagName("body")[0];
elem.style.opacity = 1;

setTimeout ( "doSomething(1)", 1000 );
function doSomething (curOpac)
{
  var newOpac = parseFloat(curOpac) - .25;
  if (newOpac < 0)
  	return;
  console.log("new Opac " + newOpac);
  elem.style.opacity = newOpac;

  setTimeout ( "doSomething(" + newOpac + ")", 1000 );
}