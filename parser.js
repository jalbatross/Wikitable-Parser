/**
 * parser.js
 *
 * A simple wikitable parser that organizes Wikipedia table entries
 * into convenient objects called WikiData.
 * 
 * by @jalbatross (Joey Albano) and @MichaelTrann (Michael Tran) 
 * July 24, 2017
 */

/**
 * WikiData Constructor. Contains a column of data from a simple 
 * wikitable. 
 *
 * A simple one column wikitable structured as follows:
 *  
 *  Fruits
 *  ------
 *  Banana
 *  Apple
 *  Grape
 *
 *  Could be used to construct the WikiData object myData with
 *  a title of "Fruits" and data of {"Banana", "Apple", "Grape"}
 * 
 * @param {string} title   Column title
 * @param {string[]} data  Column entries
 */
function WikiData(title, data) {
    
    this.title = title;
    this.data = data;
}

/**
 * Parses the first found wikitable on a Wikipedia page into
 * an array of WikiData objects.
 *
 * TODO: Parse all found Wikitables
 *
 * 
 * @param  {string}       webpageStr HTML string of a page
 * @return {WikiData[]}   Array of WikiData objects
 */
function parse(webpageStr) {
    //We need to push WikiData objects into this
    var returnArray = [];

    //find the first wikitable and save its index
    var beginIndex = webpageStr.indexOf("<table class=\"wikitable");

    //find endIndex
    var endIndex = webpageStr.indexOf("</table>", beginIndex);
    endIndex += 8;

    //Extract the table into an object
    var wikitable = webpageStr.slice(beginIndex, endIndex);

    //Find first <tr> after wikiTable starts, it contains our table
    //headers (column titles)
    var firstTrIndex = wikitable.indexOf("<tr");
    var closingTrIndex = wikitable.indexOf("</tr>", firstTrIndex);

    //Get the opening <tr></tr> brackets in a string, then parse
    var openingTrString = wikitable.slice(firstTrIndex, closingTrIndex);
    var columnTitles = getColumnTitles(openingTrString);

    var numColumns = columnTitles.length;

    //Initialize returnArray with numColumns WikiData objects
    for (var i = 0; i < numColumns; i++) {
        returnArray[i] = new WikiData(columnTitles[i], []);
    }

    //TODO: Find the next <tr> after the opening <tr></tr> which contained
    //our column titles. Parse each subsequent <tr> element by assigning
    //the information in each <td> to the appropriate WikiData object
    //in returnArray.
    for (let i = closingTrIndex; i < endIndex; i++) {
        //Find a <tr> element
        let endTrIndex = wikitable.indexOf("</tr>", i + 1);

        if (endTrIndex === -1) {
            break;
        }
        console.log(endTrIndex, ' was endTrIndex');
        console.log(i, ' was i');
        let testTr = wikitable.slice(i + 5, endTrIndex + 5);
        let tr = parseTagNoTag(testTr,"<tr>","</tr>");
        console.log("our tr: " , tr);

        //Find and parse numColumns td objects in the tr
        for (let j = 0; j < numColumns; j++) {
            console.log('here');
            let td = parseTagGuts(parseTagWithTag(tr, "<td>","</td>"));
            console.log('pushing ', td, ' into returnArray column ', returnArray[j].title);
            (returnArray[j].data).push(td);
            let endTd = tr.search("</td>") + 5;
            tr = tr.slice(endTd);
            console.log('updated tr: ' , tr);
        }

        for (let k = 0; k < returnArray.length; k++) {
            console.log(returnArray[k].title, ' has ', returnArray[k].data.length, ' entries');
        }
        i = endTrIndex;
    }

    console.log(columnTitles);
    return returnArray;

}

/**
 * Returns an array of strings correspoding to column titles of
 * a wikitable
 *
 * each column title should be found in <th> HTML tags
 * 
 * @param  {array} tr      array of first <TR> tag below the wikitable class
 * @return {array}         array of column titles
 *
 * by @MichaelTrann(Michael Tran)
 */
