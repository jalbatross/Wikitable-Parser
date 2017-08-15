function parseTagWithTag(sourceCode, openingTag, closingTag) {
console.log("begin");    
//Search for the beginning index where the tag is found
    var beginIndex = sourceCode.search(openingTag);
    //If beginIndex is -1, then there is no tag
    if ( beginIndex === -1){
    	return alert("No tag found");
    }
    endIndex = sourceCode.search(closingTag);
    endIndex += closingTag.length;
    //If endIndex is -1, then there is no closing tag
    if ( endIndex === -1){
    	return alert("No closing tag");
    }
    var returnString = "";
    returnString = sourceCode.slice(beginIndex, endIndex);
    return returnString;   
}

var wordTest = "<td><a href=\"\/wiki\/Achaea\" title=\"Achaea\">Achaea<\/a><sup id=\"cite_ref-1\" class=\"reference\"><a href=\"#cite_note-1\">[1]<\/a><\/sup><\/td>";

console.log(parseTagNoTag(wordTest, "<td>", "</td>"));
console.log("end"); 