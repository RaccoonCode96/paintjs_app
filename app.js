const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const check = document.getElementById("jsCheck");
const mouseCursor = document.querySelector(".cursor")
const cursorRange = document.querySelector(".cursor_range")


const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;
const CURSOR_RANGE_CTRL = 0.1;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

mouseCursor.classList.remove("cursor")
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

check.style.backgroundColor = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function startPainting(event) {
    painting = true;
}

function stopPainting(event) {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    check.style.backgroundColor = color;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
    cursorRange.style.width = size * CURSOR_RANGE_CTRL + "rem";
    cursorRange.style.height = size * CURSOR_RANGE_CTRL + "rem";
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "fill";
        ctx.canvas.style.cursor = "none";
    } else {
        filling = true;
        mode.innerText = "paint";
        ctx.canvas.style.cursor = "pointer";
    }
}

function handleCanvasClick() {
    if (filling === true) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function handleCursor(event) {
    if(filling === false) {
        mouseCursor.classList.add("cursor");
    } else {
        mouseCursor.classList.remove("cursor");
    }
    mouseCursor.style.top = event.pageY + "px";
    mouseCursor.style.left = event.pageX + "px";
}

function hideCursor() {
    mouseCursor.classList.remove("cursor");
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mouseleave", hideCursor);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    canvas.addEventListener("mousemove", handleCursor);
}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
};

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}




