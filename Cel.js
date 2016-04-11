/**
 * Cel.js
 * Author: Chris Grass
 * Date: April 8, 2016
 * Version: 0.0.1
 *
 * Cel - Create ELement
 * See: https://github.com/sea-grass/cel.js for usage
 */
function Cel(options) {
  return Cel.create(options);
}
Cel.create = create;
Cel.createStyle = createStyle;

module.exports = Cel;

function create(options) {
  var option, el;
  var i;
  var attr;
  var generic_options = {
    "type": "div",
    "id": "",
    "classes": [],
    "attrs": {},
    "innerHTML": "",
    "innerText": "",
    "children": [],
    "style": {},
    "on": {}
  };
  if (!options) options = {};
  /* set all of the fields in options */
  for (option in generic_options) {
    if (generic_options.hasOwnProperty(option)) {
      options[option] = options[option] || generic_options[option];
    }
  }
  /* create the element with the specified or default (div) type */
  el = document.createElement(options["type"]);
  /* assign the given id, if any */
  if (options["id"] !== "") el.id = options["id"];
  /* add all of the specified classes to this element, if any */
  for (i = 0; i < options["classes"].length; i++) {
    //TODO: Does not work cross-browser
    el.classList.add(options["classes"][i]);
  }
  /* set all of the specified attributes on this element, if any */
  for (attr in options["attrs"]) {
    if (options["attrs"].hasOwnProperty(attr)) {
      // e.g. <div contenteditable="contenteditable"> == <div contenteditable>, right?
      if (attr === options["attrs"][attr]) {
        el.setAttribute(attr)
      } else {
        el.setAttribute(attr, options["attrs"][attr]);
      }
    }
  }
  /* set the inner content of the element, if any specified */
  if (options["innerText"] !== "") el.innerText = options["innerText"];
  if (options["innerHTML"] !== "") el.innerHTML = options["innerHTML"];
  /* appends the specified children to the element, if any */
  for (i = 0; i < options["children"].length; i++) {
    //TODO: Check if another cel properties object or html element
    var def = options["children"][i];
    var type = Object.prototype.toString.call(def);
    var child = null;
    if (type.indexOf("object Object") !== -1) {
      //Create the cel from the cel definition
      child = new Cel(def);
    } else if (type.indexOf("object HTML") !== -1) {
      //Already an HTML element
      //TODO: Is this really a good enough test?
      child = def;
    }
    if (child !== null) {
      el.appendChild(child);
    }
  }
  /* sets the supplied style rules, if any */
  for (rule in options["style"]) {
    if (options["style"].hasOwnProperty(rule)) {
      el["style"][rule] = options["style"][rule];
    }
  }
  /* sets up the listeners specified in options, if any */
  for (var eventName in options["on"]) {
    if (options["on"].hasOwnProperty(eventName)) {
      el.addEventListener(eventName, options["on"][eventName]);
    }
  }
  /* returns the newly constructed element */
  return el;
}

function createStyle(options) {
  var basic_options, el;
  var selector, rule;
  var styleText = "";

  options = options || {};
  basic_options = options;
  if (basic_options["innerText"]) delete basic_options["innerText"];
  if (basic_options["innerHTML"]) delete basic_options["innerHTML"];
  if (basic_options["children"]) delete basic_options["children"];
  basic_options["type"] = "style";

  el = new Cel(basic_options);

  options["rules"] = options["rules"] || {};

  for (selector in options["rules"]) {
    if (options["rules"].hasOwnProperty(selector)) {
      styleText += selector + " { ";
      for (rule in options["rules"][selector]) {
        if (options["rules"][selector].hasOwnProperty(rule)) {
          styleText += rule + ": " + options["rules"][selector][rule] + "; ";
        }
      }
      styleText += "} ";
    }
  }

  el.innerText = styleText;

  return el;
}
