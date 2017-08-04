/**
 * Returns an array of strings correspoding to column titles of
 * a wikitable
 *
 * each column title should be found in <th> HTML tags
 * @param  {array} tr      array of first <TR> tag below the wikitable class
 * @return {array}         array of column titles
 */
function getColumnTitles(tr) {
console.log("begin");    
    var retArray = [];
    var index = 0;
    var arrayTemp = "";
    var toggle = 0;
    
    // If search returns -1 then there are no <tr> tags which means there are no column titles
    if ( tr.search("<th>") === -1){
    	return alert("No column titles found");
    } else {
    	if( toggle === 0){
      	index = tr.search("<th>");
      	index = index + 4;
    		arrayTemp = tr.slice(index);
      	toggle = 1;
      }
      var word = "";
      for (var i = 0; i < arrayTemp.length; i++) {
        if (arrayTemp.charAt(i) === '<') {
        	break;
        }
      	word += arrayTemp.charAt(i);
      }
      retArray.push(word);
    }  
    // While loop to search for each instance of the "<th>" tag. If it's -1, there are no more column titles
    while(arrayTemp.search("<th>") !== -1){
    //Search for the next title
     index = arrayTemp.search("<th>");
     index = index + 4;
     arrayTemp = arrayTemp.slice(index);
      // Make a new array of the remaining words at the next occurence of the "<th>" tag
      word = "";
      for (var i = 0; i < arrayTemp.length; i++) {
        if (arrayTemp.charAt(i) === '<') {
        	break;
        }
      	word += arrayTemp.charAt(i);
      }
      retArray.push(word);
	}
  return retArray;
}

var wordTest = "<tr><th>Latin Name</th><th>Current Name</th></tr><tr>";

console.log(getColumnTitles(wordTest));
console.log("end"); 