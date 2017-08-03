//simpleParser.js

/**
 * Get info from td
 * @param  {string} td table element
 * @return {string}    text info
 */
function parseTd(td) {
    console.log(td.length);

    int beginChop = 0;
    int endChop = 0;

    var info = "";
    for (int i = 0; i < td.length; i++) {
        if (td.charAt(i) === '<') {
            beginChop = i;
            while (td.charAt(beginChop) !== '>') {
                beginChop++;
            }
            i = beginChop;
            continue;
        }
        info += td.charAt(i);
    }
}

var test = "<td><a href=\"/wiki/Britannia\" title=\"Britannia\">Britannia</a><sup id=\"cite_ref-Heimbach_3-3\" class=\"reference\"><a href=\"#cite_note-Heimbach-3\">[3]</a></sup></td>"

