//Example Code
function addStyles() {
  function createStyles() {
    return cel({
      type: "style",
      id: "header-styles",
      innerHTML: ".fixed-top{position: fixed; top: 0; left: 0;}.fixed-top+*{margin-top:100px;}.fixed-bottom{position:fixed; bottom: 0; left: 0;}.full-width{width:100%;}#header{border-bottom: 1px solid #ccc;background-color:rgba(255,255,255,0.7);}#header > *{display: inline-block;padding-right: 5px;}#footer{border-top: 1px solid #ccc;background-color: rgba(255,255,255,0.9);}"
    })
  }

  var styles_el = createStyles();
  addToDocument(styles_el);
}
function addHeader() {
  function createHeader() {
    return cel({
      type: "div",
      id: "header",
      classes: ["fixed-top", "full-width"],
      children: [ cel({ id: "logo",
                        type: "img",
                        attrs:{"src":"http://placekitten.com/g/64/64"}
                      }),
                  cel({ id: "brand",
                        type: "h1",
                        innerHTML: "Kittens",
                        children: cel({type:"a",innerHTML:"Kittens",attrs:{"src":"https://github.com/sea-grass/cel.js"}})
                      })]
    });
  }

  var header_el = createHeader();
  addToDocument(header_el);
}
function addContent() {
  function createContent() {
    return cel({
      type: "div",
      id: "content",
      innerHTML:  function(base, filler, targetChars){
                    var text = base;
                    while (text.length < targetChars) {
                      var newChar = filler[Math.floor(Math.random()*1000 % filler.length)];
                      text = text + newChar;
                    }
                    return text;
                  }("Lorem ipsum...","abcdefghijklmnopqrstuvwzyz .,;".split(''), 5000)
    });
  }

  var content_el = createContent();
  addToDocument(content_el);
}
function addFooter() {
  function createFooter() {
    return cel({
      type: "div",
      id: "footer",
      classes: ["fixed-bottom", "full-width"],
      innerHTML: "Footer"
    });
  }

  var footer_el = createFooter();
  addToDocument(footer_el);
}

//Add styles
addStyles();
//Add header
addHeader();
//Add content
addContent();
//Add footer
addFooter();

/* --------
    FUNCTIONS
   -------- */

/* cel: Create ELement
*/
function cel(options) {
  var generic_options = {
    type: "div",
    id: "",
    classes: [],
    attrs: {},
    innerHTML: "",
    children: []
  };
  var type =    options.type ?
                  options.type : generic_options.type,
      id =      options.id ?
                  options.id : generic_options.id,
      classes = options.classes ?
                  options.classes : generic_options.classes,
      attrs = options.attrs ?
                  options.attrs : generic_options.attrs,
      innerHTML = options.innerHTML ?
                  options.innerHTML : generic_options.innerHTML,
      children = options.children ?
                  options.children : generic_options.children;

  return function(){
    //Create element of type
    var el = document.createElement(type);

    //Assign the element's id
    el.id = id;

    //Assign the element's classes
    for (var i = 0, l = classes.length; i < l; i++) {
      el.classList.add(classes[i]);
    }
    //Set the element's attributes
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    //Assign the element's contents
    el.innerHTML = innerHTML;
    //Append any children specified to the element
    for (var i = 0, l = children.length; i < l; i++) {
      el.appendChild(children[i]);
    }

    return el;
  }();
}

function addToContainer(el, container) {
  container.appendChild(el);
}
function addToDocument(el) {
  addToContainer(el, document.body);
}