function getColumnTitles(tr) {

    var retArray = [];
    var index = 0;
    var arrayTemp = "";
    var toggle = 0;
    
    // If search returns -1 then there are no <th> tags which means there are no column titles
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

/**
 * [parseTagNoTag description]
 * @param  {string} sourceCode [description]
 * @param  {string} openingTag [description]
 * @param  {string} closingTag [description]
 * @return {string}            [description]
 */
function parseTagNoTag(sourceCode, openingTag, closingTag) {
console.log("begin");    
//Search for the beginning index where the tag is found
    var beginIndex = sourceCode.search(openingTag);
    //If beginIndex is -1, then there is no tag
    if ( beginIndex === -1){
        return alert("No tag found");
    }
    beginIndex += openingTag.length;
    endIndex = sourceCode.search(closingTag);
    //If endIndex is -1, then there is no closing tag
    if ( endIndex === -1){
        return alert("No closing tag");
    }
    var returnString = "";
    returnString = sourceCode.slice(beginIndex, endIndex);
    return returnString;   
}

/**
 * [parseTagWithTag description]
 * @param  {string} sourceCode [description]
 * @param  {string} openingTag [description]
 * @param  {string} closingTag [description]
 * @return {string}            [description]
 */
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

/**
 * An html string with tags
 * @param  {string} taggedHtmlElement [description]
 * @return {string}                   [description]
 */
function parseTagGuts(taggedHtmlElement) {
    console.log(taggedHtmlElement.length);

    var beginChop = 0;

    var info = "";
    for (var i = 0; i < taggedHtmlElement.length; i++) {
        if (taggedHtmlElement.charAt(i) === '<') {
            beginChop = i;
            while (taggedHtmlElement.charAt(beginChop) !== '>') {
                beginChop++;
            }
            i = beginChop;
            continue;
        }
        info += taggedHtmlElement.charAt(i);
    }
    return info;
}

//------End Function Declarations------


var theTable = "<table class=\"wikitable sortable\">\r\n<tr>\r\n<th>Latin Name<\/th>\r\n<th>Current Name<\/th>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Achaea\" title=\"Achaea\">Achaea<\/a><sup id=\"cite_ref-1\" class=\"reference\"><a href=\"#cite_note-1\">[1]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Greece\" title=\"Greece\">Greece<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Africa_(province)\" class=\"mw-redirect\" title=\"Africa (province)\">Africa<\/a><sup id=\"cite_ref-2\" class=\"reference\"><a href=\"#cite_note-2\">[2]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Tunisia\" title=\"Tunisia\">Tunisia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Aegyptus\" title=\"Aegyptus\">Aegyptus<\/a><sup id=\"cite_ref-Heimbach_3-0\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Egypt\" title=\"Egypt\">Egypt<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Caucasian_Albania\" title=\"Caucasian Albania\">Albania<\/a><\/td>\r\n<td><a href=\"\/wiki\/Georgia_(country)\" title=\"Georgia (country)\">Georgia<\/a>, <a href=\"\/wiki\/Azerbaijan\" title=\"Azerbaijan\">Azerbaijan<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Anatolia\" title=\"Anatolia\">Anatolia<\/a><sup id=\"cite_ref-4\" class=\"reference\"><a href=\"#cite_note-4\">[4]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Turkey\" title=\"Turkey\">Turkey<\/a> (East)<\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Arabia<sup id=\"cite_ref-Heimbach_3-1\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Arabian_peninsula\" class=\"mw-redirect\" title=\"Arabian peninsula\">Arabian peninsula<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Ariana\" title=\"Ariana\">Ariana<\/a><\/td>\r\n<td><a href=\"\/wiki\/Afghanistan\" title=\"Afghanistan\">Afghanistan<\/a>, <a href=\"\/wiki\/Iran\" title=\"Iran\">Iran<\/a> (East) and <a href=\"\/wiki\/Central_Asia\" title=\"Central Asia\">Central Asia<\/a> (West)<\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Armenia<\/td>\r\n<td><a href=\"\/wiki\/Armenia\" title=\"Armenia\">Armenia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Armorica\" title=\"Armorica\">Armorica<\/a><sup id=\"cite_ref-5\" class=\"reference\"><a href=\"#cite_note-5\">[5]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Brittany\" title=\"Brittany\">Brittany<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Asia<\/td>\r\n<td><a href=\"\/wiki\/Turkey\" title=\"Turkey\">Turkey<\/a> (West)<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Baetica\" class=\"mw-redirect\" title=\"Baetica\">Baetica<\/a><sup id=\"cite_ref-6\" class=\"reference\"><a href=\"#cite_note-6\">[6]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Andalusia\" title=\"Andalusia\">Andalusia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Batavia_(region)\" title=\"Batavia (region)\">Batavia<\/a><\/td>\r\n<td>Part of the <a href=\"\/wiki\/Netherlands\" title=\"Netherlands\">Netherlands<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Belgae\" title=\"Belgae\">Belgae<\/a><sup id=\"cite_ref-Heimbach_3-2\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Belgium\" title=\"Belgium\">Belgium<\/a> and the <a href=\"\/wiki\/Netherlands\" title=\"Netherlands\">Netherlands<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Bithynia\" title=\"Bithynia\">Bithynia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Turkey\" title=\"Turkey\">Turkey<\/a> (North West)<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Bohemia\" title=\"Bohemia\">Bohemia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Bohemia\" title=\"Bohemia\">Bohemia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Borussia<\/td>\r\n<td><a href=\"\/wiki\/Prussia\" title=\"Prussia\">Prussia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Britannia\" title=\"Britannia\">Britannia<\/a><sup id=\"cite_ref-Heimbach_3-3\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/United_Kingdom\" title=\"United Kingdom\">Britain<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Caledonia\" title=\"Caledonia\">Caledonia<\/a><sup id=\"cite_ref-Heimbach_3-4\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Scotland\" title=\"Scotland\">Scotland<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Cambria\" title=\"Cambria\">Cambria<\/a><\/td>\r\n<td><a href=\"\/wiki\/Wales\" title=\"Wales\">Wales<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Cilicia\" title=\"Cilicia\">Cilicia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Turkey\" title=\"Turkey\">Turkey<\/a> (South East)<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Colchis\" title=\"Colchis\">Colchis<\/a><\/td>\r\n<td><a href=\"\/wiki\/Georgia_(country)\" title=\"Georgia (country)\">Georgia<\/a> (Western)<\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Cornubia<\/td>\r\n<td><a href=\"\/wiki\/Cornwall\" title=\"Cornwall\">Cornwall<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Creta\" class=\"mw-redirect\" title=\"Creta\">Creta<\/a><sup id=\"cite_ref-Heimbach_3-5\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Crete\" title=\"Crete\">Crete<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Cyprus\" title=\"Cyprus\">Cyprus<\/a><\/td>\r\n<td><a href=\"\/wiki\/Cyprus\" title=\"Cyprus\">Cyprus<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Cyrenaica\" title=\"Cyrenaica\">Cyrenaica<\/a><\/td>\r\n<td><a href=\"\/wiki\/Libya\" title=\"Libya\">Libya<\/a> (East)<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Dacia\" title=\"Dacia\">Dacia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Romania\" title=\"Romania\">Romania<\/a>, <a href=\"\/wiki\/Moldova\" title=\"Moldova\">Moldova<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Dalmatia\" title=\"Dalmatia\">Dalmatia<\/a><sup id=\"cite_ref-7\" class=\"reference\"><a href=\"#cite_note-7\">[7]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Montenegro\" title=\"Montenegro\">Montenegro<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Dania<\/td>\r\n<td><a href=\"\/wiki\/Denmark\" title=\"Denmark\">Denmark<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Dalmatia\" title=\"Dalmatia\">Dalmatia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Croatia\" title=\"Croatia\">Croatia<\/a> South, <a href=\"\/wiki\/Bosnia_and_Herzegovina\" title=\"Bosnia and Herzegovina\">Bosnia and Herzegovina<\/a> West and South<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Duklja\" title=\"Duklja\">D(i)ocle(ti)a<\/a><\/td>\r\n<td><a href=\"\/wiki\/Montenegro\" title=\"Montenegro\">Montenegro<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Epirus\" title=\"Epirus\">Epirus<\/a><\/td>\r\n<td>Epirus: composed of the <a href=\"\/wiki\/Northern_Epirus\" title=\"Northern Epirus\">Albanian<\/a> South and <a href=\"\/wiki\/Epirus_(region)\" title=\"Epirus (region)\">Greek Epirus<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/w\/index.php?title=Finnia&amp;action=edit&amp;redlink=1\" class=\"new\" title=\"Finnia (page does not exist)\">Finnia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Finland\" title=\"Finland\">Finland<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Foenicia or <a href=\"\/wiki\/Phoenicia\" title=\"Phoenicia\">Phoenicia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Lebanon\" title=\"Lebanon\">Lebanon<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Galatia\" title=\"Galatia\">Galatia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Turkey\" title=\"Turkey\">Turkey<\/a> (Central)<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Gallaecia\" title=\"Gallaecia\">Gallaecia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Galicia_(Spain)\" title=\"Galicia (Spain)\">Galicia<\/a> and <a href=\"\/wiki\/Portugal\" title=\"Portugal\">Portugal<\/a> north<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Gallia\" class=\"mw-redirect\" title=\"Gallia\">Gallia<\/a><sup id=\"cite_ref-Heimbach_3-6\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/France\" title=\"France\">France<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Germania\" title=\"Germania\">Germania<\/a><sup id=\"cite_ref-Bunson424_8-0\" class=\"reference\"><a href=\"#cite_note-Bunson424-8\">[8]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Germany\" title=\"Germany\">Germany<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Graecia\" class=\"mw-redirect\" title=\"Graecia\">Graecia<\/a><sup id=\"cite_ref-Heimbach_3-7\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Greece\" title=\"Greece\">Greece<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Helvetia\" title=\"Helvetia\">Helvetia<\/a><sup id=\"cite_ref-Burgan_9-0\" class=\"reference\"><a href=\"#cite_note-Burgan-9\">[9]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Switzerland\" title=\"Switzerland\">Switzerland<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Hibernia\" title=\"Hibernia\">Hibernia<\/a><sup id=\"cite_ref-10\" class=\"reference\"><a href=\"#cite_note-10\">[10]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Ireland\" title=\"Ireland\">Ireland<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Hispania\" title=\"Hispania\">Hispania<\/a><sup id=\"cite_ref-Heimbach_3-8\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Spain\" title=\"Spain\">Spain<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Hungaria<\/td>\r\n<td><a href=\"\/wiki\/Hungary\" title=\"Hungary\">Hungary<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Iberia\" class=\"mw-redirect\" title=\"Iberia\">Iberia<\/a><sup id=\"cite_ref-Heimbach_3-9\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Iberian_peninsula\" class=\"mw-redirect\" title=\"Iberian peninsula\">Iberian peninsula<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Caucasian_Iberians\" class=\"mw-redirect\" title=\"Caucasian Iberians\">Iberia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Georgia_(country)\" title=\"Georgia (country)\">Georgia<\/a> (Eastern)<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/India\" title=\"India\">India<\/a><\/td>\r\n<td><a href=\"\/wiki\/India\" title=\"India\">India<\/a> and the Indian subcontinent<\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Islandia<\/td>\r\n<td><a href=\"\/wiki\/Iceland\" title=\"Iceland\">Iceland<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Illyria\" title=\"Illyria\">Illyria<\/a>, <a href=\"\/wiki\/Illyricum_(Roman_province)\" title=\"Illyricum (Roman province)\">Illyricum<\/a><\/td>\r\n<td><a href=\"\/wiki\/Croatia\" title=\"Croatia\">Croatia<\/a>, <a href=\"\/wiki\/Bosnia_and_Herzegovina\" title=\"Bosnia and Herzegovina\">Bosnia and Herzegovina<\/a> South, <a href=\"\/wiki\/Serbia\" title=\"Serbia\">Serbia<\/a> South West, <a href=\"\/wiki\/Montenegro\" title=\"Montenegro\">Montenegro<\/a>, <a href=\"\/wiki\/Albania\" title=\"Albania\">Albania<\/a> North West<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Italia_(Roman_province)\" class=\"mw-redirect\" title=\"Italia (Roman province)\">Italia<\/a><sup id=\"cite_ref-Heimbach_3-10\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Italian_Peninsula\" title=\"Italian Peninsula\">Mainland Italy<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Iudaea\" class=\"mw-redirect\" title=\"Iudaea\">Iudaea<\/a><sup id=\"cite_ref-Heimbach_3-11\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Judea\" title=\"Judea\">Judea<\/a>, <a href=\"\/wiki\/Israel\" title=\"Israel\">Israel<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Lappia\" class=\"mw-redirect\" title=\"Lappia\">Lappia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Lapland_(region)\" class=\"mw-redirect\" title=\"Lapland (region)\">Lapland<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Lechia\" title=\"Lechia\">Lechia<\/a>, <a href=\"https:\/\/en.wiktionary.org\/wiki\/Polonia#Latin\" class=\"extiw\" title=\"wiktionary:Polonia\">Polonia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Poland\" title=\"Poland\">Poland<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Libani\" title=\"Libani\">Libani<\/a><\/td>\r\n<td><a href=\"\/wiki\/Lebanon\" title=\"Lebanon\">Lebanon<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Libya\" title=\"Libya\">Libya<\/a><\/td>\r\n<td>Eastern <a href=\"\/wiki\/Libya\" title=\"Libya\">Libya<\/a>, Western <a href=\"\/wiki\/Egypt\" title=\"Egypt\">Egypt<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Lituania<\/td>\r\n<td><a href=\"\/wiki\/Lithuania\" title=\"Lithuania\">Lithuania<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Livonia\" title=\"Livonia\">Livonia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Estonia\" title=\"Estonia\">Estonia<\/a> and <a href=\"\/wiki\/Latvia\" title=\"Latvia\">Latvia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Lusitania\" title=\"Lusitania\">Lusitania<\/a><\/td>\r\n<td><a href=\"\/wiki\/Portugal\" title=\"Portugal\">Portugal<\/a> central and south<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Macedonia_(region)\" title=\"Macedonia (region)\">Macedonia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Macedon\" class=\"mw-redirect\" title=\"Macedon\">Macedon<\/a>: composed of the <a href=\"\/wiki\/Republic_of_Macedonia\" title=\"Republic of Macedonia\">Republic of Macedonia<\/a> and <a href=\"\/wiki\/Macedonia_(Greece)\" title=\"Macedonia (Greece)\">Greek Macedonia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Mauretania\" title=\"Mauretania\">Mauretania<\/a><\/td>\r\n<td><a href=\"\/wiki\/Morocco\" title=\"Morocco\">Morocco<\/a> North, <a href=\"\/wiki\/Algeria\" title=\"Algeria\">Algeria<\/a> North West<\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Melitae, Melitensium, Melitensis<\/td>\r\n<td><a href=\"\/wiki\/Malta\" title=\"Malta\">Malta<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Moesia\" title=\"Moesia\">Moesia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Bulgaria\" title=\"Bulgaria\">Bulgaria<\/a>, <a href=\"\/wiki\/Serbia\" title=\"Serbia\">Serbia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Moravia\" title=\"Moravia\">Moravia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Moravia\" title=\"Moravia\">Moravia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Noricum\" title=\"Noricum\">Noricum<\/a><\/td>\r\n<td>mainly <a href=\"\/wiki\/Austria\" title=\"Austria\">Austria<\/a> South and <a href=\"\/wiki\/Slovenia\" title=\"Slovenia\">Slovenia<\/a> North<\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Norvegia<\/td>\r\n<td><a href=\"\/wiki\/Norway\" title=\"Norway\">Norway<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Numidia\" title=\"Numidia\">Numidia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Algeria\" title=\"Algeria\">Algeria<\/a> North East<\/td>\r\n<\/tr>\r\n<tr>\r\n<td>Palaestina<\/td>\r\n<td><a href=\"\/wiki\/Palestine_(region)\" title=\"Palestine (region)\">Palestine<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Pannonia\" title=\"Pannonia\">Pannonia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Hungary\" title=\"Hungary\">Hungary<\/a>, <a href=\"\/wiki\/Croatia\" title=\"Croatia\">Croatia<\/a> North, <a href=\"\/wiki\/Slovenia\" title=\"Slovenia\">Slovenia<\/a> North East<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Persian_Empire\" title=\"Persian Empire\">Parthia<\/a><sup id=\"cite_ref-Heimbach_3-12\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Iran\" title=\"Iran\">Iran<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Phoenicia\" title=\"Phoenicia\">Phoenicia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Lebanon\" title=\"Lebanon\">Lebanon<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"https:\/\/en.wiktionary.org\/wiki\/Polonia#Latin\" class=\"extiw\" title=\"wiktionary:Polonia\">Polonia<\/a>, <a href=\"\/wiki\/Lechia\" title=\"Lechia\">Lechia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Poland\" title=\"Poland\">Poland<\/a><sup class=\"noprint Inline-Template Template-Fact\" style=\"white-space:nowrap;\">[<i><a href=\"\/wiki\/Wikipedia:Citation_needed\" title=\"Wikipedia:Citation needed\"><span title=\"This claim needs references to reliable sources. (July 2014)\">citation needed<\/span><\/a><\/i>]<\/sup><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Pontus_(region)\" title=\"Pontus (region)\">Pontus<\/a><\/td>\r\n<td><a href=\"\/wiki\/Turkey\" title=\"Turkey\">Turkey<\/a> North East<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Raetia\" title=\"Raetia\">Raetia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Switzerland\" title=\"Switzerland\">Switzerland<\/a> North<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Ruthenia\" title=\"Ruthenia\">Ruthenia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Russia\" title=\"Russia\">Russia<\/a>, <a href=\"\/wiki\/Ukraine\" title=\"Ukraine\">Ukraine<\/a>, <a href=\"\/wiki\/Belarus\" title=\"Belarus\">Belarus<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Sarmatia\" class=\"mw-redirect\" title=\"Sarmatia\">Sarmatia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Eastern_Europe\" title=\"Eastern Europe\">Eastern Europe<\/a>: <a href=\"\/wiki\/Poland\" title=\"Poland\">Poland<\/a>, <a href=\"\/wiki\/Ukraine\" title=\"Ukraine\">Ukraine<\/a>, <a href=\"\/wiki\/Russia\" title=\"Russia\">Russia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Scandinavia\" title=\"Scandinavia\">Scandinavia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Scandinavian_peninsula\" class=\"mw-redirect\" title=\"Scandinavian peninsula\">Scandinavian peninsula<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Scotia\" title=\"Scotia\">Scotia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Ireland\" title=\"Ireland\">Ireland<\/a>, <a href=\"\/wiki\/Scotland\" title=\"Scotland\">Scotland<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Scythia\" title=\"Scythia\">Scythia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Ukraine\" title=\"Ukraine\">Ukraine<\/a>, <a href=\"\/wiki\/South_Federal_District\" class=\"mw-redirect\" title=\"South Federal District\">South Russia<\/a>, <a href=\"\/wiki\/Kazakhstan\" title=\"Kazakhstan\">Kazakhstan<\/a>, East <a href=\"\/wiki\/Uzbekistan\" title=\"Uzbekistan\">Uzbekistan<\/a>, North <a href=\"\/wiki\/Turkmenistan\" title=\"Turkmenistan\">Turkmenistan<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Scythia_Minor\" title=\"Scythia Minor\">Scythia Minor<\/a><\/td>\r\n<td><a href=\"\/wiki\/Dobruja\" title=\"Dobruja\">Dobruja<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Seres\" class=\"mw-redirect\" title=\"Seres\">Seres<\/a>, <a href=\"\/wiki\/Sinae\" class=\"mw-redirect\" title=\"Sinae\">Sinae<\/a><\/td>\r\n<td><a href=\"\/wiki\/China\" title=\"China\">China<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Sicilia\" class=\"mw-redirect\" title=\"Sicilia\">Sicilia<\/a><sup id=\"cite_ref-Heimbach_3-13\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]<\/a><\/sup><\/td>\r\n<td><a href=\"\/wiki\/Sicily\" title=\"Sicily\">Sicily<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Silesia\" title=\"Silesia\">Silesia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Silesia\" title=\"Silesia\">Silesia<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Suecia\" class=\"mw-redirect\" title=\"Suecia\">Suecia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Sweden\" title=\"Sweden\">Sweden<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Syria\" title=\"Syria\">Syria<\/a><\/td>\r\n<td><a href=\"\/wiki\/Syria\" title=\"Syria\">Syria<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Taprobane\" class=\"mw-redirect\" title=\"Taprobane\">Taprobane<\/a><\/td>\r\n<td><a href=\"\/wiki\/Sri_Lanka\" title=\"Sri Lanka\">Sri Lanka<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Tarraconensis\" class=\"mw-redirect\" title=\"Tarraconensis\">Tarraconensis<\/a><\/td>\r\n<td><a href=\"\/wiki\/Spain\" title=\"Spain\">Spain<\/a> North East<\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Thracia\" title=\"Thracia\">Thracia<\/a><\/td>\r\n<td><a href=\"\/wiki\/Greece\" title=\"Greece\">Greece<\/a>, <a href=\"\/wiki\/Bulgaria\" title=\"Bulgaria\">Bulgaria<\/a>, <a href=\"\/wiki\/Turkey\" title=\"Turkey\">Turkey<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Tingitania\" class=\"mw-redirect\" title=\"Tingitania\">Tingitania<\/a><\/td>\r\n<td><a href=\"\/wiki\/Morocco\" title=\"Morocco\">Morocco<\/a><\/td>\r\n<\/tr>\r\n<tr>\r\n<td><a href=\"\/wiki\/Tripolitana\" class=\"mw-redirect\" title=\"Tripolitana\">Tripolitana<\/a><\/td>\r\n<td><a href=\"\/wiki\/Libya\" title=\"Libya\">Libya<\/a><\/td>\r\n<\/tr>\r\n<\/table>"

console.log(parse(theTable));
