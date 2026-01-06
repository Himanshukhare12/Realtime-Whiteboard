// connect to socket server
const socket = io.connect("https://realtime-whiteboard-uvcg.onrender.com");
// *********************************Basic Setup
const board = document.querySelector(".board");
const toolbar = document.querySelector(".toolBar");

function setBoardSize() {
  const toolbarHeight = toolbar ? toolbar.getBoundingClientRect().height : 0;
  const height = Math.max(200, window.innerHeight - toolbarHeight);
  board.height = height;
  board.width = window.innerWidth;
  board.style.height = `${height}px`;
  board.style.width = "100%";
}

setBoardSize();
window.addEventListener("resize", setBoardSize);
// canvasRenderingContext2d=> tool
const ctx = board.getContext("2d");
ctx.strokeStyle = "blue";
ctx.imageSmoothingEnabled = true;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;
ctx.imageSmoothingQuality = "high";
ctx.lineWidth = 3;

// ************************Change Size**************************//
function sizeChange(value) {
  ctx.lineWidth = value;
  socket.emit("size", value);
}

// **tool Change***************************************************//
function handleLocaltoolChange(tool) {
  handleToolChange(tool);
  if (tool != "sticky");
  socket.emit("toolchange", tool);
}
// ******************handle color****************************
function handleColorChange(color) {
  ctx.strokeStyle = color;
  socket.emit("color", color);
}

const hamburger = document.querySelector(".hamburger");
const toolPanel = document.querySelector(".tool-panel");
hamburger.addEventListener("click", function () {
  handleHamburger()

  socket.emit("hamburger");
});

