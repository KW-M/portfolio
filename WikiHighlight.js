//javascript:(function(){var%20script=document.createElement('script');script.src='https://kw-m.github.io/Portfolio-Website/WikiHighlight.js';document.getElementsByTagName('head')[0].appendChild(script);})()


var wikiContentTextElement = document.getElementById("mw-content-text"),
  domNodes = [],
  REPLACE_WORDS_IN = {
    a: 1, b: 1, big: 1, body: 1, cite: 1, code: 1, dd: 1, div: 0,
    dt: 1, em: 1, font: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1,
    i: 1, label: 1, legend: 1, li: 1, p: 1, pre: 1, small: 1,
    span: 1, strong: 1, sub: 1, sup: 1, td: 1, th: 1, tt: 1, table: 0
  };

var percentColors = [
  { pct: 0.0, color: { r: 0xfc, g: 0x4a, b: 0x1a } }, //#fc4a1a //#ffaa93
  { pct: 0.5, color: { r: 0xf7, g: 0xb7, b: 0x33 } }, //#f7b733
  { pct: 1.0, color: { r: 0xff, g: 0xff, b: 0xff } }];

var getColorForPercentage = function (pct, opacity) {
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
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

function addDomNode(el) {
  if (el !== undefined && el !== null) {
    el.khIgnore = true;
    domNodes.push(el)
  }
}

function shouldAddChildren(el) {
  return el.tagName && REPLACE_WORDS_IN[el.tagName.toLowerCase()];
}

function textNodesUnder(node) {
  var all = [];
  if (!shouldAddChildren(node)) return all;
  for (node = node.firstChild; node; node = node.nextSibling) {
    if (node.nodeType == 3) {
      all.push(node);
    } else {
      all = all.concat(textNodesUnder(node));
    }
  }
  return all;
};


function addWords(el) {
  var textEls = [];

  function buildTextEls(el, shouldAdd) {
    var i, len;
    if (shouldAdd && el.nodeType === Node.TEXT_NODE &&
      el.nodeValue.trim().length > 0) {
      textEls.push(el);
      return;
    }
    if (!el.childNodes || el.khIgnore) {
      return;
    }
    shouldAdd = shouldAddChildren(el);
    for (i = 0, len = el.childNodes.length; i < len; i++) {
      buildTextEls(el.childNodes[i], shouldAdd);
    }
  }

  function wordsToSpans(textEl) {
    var p = textEl.parentNode,
      words = textEl.nodeValue.split(/\s+/),
      ws = textEl.nodeValue.split(/\S+/),
      i, n, len = Math.max(words.length, ws.length);
    /* preserve whitespace for pre tags. */
    if (ws.length > 0 && ws[0].length === 0) {
      ws.shift();
    }
    for (i = 0; i < len; i++) {
      if (i < words.length && words[i].length > 0) {
        n = document.createElement('span');
        n.innerHTML = words[i];
        p.insertBefore(n, textEl);
        addDomNode(n);
      }
      if (i < ws.length && ws[i].length > 0) {
        n = document.createTextNode(ws[i]);
        p.insertBefore(n, textEl);
      }
    }
    p.removeChild(textEl);
  }

  buildTextEls(el, shouldAddChildren(el));
  textEls.map(wordsToSpans);

};

function applyWordTrust() {
  domNodes.forEach(function (node, index) {
    wordScore = 1 - (Math.max(Math.sin(index / 80) + 0.2 - Math.random() / 0.6, 0)) // fake word score formula to mimic actual algorithim
    node.setAttribute("data-trust-score", wordScore)
  })
}

function showTrust() {
  console.log(domNodes)
  domNodes.forEach(function (node, index) {
    var wordScore = node.getAttribute("data-trust-score")
    node.style.borderBottom = "2px solid " + getColorForPercentage(wordScore, 1);
    node.style.backgroundColor = getColorForPercentage(wordScore, 0.1);
    // node.style.boxShadow = "0px 0px 10px " + getColorForPercentage(wordScore, 1) + ", inset 0px 0px 10px " + getColorForPercentage(wordScore, 1)
    // node.style.textShadow = "0px 0px 10px " + getColorForPercentage(wordScore, 0.8);
    // node.style.borderBottom = "1px solid " + getColorForPercentage(wordScore, 1);
  });
}

function hideTrust() {
  domNodes.forEach(function (node, index) {
    node.style.borderBottom = "2px solid transparent";
  })
}

uiFrame = document.createElement("iframe")
uiFrame.src = "http://localhost:8000/frame.html"
uiFrame.style.position = "fixed"
uiFrame.style.height = "38px"
uiFrame.style.width = "calc(100% - 177px)"
uiFrame.style.right = "0px"
uiFrame.style.bottom = "0px"
uiFrame.style.border = "none"
uiFrame.style.borderTop = "1px solid #a2a9b1"
document.body.appendChild(uiFrame)

function receiveUiFrameMessage(event) {
  message = event.data;
  console.log("Got cross frame message: " + event.data + " from " + event.origin)
  if (message === "show_trust") {
    showTrust()
  } else if (message === "hide_trust") {
    hideTrust()
  }
}

if (window.addEventListener) {  // For standards-compliant web browsers
  window.addEventListener("message", receiveUiFrameMessage, false);
} else {
  window.attachEvent("onmessage", receiveUiFrameMessage);
}

addWords(wikiContentTextElement)
applyWordTrust()
showTrust()


//https://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page
//https://stackoverflow.com/questions/31275446/how-to-wrap-part-of-a-text-in-a-node-with-javascript
//https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
//http://kathack.com/js/kh.js
