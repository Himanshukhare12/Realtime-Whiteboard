// to create createBox for image ,sticky
function createBox(){
  const stickyPad = document.createElement("div");
  const navBar = document.createElement("div");
  const writingPad = document.createElement("div");
  const minimize = document.createElement("div");
  const close = document.createElement("div");
  stickyPad.setAttribute("class", "sticky-pad");
  navBar.setAttribute("class", "nav");
  writingPad.setAttribute("class", "writing-pad");
  close.setAttribute("class", "close");
  minimize.setAttribute("class", "minimize");
  navBar.appendChild(minimize);
  navBar.appendChild(close);
  stickyPad.appendChild(navBar);
  stickyPad.appendChild(writingPad);
  body.appendChild(stickyPad);
  // create sticky controls
  const attachControl = (el, handler) => {
    el.addEventListener("click", handler);
    el.addEventListener("touchstart", function(e) {
      e.preventDefault();
      handler();
    }, { passive: false });
  };

  attachControl(close, function() {
    stickyPad.remove();
  });

  let isMinimized = false;
  attachControl(minimize, function() {
    isMinimized == false
      ? (writingPad.style.display = "none")
      : (writingPad.style.display = "block");
    isMinimized = !isMinimized;
  });
  let initialX = null;
  let initialY = null;
  let isStickyDown = false;

  // added move sticky logic
  navBar.addEventListener("mousedown", function(e) {
    initialX = e.clientX;
    initialY = e.clientY;
    isStickyDown = true;
  });

  navBar.addEventListener("mousemove", function(e) {
    if (isStickyDown == true) {
      let finalX = e.clientX;
      let finalY = e.clientY;

      let diffX = finalX - initialX;
      let diffY = finalY - initialY;

      let { top, left } = stickyPad.getBoundingClientRect();

      stickyPad.style.top = top + diffY + "px";
      stickyPad.style.left = left + diffX + "px";

      initialX = finalX;
      initialY = finalY;
    }
  });
  // sticky => mouseup
  navBar.addEventListener("mouseup", function() {
    isStickyDown = false;
  });
  // pointer => moved off sticky
  navBar.addEventListener("mouseleave", function() {
    isStickyDown = false;
  });

  // touch drag for sticky
  navBar.addEventListener("touchstart", function(e) {
    const t = e.touches[0];
    if (!t) return;
    e.preventDefault();
    initialX = t.clientX;
    initialY = t.clientY;
    isStickyDown = true;
  }, { passive: false });

  navBar.addEventListener("touchmove", function(e) {
    const t = e.touches[0];
    if (!t || !isStickyDown) return;
    e.preventDefault();
    let finalX = t.clientX;
    let finalY = t.clientY;
    let diffX = finalX - initialX;
    let diffY = finalY - initialY;
    let { top, left } = stickyPad.getBoundingClientRect();
    stickyPad.style.top = top + diffY + "px";
    stickyPad.style.left = left + diffX + "px";
    initialX = finalX;
    initialY = finalY;
  }, { passive: false });

  navBar.addEventListener("touchend", function() {
    isStickyDown = false;
  });

  navBar.addEventListener("touchcancel", function() {
    isStickyDown = false;
  });
  document.body.appendChild(stickyPad);
  return writingPad;

}

// utility fn to handle handleHamburger icon
let isActive = true;
function handleHamburger() {
  if (isActive == true) {
    hamburger.classList.remove("is-active");
    toolPanel.classList.remove("add-animation");
  } else {
    hamburger.classList.add("is-active");
    toolPanel.classList.add("add-animation");
  }

  isActive = !isActive;
}





// utility fn to handle tool change
let Activetool = "pencil";

const pencilOptions = document.querySelector(".tool-options.pencil");
const eraserOptions = document.querySelector(".tool-options.eraser");
const tools = document.querySelectorAll(".tool");
const inputs = document.querySelectorAll("input[type=range]");
// console.log(tool);
const ImageInput = document.querySelector(".upload-img");
function handleToolChange(tool) {
  if (tool == "pencil") {
    if (Activetool == "pencil") {
      // toggle options when clicking the active tool
      pencilOptions.classList.toggle("show");
    } else {
      Activetool = "pencil";
      eraserOptions.classList.remove("show");
      tools[1].classList.remove("active");
      tools[0].classList.add("active");
      ctx.strokeStyle = "blue";
      ctx.lineWidth = inputs[0].value;
      ctx.globalCompositeOperation = "source-over";
      pencilOptions.classList.add("show");
    }
  } else if (tool == "eraser") {
    if (Activetool == "eraser") {
      // toggle options when clicking the active tool
      eraserOptions.classList.toggle("show");
    } else {
      Activetool = "eraser";
      // console.log(tool[1].classList);
      tools[0].classList.remove("active");
      tools[1].classList.add("active");
      pencilOptions.classList.remove("show");
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = inputs[0].value;

      eraserOptions.classList.add("show");

      // remove other options
      // set yourself active
      // change style
    }
  } else if (tool == "sticky") {
    createSticky();
  }
}

//***********Undo stack****** */
let undoStack = [];
let redoStack = [];
function undoMaker() {
  if (undoStack.length > 0) {
    redoStack.push(undoStack.pop());
    redraw();
    return true;
  }
  return false;
}

// **********************redo Stack
function redoMaker() {
  if (redoStack.length > 0) {
    undoStack.push(redoStack.pop());
    redraw();
    return true;
  }
  return false;
}


// Theme toggle handling
document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector(".theme-icon");
  const applyIcon = () => {
    const isDark = document.body.classList.contains("theme-dark");
    if (icon) icon.textContent = isDark ? "🌙" : "☀️";
  };

  const stored = localStorage.getItem("theme");
  if (stored === "dark") {
    document.body.classList.add("theme-dark");
  } else if (stored === "light") {
    document.body.classList.remove("theme-dark");
  } else {
    document.body.classList.add("theme-dark");
    localStorage.setItem("theme", "dark");
  }
  applyIcon();

  toggleBtn.addEventListener("click", function() {
    document.body.classList.toggle("theme-dark");
    const isDark = document.body.classList.contains("theme-dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyIcon();
  });
});


