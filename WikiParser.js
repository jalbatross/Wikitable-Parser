//WikiParser.js

console.log("hello");

$.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=List_of_Latin_names_of_countries&format=json&callback=?", function(data) {
    console.log(data.parse.text);
});