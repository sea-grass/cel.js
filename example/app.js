/* Cel.js/example/app.js 
  This is an example app demonstrating the power/expressiveness with cel.js.
  It creates only four top-level elements: style, header, content, and footer
  
  Some features of cel.js that it shows off:
  - Create stylesheets with `Cel.createStyle({rules:{selector:...}})`
  - Add child elements to a new Cel with `new Cel({children:[...]})`
  - Create elements with dynamic content with `new Cel({innerHTML: generateLoremIpsum()})`
*/
var style,
    header,
    content,
    footer;

style = new cel.createStyle({
  "type": "style",
  "id": "header_styles",
  "rules": {
    ".fixed-top": {
      "position": "fixed",
      "top": "0",
      "left": "0"
    },
    ".fixed-top + *": {
      "margin-top": "100px"
    },
    ".fixed-bottom": {
      "position": "fixed",
      "bottom": "0",
      "left": "0"
    },
    ".full-width": {
      "width": "100%"
    },
    "#header": {
      "border-bottom": "1px solid #ccc",
      "background-color": "rgba(255, 255, 255, 0.7)"
    },
    "#header > *": {
      "display": "inline-block",
      "padding-right": "5px"
    },
    "#footer": {
      "border-top": "1px solid #ccc",
      "background-color": "rgba(255, 255, 255, 0.9)"
    }
  }
});

header = cel({
  "id": "header",
  "classes": ["fixed-top", "full-width"],
  "children": [
    {
      "type": "img",
      "id": "logo",
      "attrs": {
        "src": "//placekitten.com/g/64/64"
      }
    },
    {
      "type": "h1",
      "id": "brand",
      "innerText": "Kittens"
    }
  ]
});

content = cel({
  "id": "content",
  "innerHTML": generateLoremIpsum(5000)
});

footer = cel({
  "id": "footer",
  "classes": ["fixed-bottom", "full-width"],
  "children": [
    {
      "type": "a",
      "attrs": {
        "href": "//github.com/sea-grass"
      },
      "innerText": "github/sea-grass"
    },
    {
      "innerText": "#celjs2015"
    }
  ]
});

/* Will generate (gibberish) text to fit the numChars specified */
function generateLoremIpsum(numChars) {
  var lipsum = "";
  var base, filler, newChar;
  var wordLength = 0;
  var sentenceLength = 0;
  var wordMin = 1;
  var wordMax = 22;
  var currWord = "";
  var currSentence = "";
  
  base = "Cel.js: HTML element generation with JavaScript...";
  filler = "abcdefghijklmnopqrstuvwxyz".split("");
  separator = " .,;".split("");
  
  while (lipsum.length < numChars) {
    //max word length is between 3 and 7
    if (currWord.length > (Math.abs((Math.random()*1000 % wordMax) - wordMin))) {
      //we have created a word, so add it to the sentence
      currSentence += currWord;
      currWord = "";
      //generate a separator char for this sentence
      newChar = separator[Math.floor(Math.random()*1000 % separator.length)];
      currSentence += newChar;
      //see if we need to add any additional things yknow
      switch (newChar) {
        case ",":
          //requires an extra space within the sentence
          currSentence += " ";
          break;
      }
    } else {
      //add a new char to the current word
      newChar = filler[Math.floor(Math.random()*1000 % filler.length)];
      currWord += newChar;
    }
    //see if the last character of the current sentence indicates the end of a sentence
    switch (currSentence[currSentence.length-1]) {
      case ".":
      case ";":
        currSentence = currSentence.substr(0,1).toUpperCase() + currSentence.substr(1, currSentence.length - 1);
        lipsum += currSentence;
        currSentence = "";
        if (lipsum.length < numChars) lipsum += " ";
    }
  }
  // make sure to trim the string so the lipsum is as requested
  return lipsum.substr(0, numChars);
}


document.head.appendChild(style);
// I don't like writing document.body.appendChild over and over...
[
  header,
  content,
  footer,
].map(function (el) {
  document.body.appendChild(el);
});


/*
 * This is here just for fun
 */
/*
setInterval(function() {
  content.innerHTML = generateLoremIpsum(5000);
}, 1000/60);
*/
