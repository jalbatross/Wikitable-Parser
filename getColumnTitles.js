
  Returns an array of strings correspoding to column titles of
  a wikitable
 
  each column title should be found in th HTML tags
  @param  {array} tr      array of first TR tag below the wikitable class
  @return {array}         array of column titles
 
function getColumnTitles(tr) {
console.log(begin);    
    var retArray = [];
    var index = 0;
    var word = ;
    var arrayTemp = ;
    var toggle = 0;
    
     If search returns -1 then there are no tr tags which means there are no column titles
    if ( tr.search(th) === -1){
    	return alert(No column titles found);
    }
   
     While loop to search for each instance of the th tag. If it's -1, there are no more column titles
    while(tr.search(th) !== -1){
    	if( toggle === 0){
    	arrayTemp = tr.slice(tr.search(th));
      toggle = 1;
      }
    	index = tr.search(th);
      index = index + 4;
      
      Make a new array of the remaining words at the next occurence of the th tag
      arrayTemp = arrayTemp.slice(index);
      word = ;
      console.log(index);
      console.log(arrayTemp);
      for (var i = 0; i  arrayTemp.length; i++) {
        if (arrayTemp.charAt(i) === '') {
        	break;
        }
      	word += arrayTemp.charAt[i];
        console.log(word);
      }
      retArray.push(word);
	}
  return retArray;
}

var wordTest = trthLatin NameththCurrent Namethtrtr;

console.log(getColumnTitles(wordTest));
console.log(end);    