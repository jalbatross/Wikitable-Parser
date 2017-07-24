console.log("begin");
var testArr = "1234456789<table class=\"wikitable sortable\">AAAAAAAAAAAAAAAAAAAAA</table>452543543543543";

function parse(array){
	var beginIndex = array.search("<table class=\"wikitable sortable\">");
  var endIndex = array.search("</table>");
  endIndex = endIndex + 8;
  var newArray = array.slice(beginIndex,endIndex);
  console.log(newArray);
  }
  
 parse(testArr);
 console.log("end");