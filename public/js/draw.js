let isDrawing = false;

function beginStroke(clientX, clientY) {
  const top = getLocation();
  ctx.beginPath();
  ctx.moveTo(clientX, clientY - top);
  isDrawing = true;

  const point = {
    x: clientX,
    y: clientY - top,
    identifier: "mousedown",
    color: ctx.strokeStyle,
    width: ctx.lineWidth
  };
  undoStack.push(point);
  socket.emit("mousedown", point);
}

function continueStroke(clientX, clientY) {
  if (!isDrawing) return;
  const top = getLocation();
  ctx.lineTo(clientX, clientY - top);
  ctx.stroke();
  const point = {
    x: clientX,
    y: clientY - top,
    identifier: "mousemove",
    color: ctx.strokeStyle,
    width: ctx.lineWidth
  };
  undoStack.push(point);
  socket.emit("mousemove", point);
}

function endStroke() {
  isDrawing = false;
}

// Mouse support
board.addEventListener("mousedown", function(e) {
  beginStroke(e.clientX, e.clientY);
});

board.addEventListener("mousemove", function(e) {
  continueStroke(e.clientX, e.clientY);
});

board.addEventListener("mouseup", function() {
  endStroke();
});

// Touch support
board.addEventListener("touchstart", function(e) {
  const touch = e.touches[0];
  if (!touch) return;
  e.preventDefault();
  beginStroke(touch.clientX, touch.clientY);
}, { passive: false });

board.addEventListener("touchmove", function(e) {
  const touch = e.touches[0];
  if (!touch) return;
  e.preventDefault();
  continueStroke(touch.clientX, touch.clientY);
}, { passive: false });

board.addEventListener("touchend", function() {
  endStroke();
});

board.addEventListener("touchcancel", function() {
  endStroke();
});

const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");

let interval = null;

undo.addEventListener("mousedown", function() {
  interval = setInterval(function() {
    if (undoMaker()) socket.emit("undo");
  }, 50);
});

undo.addEventListener("mouseup", function() {
  clearInterval(interval);
});
redo.addEventListener("mousedown", function() {
  interval = setInterval(function() {
    if (redoMaker()) socket.emit("redo");
  }, 50);
});
redo.addEventListener("mouseup", function() {
  clearInterval(interval);
});

// Touch support for undo/redo buttons
undo.addEventListener("touchstart", function(e) {
  e.preventDefault();
  interval = setInterval(function() {
    if (undoMaker()) socket.emit("undo");
  }, 80);
}, { passive: false });

undo.addEventListener("touchend", function() {
  clearInterval(interval);
});

redo.addEventListener("touchstart", function(e) {
  e.preventDefault();
  interval = setInterval(function() {
    if (redoMaker()) socket.emit("redo");
  }, 80);
}, { passive: false });

redo.addEventListener("touchend", function() {
  clearInterval(interval);
});

function redraw() {
  ctx.clearRect(0, 0, board.width, board.height);

  for (let i = 0; i < undoStack.length; i++) {
    let { x, y, identifier, color, width } = undoStack[i];
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (identifier == "mousedown") {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (identifier == "mousemove") {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function getLocation() {
  const { top } = board.getBoundingClientRect();
  return top;
}
