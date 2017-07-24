//WikipageGetter.js

console.log("\n\n-----start-----\n\n");

var arr = "";
var queryUrl = "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_Latin_names_of_countries&format=json&callback=?";
$.ajax( {
    url: queryUrl,
    dataType: 'json'
}).done(function(data) {
    arr = data.parse.text["*"];
    console.log(arr.length);
    //everything has to be here 
    //or maybe just encapsulate this thing into a function
    //in any case this needs to BLOCK or just set timeout
});

console.log("done");