
  console.log("working")
alert("woirking")
  var wikiContentTextElement = document.getElementById("mw-content-text");
  window.wordIndex = 0;

  function textNodesUnder(node) {
    var all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
      if (node.nodeType == 3) all.push(node);
      else all = all.concat(textNodesUnder(node));
    }
    return all;
  }

  var textNodes = textNodesUnder(wikiContentTextElement);
  for (var i = 0; i < textNodes.length; i++) {
    var node = textNodes[i];
    words = node.nodeValue.trim().split(/\s+/);

    var spanNode = document.createElement("span");
    for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
      var wordNode = document.createElement("span");
      if (wordIndex % 2 == 0) {
        wordNode.style.backgroundColor =
          "#FFFF" + Math.round(Math.random() * 99);
      }
      wordNode.innerText = words[wordIndex] + " ";
      spanNode.appendChild(wordNode);
    }
    node.parentElement.replaceChild(spanNode, node);
  }

