/* WikiTrust.js
This script does all of the work: injecting UI, spliting up the document, and highlighing the words.
It gets injected into all pages on the wikipedia domain by the extension.
This doesn't depend on any libraries or files outside of the core folder, so it can function on its own outside of an extension.
You can quickly test this file by copying and pasting it into your browser's console on any wikipedia page.
*/

// Bookmarklet JS:
// javascript:(function(){var%20script=document.createElement('script');script.src='https://kw-m.github.io/Portfolio-Website/WikiTrust/core/WikiTrust.js';document.getElementsByTagName('head')[0].appendChild(script);script.remove()})()

if (window.WikiTrustGlobalVars === undefined)
  window.WikiTrustGlobalVars = { completionStage: 0, wordDomNodes: [] };

(function () { // Using an anonoumous function to avoid putting our variables in the wikipedia page's scope (so they dont interfere with Wikipedia's javascript).

  // dictionary of html element types to apply the word spliting / wrapping functions to and then add the contained word elements to the wordDomNodes array.
  const REPLACE_WORDS_IN = {
    p: 1, a: 1, span: 1,
    b: 1, big: 1, cite: 1, code: 1, dd: 1,
    dt: 1, em: 1, font: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1,
    i: 1, label: 1, legend: 1, ul: 1, li: 1, pre: 1, small: 1,
    span: 1, strong: 1, sub: 1, sup: 1, td: 1, th: 1, tt: 1, div: 1, li: 1, caption: 1
  };
  // array of html element class names exclude from the word spliting / wrapping functions and so exlude the contained words from the wordDomNodes array.
  const EXCLUDE_ELEMENT_CLASSES = ["reference", "wikitable", "toc", "infobox", "thumb", "mw-editsection", "navbox", "metadata", "tmbox", "sistersitebox", "portal"]// "reference" "sistersitebox" "navbox"

  const SCORE_ATTRIBUTE_NAME = "data-trust-score";
  const WORD_INDEX_ATTRIBUTE_NAME = "data-word-index";

  const COMPLETION_STAGES = { just_loaded: 0, button_injected: 1, ui_injected: 2, api_sent: 3, api_recived: 4, page_processed: 5 }
  const ENVIRONMENTS = { bookmarklet: 0, firefox_extension: 1, chrome_extension: 2 }

  if (typeof browser !== 'undefined' && typeof browser.extension !== 'undefined') { // check if the firefox extension "browser" namespace is avalable
    var ENVIRONMENT = ENVIRONMENTS.firefox_extension
  } else if (typeof chrome !== 'undefined' && typeof chrome.extension !== 'undefined') { // check if the chrome extension "chrome" namespace is avalable
    var ENVIRONMENT = ENVIRONMENTS.chrome_extension
    var browser = chrome; // reference the chrome extension namespace as the variable "browser" for eaisier access when it is avalable.
  } else {
    var ENVIRONMENT = ENVIRONMENTS.bookmarklet
  }

  var completionStage = window.WikiTrustGlobalVars.completionStage;

  // placeholder array for references to all word span elements that will be created on the page.
  var wordDomNodes = window.WikiTrustGlobalVars["wordDomNodes"];

  var getColorForPercentage = function (pct, opacity) { // Source: https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
    var percentColorsGradient = [ // Define a gradient (0 = least trustworthy color, 1 = most trustworthy color)
      { pct: 0.0, color: { r: 0xfc, g: 0x4a, b: 0x1a } }, // #fc4a1a
      { pct: 0.5, color: { r: 0xf7, g: 0xb7, b: 0x33 } }, // #f7b733
      { pct: 1.0, color: { r: 0xff, g: 0xff, b: 0xff } }  // white
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

  var addWord_prevEl = null, addWord_wordIndex = 0;
  function addWordElementToList(element) {
    if (element !== undefined && element !== null && element.nodeType !== Node.TEXT_NODE) {
      if (!(addWord_prevEl !== undefined && addWord_prevEl !== null && addWord_prevEl.nodeType !== Node.TEXT_NODE)) addWord_wordIndex++;
      element.setAttribute(WORD_INDEX_ATTRIBUTE_NAME, addWord_wordIndex) // Adds a custom html attribute (convention is they start with "data") on the word/partial word element node with the word's index
      wordDomNodes.push(element); //
    }
    addWord_prevEl = element;
  }

  function checkElementTag(element) {
    return element.tagName && REPLACE_WORDS_IN[element.tagName.toLowerCase()];
  }

  function checkForExcludedClass(element) {
    // loops through the EXCLUDE_ELEMENT_CLASSES array and checks the element for each class name.
    function hasClass(className) {
      // looks for the className in the element's classes string (the spaces ensure only full class names not just a part of the class name is matched).
      return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
    for (let index = 0; index < EXCLUDE_ELEMENT_CLASSES.length; index++) {
      const className = EXCLUDE_ELEMENT_CLASSES[index];
      if (hasClass(className)) return true
    }
    return false
  }

  function addWords(el) { // source: http://kathack.com/js/kh.js
    var textEls = [];

    function buildTextEls(el) {
      // if the current element is a text node with some non-whitespace length, add it to the textEls array (recusive base case):
      if (el.nodeType === Node.TEXT_NODE && el.nodeValue.trim().length > 0) {
        textEls.push(el);
        return;
      }
      // check the current element to see if it doesn't pass the classe filters or the element tags we dont want, return to prevent further recustion/adding of children from happening:
      var excludedElementFound = !checkElementTag(el) || checkForExcludedClass(el);
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
      /* check if this element has already been labeled with a score, in which case we shouldn't wrap the word in another tag. */
      if (p.getAttribute(SCORE_ATTRIBUTE_NAME) != null) {
        addWordElementToList(p);
        return;
      }
      /* for every word/whitespace add it either as a new span element (words) or a new text node (whitespace) to the original containing element in the order they appeared in the original text. */
      for (var i = 0; i < len; i++) {
        if (i < words.length && words[i].length > 0) {
          n = document.createElement('span');
          n.innerHTML = words[i];
          p.insertBefore(n, textEl);
          addWordElementToList(n);
        }
        if (i < ws.length && ws[i].length > 0) {
          n = document.createTextNode(ws[i]);
          p.insertBefore(n, textEl);
          addWordElementToList(n);
        }
      }
      // remove the original text (since we've replaced it with the word spans & whitespace elements)
      p.removeChild(textEl);
    }

    buildTextEls(el); // Fills the texEls array with all the text nodes on the page that have a parentNode that fits the element tag and class filters.
    textEls.map(wordsToSpans); // For each textNode element in textEls array run the wordsToSpans function on it.
  };

  function applyWordTrust() {
    // Loops through the nodes in the wordDomNodes array and adds the trust as an element attribute
    var node, wordIndex, len = wordDomNodes.length;
    for (var nodeIndex = 0; nodeIndex < len; nodeIndex++) {
      node = wordDomNodes[nodeIndex];
      wordIndex = node.getAttribute(WORD_INDEX_ATTRIBUTE_NAME) // set when the elements are found
      wordScore = 1 - (Math.min(Math.max(Math.sin(wordIndex / 80) + 1 - 0.5 / 0.6, 0), 1)) // Fake word score formula to mimic actual algorithim (replace with 0 to hightlight everything in red)
      node.setAttribute(SCORE_ATTRIBUTE_NAME, wordScore) // Adds a custom html attribute (convention is they start with "data") on the word element node with the wordScore value
      // if (wordIndex === null) catch odd errors?
    }
  }

  function showTrust() {
    // Loops through the nodes in the wordDomNodes array and applies the trust style from the word's trust score (contained in the elements SCORE_ATTRIBUTE_NAME attribute value)
    window.WikiTrustGlobalVars.WTButton.innerText = "Hide WikiTrust"
    window.WikiTrustGlobalVars.uiFrame.style.display = "block";
    wordDomNodes.forEach(function (node) {
      var wordScore = node.getAttribute(SCORE_ATTRIBUTE_NAME)
      node.style.borderBottom = "1px solid " + getColorForPercentage(wordScore, 1);
      node.style.backgroundColor = getColorForPercentage(wordScore, 0.1);
      // - alternative styling modes -
      // node.style.boxShadow = "0px 0px 10px " + getColorForPercentage(wordScore, 1) + ", inset 0px 0px 10px " + getColorForPercentage(wordScore, 1)
      // node.style.textShadow = "0px 0px 10px " + getColorForPercentage(wordScore, 0.8);
      // node.style.borderBottom = "1px solid " + getColorForPercentage(wordScore, 1);
    });
    window.WikiTrustGlobalVars.trustVisible = true
  }

  function hideTrust() {
    window.WikiTrustGlobalVars.WTButton.innerText = "Show WikiTrust"
    window.WikiTrustGlobalVars.uiFrame.style.display = "none";
    wordDomNodes.forEach(function (node) {
      node.style.borderBottom = "unset";
      node.style.backgroundColor = "unset";
    })
    window.WikiTrustGlobalVars.trustVisible = false
  }

  function receiveUiFrameMessage(event) {
    // When a message is recived from an iframe, this function is called with the message string and origin (see listener registered below):
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

  function injectButton() {
    const button = window.WikiTrustGlobalVars.WTButton = document.createElement('button')
    button.id = "WitiTrustActivateButton"
    button.innerText = "Show WikiTrust"
    button.onclick = function () {
      if (completionStage === COMPLETION_STAGES.button_injected) setupWikiTrust();
      else if (window.WikiTrustGlobalVars.trustVisible === false) {
        showTrust();
      } else if (window.WikiTrustGlobalVars.trustVisible === true) {
        hideTrust();
      }
    }
    document.body.appendChild(button)
  }

  function injectStylesheet() {
    // Inject a stylesheet into the current page.
    const style = window.WikiTrustGlobalVars.styleElm = document.createElement("link");
    style.rel = "stylesheet"
    // For the extension ENVIRONMENT use the stylesheet from the extension, otherwise use the same stylesheet hosted on the web:
    style.href = (ENVIRONMENT !== ENVIRONMENTS.bookmarklet ? browser.extension.getURL('core/WikiTrustStyle.css') : "https://kw-m.github.io/Portfolio-Website/WikiTrust/core/WikiTrustStyle.css")
    document.getElementsByTagName('head')[0].appendChild(style)
  }

  function injectUiFrame() {
    // Inject an iframe element that can serve as a container for UI & Controls:
    const uiFrame = window.WikiTrustGlobalVars.uiFrame = document.createElement("iframe")
    uiFrame.id = "Wikitrust_UI"
    // For the extension ENVIRONMENT use the uiFrame html from the extension, otherwise use the same html hosted on the web:
    uiFrame.src = (ENVIRONMENT !== ENVIRONMENTS.bookmarklet ? browser.extension.getURL('core/UIFrame.html') : "https://kw-m.github.io/Portfolio-Website/WikiTrust/core/UIFrame.html")
    document.body.appendChild(uiFrame)
  }

  function setupWikiTrust() {
    if (window.WikiTrustGlobalVars.completionStage = COMPLETION_STAGES.button_injected) {
      injectUiFrame();
      addFrameMessageListener()
      completionStage = COMPLETION_STAGES.ui_injected; // Mark that WikiTrust has injected the uiFrame.
      addWords(wikiContentTextElement)
      completionStage = COMPLETION_STAGES.api_sent;
      // fetching real trust data from api would go here.
      completionStage = COMPLETION_STAGES.api_recived;
      applyWordTrust()
      showTrust()
      completionStage = COMPLETION_STAGES.page_processed; // Mark that WikiTrust has finished setup.
    }
  }

  function cleanupWikiTrust() {
    // Remove the changes WikiTrust makes - This still doesn't undo making all the words seperate span elements, which could be a problem.
    hideTrust()
    removeFrameMessageListener()
    window.WikiTrustGlobalVars.uiFrame.remove();
    window.WikiTrustGlobalVars.styleElm.remove();
    window.WikiTrustGlobalVars = undefined;
  }

  // Find the main wikipedia article content text element:
  const wikiContentTextElement = document.getElementById("mw-content-text");

  if (completionStage === COMPLETION_STAGES.just_loaded) { // Keep going if this script hasn't been run on the page yet:
    injectStylesheet();
    injectButton();
    completionStage = COMPLETION_STAGES.button_injected; // Mark that WikiTrust has injected the button.
    if (ENVIRONMENT === ENVIRONMENTS.bookmarklet) setupWikiTrust();
  } else {
    if (window.WikiTrustGlobalVars.trustVisible === false) showTrust(); else hideTrust();
    //cleanupWikiTrust() // if this script has already been run on this page, and must be being loaded again, clean up / remove WikiTrust.
  }
  return "done"
})()

// sources:
// http://kathack.com/js/kh.js
// https://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page
// https://stackoverflow.com/questions/31275446/how-to-wrap-part-of-a-text-in-a-node-with-javascript
