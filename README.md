Simple js html element creation library

#Create a div:

    //Check the .js file for the defaults to cel()
    var newDiv = cel();

#Create an img:

    var myImg = cel({ type: "img",
                      attrs: {
                              src: "http://placekitten.com/100/100"
                      }
                });

#Create a header:

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