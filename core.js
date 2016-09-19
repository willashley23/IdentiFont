
let MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';
let prevDOM = null;
let font;

document.addEventListener('mousemove', function (e) {
  let srcElement = e.srcElement;
  let elements = ['H1', 'P', 'SPAN', 'H2', 'H3', 'A', 'LI']

  if (elements.includes(srcElement.nodeName)) {
    let visited = false;
    let popup;
    let fontel;
    for (var i = srcElement.children.length - 1; i >= 0; i--) {
      if (srcElement.children[i].className === "popup") {
        visited = true;
      }
    }
    let hasSpan = false;
    for (var i = srcElement.classList.length - 1; i >= 0; i--) {
      if (srcElement.classList[i] === "popup") {
        hasSpan = true;
      }
    }
    if (!visited && srcElement.classList !== "popup") {
      popup = document.createElement('span')
      popup.className="popup"
      font = window.getComputedStyle(srcElement).fontFamily
      popup.innerHTML = font;
      srcElement.appendChild(popup) 
    }
    if (prevDOM != null && prevDOM != srcElement) {
      if (prevDOM.childElementCount > 0) {
        for (var i = prevDOM.children.length - 1; i >= 0; i--) {
          if (prevDOM.children[i].className === "popup") {
            prevDOM.removeChild(prevDOM.children[i])
            prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
          }
        }
      }
    }
    srcElement.classList.add(MOUSE_VISITED_CLASSNAME);
    prevDOM = srcElement;
  } else {
    if (prevDOM != null && prevDOM != srcElement) {
      if (prevDOM.childElementCount > 0) {
        for (var i = prevDOM.children.length - 1; i >= 0; i--) {
          if (prevDOM.children[i].className === "popup") {
            prevDOM.removeChild(prevDOM.children[i])
          }
        }
      }
      prevDOM = srcElement;
    }
  }
}, false);
          