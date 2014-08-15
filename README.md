Simple js html element creation library

# Basics of a "cel"

Basically a dom collection of elements, specifiable by json.
## Create a div:

    //Check the .js file for the defaults to cel()
    var newDiv = cel();

## Create an img:

    var myImg = cel({ type: "img",
                      attrs: {
                              src: "http://placekitten.com/100/100"
                      }
                });

## Create a header:

    var myHeaderOptions = {
      type: "div",
      id: "header",
      classes: ["fixed-top", "full-width"],
      children: [ cel({ id: "logo",
                        type: "img",
                        attrs:{"src":"http://placekitten.com/g/64/64"}
                      }),
                  cel({ id: "brand",
                        type: "h1",
                        innerHTML: "Kittens"
                      })]
    };
    var myHeader = cel(myHeaderOptions);

# Associated stylesheets

Basically a way to sync a cel with a `<style>` element

    var myHeaderOptions = {
      type: "div",
      id: "header",
      classes: ["fixed-top", "full-width"],
      children: [ cel({ id: "logo",
                        type: "img",
                        attrs:{"src":"http://placekitten.com/g/64/64"}
                      }),
                  cel({ id: "brand",
                        type: "h1",
                        innerHTML: "Kittens"
                      })]
    };
    var myHeaderStylesheet =  cel({
                                type: "style",
                                innerHTML: "#header { position: absolute; top: 0; left: 0; margin-bottom: 60px; height: 60px; background: #aaa }"
                              });
    //myHeaderStylesheet doesn't need to be added to the document manually.
    //It is done by the Cel.addToDocument(myCel), and so is also
    //removed by Cel.removeFromDocument(myCel).
    //TODO: Make cel -> Cel, in addition to a factory pattern
    //TODO: Add {addTo,removeFrom}Document(myCdl) functions
    var myHeader = cel(myHeaderOptions, myHeaderStylesheet)
    myHeader.stylesheet.background = "blue";
    myHeader.stylesheet.child("#logo").borderRadius = "30px 30px";
    //TODO: Add stylesheet object to creations from Cel
    //TODO: Add child(selector) method to myHeader.stylesheet to return an object that mirrors all of the styles of the matching node.
    //e.g. So, this hear would modify the innerHTML of myHeaderStylesheet and add a rule about `#header#logo` to create a rounded image.
    //and so, changing the very same borderRadius tp another value, or simply nothing, then would have its change reflacted in
    //myHeader's synchronized stylesheet
    Cel.addToDocument(myHeader);

# Specifying event listeners

Basically a way to specify everything, or anything, all at once

  var clickableBox = cel({innerHTML: "<p>I am a box.</[>"}, {}, {click: function(e){e.target.innerHTML+="<p>Clicked!</p>"}})
