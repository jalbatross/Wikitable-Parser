console.log("begin");
var testArr = "32525235</table>1234456789<table class=\"wikitable sortable\">AAAAAAAAAAAAAAAAAAAAA</table>452543543543543";

/**
 * Parses a webpage 
 * @param  {string} webpageStr HTML string of a page
 * @return {?}      TBD
 */
function parse(webpageStr) {
    //need to return this:
    //
    //array with following structure [obj1, obj2, obj3, ..., obj n] where n = number of columns
    //
    //objects look like this:
    //object myObject
    //myOjbect.title = column title
    //myObject.data = [array of table entries]
    //
    //for example if we parsed the table:
    //
    //   fruits |  veggies |  meats |
    //--------------------------------
    //1. apple   cabbage      beef
    //2. banana  carrot       chicken
    //3. grape   artichoke    lamb
    //
    //we should return this:
    //[object1, object2, object3]
    //object1.title = fruits
    //object1.data = [apple, banana, grape]
    //
    //object2.title = veggies
    //object2.data = [cabbage, carrot, artichoke]
    //
    //etc.

    var returnArray = [];

    //find wikitable
    var beginIndex = array.search("<table class=\"wikitable");

    //find a table
    var beginArray = array.slice(beginIndex);

    //find endIndex
    var endIndex = beginArray.search("</table>")
    endIndex += 8;

    //find table headers (column titles)
    var columnTitles = getColumnTitles(params);
    var numColumns = columnTitles.length;

    //proceed through the table 
    for (var i = beginIndex; i < endIndex; i++) {
        //find the next <tr>
        //parse the next numColumns <td> in the <tr>
        //update returnArray accordingly
    }

    return returnArray;

}

/**
 * Returns an array of strings correspoding to column titles of
 * a wikitable
 *
 * each column title should be found in <th> HTML tags
 * @param  {[type]} params  TBD
 * @return {array}         array of column titles
 */
function getColumnTitles(params) {
    var retArray = [];


    return retArray;
}