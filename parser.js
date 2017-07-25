console.log("begin");
var testArr = "32525235</table>1234456789<table class=\"wikitable sortable\">AAAAAAAAAAAAAAAAAAAAA</table>452543543543543";

function parse(array){
	var beginIndex = array.search("<table class=\"wikitable sortable\">");
  var beginArray = array.slice(beginIndex);
  var endIndex =  beginArray.search("</table>");
  endIndex = endIndex + 8;
  var newArray = beginArray.slice(0, endIndex);
  console.log(newArray);
  }
  
 parse(testArr);
 console.log("end");