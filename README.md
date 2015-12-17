# Cel.js

Cel.js is a simple HTML Element creation library written in JavaScript.

It allows the developer to specify the structure of an HTML element including its various attributes in a JSON object, and pass that to the Cel constructor to create their HTML element.

It turns code like:

```javascript
var myElement = document.createElement("div");
myElement.id = "myElement";
myElement.classList.add("these", "are", "my", "classes");
myElement.style.position = "absolute";
myElement.style.width = "480px";
myElement.style.margin = "0 auto";
myElement.style.color = "magenta";
```

into:

```javascript
var myElement = new Cel({
  type: "div",
  id: "myElement",
  classes: ["these", "are", "my", "classes"],
  style: {
    position: "absolute",
    width: "480px",
    margin: "0 auto",
    color: "magenta"
  }
});
```

I admit that it does not seem like a "space saver" -- in fact it seems like the Cel.js version has more lines than the sans-Cel.js version.
This is the cost of expressiveness: the ability to specify your HTML element with one function call and a declarative syntax.

This could be used if you are hesitant add jQuery to your project just for the ability to declare HTML elements in Javascript.

It woul excel in a highly dynamic environment (e.g. a Single Page Application), where the UI could be declared using Cel options.

# Some examples

See `example` for a full example of the usage of Cel.js.

## Cel.js

  function Cel(options){}
  /*  options.type -- default "div"
  */

## Create a div
    //
    var newDiv = new Cel({ innerText: "Hello" + " world!"});

## Create an img

  var newImg = new Cel({
    type: "img",
    attrs: {
      src: "//placekitten.com/100/100"
    }
  });
  
## Create a header
  var headerOptions = {
    "type": "div",
    "id": "header",
    "classes": ["fixed-top", "full-width"],
    "children": [
      new Cel({
        "type": "img",
        "id": "logo",
        "attrs": {
          "src": "//placekitten.com/g/64/64"
        }
      }),
      new Cel({
        "type": "h1",
        "id": "brand",
        "innerText": "Kittens"
      })
    ]
  };
  var newHeader = new Cel(headerOptions);