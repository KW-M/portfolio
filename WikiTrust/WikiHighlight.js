// Bookmarklet JS:
// javascript:(function(){var%20script=document.createElement('script');script.src='https://kw-m.github.io/Portfolio-Website/WikiTrust/WikiHighlight.js';document.getElementsByTagName('head')[0].appendChild(script);script.remove()})()

if (window.WikiTrustGlobalVars === undefined) window.WikiTrustGlobalVars = { wordDomNodes: [] };

(function () { // Using an anonoumous function to avoid putting our variables in the wikipedia page's scope (so they dont interfere with Wikipedia's javascript).

  // Placeholder array for references to all word elements that will be created
  var wordDomNodes = window.WikiTrustGlobalVars["wordDomNodes"];
  // dictionary of html element types to split into words and include in the word list
  var REPLACE_WORDS_IN = {
    p: 1, a: 1, span: 1
    //  b: 1, big: 1, body: 1, cite: 1, code: 1, dd: 1,
    //  dt: 1, em: 1, font: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1,
    //  i: 1, label: 1, legend: 1, li: 1, pre: 1, small: 1,
    //  span: 1, strong: 1, sub: 1, sup: 1, td: 1, th: 1, tt: 1, div: 1, li: 1, caption: 1
  };
  // array of element class names to ignore for extracting & spliting words
  var EXCLUDE_ELEMENT_CLASSES = ["reference", "wikitable", "toc", "infobox", "thumb", "mw-editsection", "navbox", "metadata", "tmbox", "sistersitebox", "portal"]// "reference" "sistersitebox" "navbox"

  var getColorForPercentage = function (pct, opacity) { // Source: https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
    var percentColorsGradient = [ // Define a gradient (0 = least trustworthy color, 1 = most trustworthy color)
      { pct: 0.0, color: { r: 0xfc, g: 0x4a, b: 0x1a } }, //#fc4a1a
      { pct: 0.5, color: { r: 0xf7, g: 0xb7, b: 0x33 } }, //#f7b733
      { pct: 1.0, color: { r: 0xff, g: 0xff, b: 0xff } }
    ];
    for (var i = 1; i < percentColorsGradient.length - 1; i++) {
      if (pct < percentColorsGradient[i].pct) {
        break;
      }
    }
    var lower = percentColorsGradient[i - 1];
    var upper = percentColorsGradient[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgba(' + [color.r, color.g, color.b, opacity].join(',') + ')';
    // or output as hex if preferred
  }

  function addWordDomNode(el) {
    if (el !== undefined && el !== null) {
      wordDomNodes.push(el)
    }
  }

  function checkElementTag(el) {
    return el.tagName && REPLACE_WORDS_IN[el.tagName.toLowerCase()];
  }

  function checkForExcludedClass(element) {
    function hasClass(className) {
      return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    for (let index = 0; index < EXCLUDE_ELEMENT_CLASSES.length; index++) {
      const className = EXCLUDE_ELEMENT_CLASSES[index];
      if (hasClass(className)) return true
    }
    return false
  }

  function addWords(el) {
    var textEls = [];

    function buildTextEls(el) {
      // if the current element is a text node with some non-whitespace size, add it to the textEls array:
      if (el.nodeType === Node.TEXT_NODE && el.nodeValue.trim().length > 0) {
        textEls.push(el);
        return;
      }
      // check the current element to see if it doesn't pass the classes we exclude or the element tags we dont want, return to prevent further recustion/adding of children from happening:
      var excludedElementFound = !checkElementTag(el) && checkForExcludedClass(el);
      if (!el.childNodes || excludedElementFound) {
        return;
      }
      // run this function on all childNodes (recursion):
      for (var i = 0, len = el.childNodes.length; i < len; i++) {
        buildTextEls(el.childNodes[i]);
      }
    }

    function wordsToSpans(textEl) {
      var p = textEl.parentNode, // get a reference to the element containing the textEl text node.
        words = textEl.nodeValue.split(/\s+/), // get an array of all the words seperated by whitespace.
        ws = textEl.nodeValue.split(/\S+/), // get an array of all the whitespace seperated by words (note the capital S meaning "not whitespace")
        len = Math.max(words.length, ws.length);
      /* preserve whitespace for pre tags. */
      if (ws.length > 0 && ws[0].length === 0) {
        ws.shift();
      }
      /* check if this tag only contains a single word already, in which case there's no reason to make a new tag for the word. */
      if (words.length === 0) {
        addWordDomNode(p);
        return;
      }
      /* for every word/whitespace add it either as a new span element (words) or a new text node (whitespace) to the original containing element in the order they appeared in the original text. */
      for (var i = 0; i < len; i++) {
        if (i < words.length && words[i].length > 0) {
          n = document.createElement('span');
          n.innerHTML = words[i];
          p.insertBefore(n, textEl);
          addWordDomNode(n);
        }
        if (i < ws.length && ws[i].length > 0) {
          n = document.createTextNode(ws[i]);
          p.insertBefore(n, textEl);
        }
      }
      // remove the original text (since we've replaced it with the word spans & whitespace elements)
      p.removeChild(textEl);
    }

    buildTextEls(el); // Fills the texEls array with all the text nodes on the page that have a parentNode that fits the element tag and class filters.
    textEls.map(wordsToSpans); // For each textNode element in textEls run the wordsToSpans function on it.
  };

  function applyWordTrust() {
    wordDomNodes.forEach(function (node, index) {
      wordScore = 1 - (Math.max(Math.sin(index / 80) + 1 - Math.random() / 0.6, 0)) // Fake word score formula to mimic actual algorithim (replace with 0 to hightlight everything in red)
      node.setAttribute("data-trust-score", wordScore) // Adds a custom html attribute (convention is they start with "data") on the word element node with the wordScore value
    })
  }

  function showTrust() {
    wordDomNodes.forEach(function (node, index) {
      var wordScore = node.getAttribute("data-trust-score")
      node.style.borderBottom = "2px solid " + getColorForPercentage(wordScore, 1);
      node.style.backgroundColor = getColorForPercentage(wordScore, 0.1);
      // node.style.boxShadow = "0px 0px 10px " + getColorForPercentage(wordScore, 1) + ", inset 0px 0px 10px " + getColorForPercentage(wordScore, 1)
      // node.style.textShadow = "0px 0px 10px " + getColorForPercentage(wordScore, 0.8);
      // node.style.borderBottom = "1px solid " + getColorForPercentage(wordScore, 1);
    });
  }

  function hideTrust() {
    wordDomNodes.forEach(function (node, index) {
      node.style.borderBottom = "unset";
      node.style.backgroundColor = "unset"
    })
  }

  // When a message is recived from a frame, this function is called with the message string and origin (see listener registered below):
  function receiveUiFrameMessage(event) {
    console.log("Got cross frame message: " + event.data + " from " + event.origin)
    message = event.data;
    if (message === "show_trust") {
      showTrust()
    } else if (message === "hide_trust") {
      hideTrust()
    }
  }

  function addFrameMessageListener() {
    // Register a listener for messages from the iframe:
    if (window.addEventListener) {
      // For standards-compliant web browsers
      window.addEventListener("message", receiveUiFrameMessage, false); // For all major browsers, except IE 8 and earlier
    } else {
      window.attachEvent("onmessage", receiveUiFrameMessage);  // For IE 8 and earlier versions
    }
  }

  function removeFrameMessageListener() {
    // Un-register the listener for messages from the iframe:
    if (window.addEventListener) {
      window.removeEventListener("message", receiveUiFrameMessage, false); // For all major browsers, except IE 8 and earlier
    } else {
      window.detachEvent("onmessage", receiveUiFrameMessage); // For IE 8 and earlier versions
    }
  }

  function injectStylesheet() {
    // Inject a stylesheet into the current page:
    var style = window.WikiTrustGlobalVars.styleElm = document.createElement("link");
    style.rel = "stylesheet"
    style.href = "https://kw-m.github.io/Portfolio-Website/WikiTrust/BookmarkletStyle.css"
    document.getElementsByTagName('head')[0].appendChild(style)
  }

  function injectUiFrame() {
    // Inject an iframe element that can serve as a container for UI & Controls:
    var uiFrame = window.WikiTrustGlobalVars.uiFrame = document.createElement("iframe")
    uiFrame.src = "https://kw-m.github.io/Portfolio-Website/WikiTrust/frame.html"
    uiFrame.id = "Wikitrust_UI"
    document.body.appendChild(uiFrame)
  }

  function cleanupWikiTrust() {
    // Remove the changes WikiTrust makes - This still doesn't undo making all the words seperate span elements, which could be a problem.
    hideTrust()
    removeFrameMessageListener()
    window.WikiTrustGlobalVars.uiFrame.remove();
    window.WikiTrustGlobalVars.styleElm.remove();
    window.WikiTrustGlobalVars = undefined;
  }

  window.WikiTrustGlobalVars["cleanupWikiTrust"] = cleanupWikiTrust;

  // Find the main wikipedia article content text element:
  var wikiContentTextElement = document.getElementById("mw-content-text");

  if (window.WikiTrustGlobalVars["highlightingDone"] !== false) { // Keep going if the script is not in the middle of processing:
    if (window.WikiTrustGlobalVars["highlightingDone"] !== true) { // Keep going if this script hasn't been run on the page yet (WikiTrustGlobalVars is undefined):

      window.WikiTrustGlobalVars["highlightingDone"] = false; // Mark that the WikiTrust script has started running.
      addWords(wikiContentTextElement)
      applyWordTrust()
      showTrust()
      injectStylesheet()
      injectUiFrame()
      addFrameMessageListener()
      window.WikiTrustGlobalVars["highlightingDone"] = true; // Mark that the WikiTrust script has finished running.

    } else {
      cleanupWikiTrust() // if this script has already been run on this page, and must be being loaded again, clean up / remove WikiTrust.
    }
  }

})()

// sources:
// http://kathack.com/js/kh.js
// https://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page
// https://stackoverflow.com/questions/31275446/how-to-wrap-part-of-a-text-in-a-node-with-javascript
