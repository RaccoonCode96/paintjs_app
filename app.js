// Variable 01
    // Canvas
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

    // Color & Line Weight
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const check = document.getElementById("jsCheck");
const customColor = document.querySelector("#jsColorCustom");

    // Cursor
const mouseCursor = document.querySelector(".cursor");
const cursorRange = document.querySelector(".cursor_range");

    // Canvas Size
const widthForm = document.querySelector(".controls__width");
const heightForm = document.querySelector(".controls__height");

    // Button
const saveBtn = document.getElementById("jsSave");
const rectBtn = document.querySelector("#jsRect");
const paintBtn = document.querySelector("#jsPaint");
const fillBtn = document.querySelector("#jsFill");

    // Rectangle Guideline
const guide = document.querySelector(".guide");



// INIT VALUE
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const CURSOR_RANGE_CTRL = 0.1;
mouseCursor.classList.remove("cursor")


    // Caution : be careful Order!
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

check.style.backgroundColor = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;




// Variable 02
    // Mode
let paint = true;
let painting = false;
let rect = false;
let recting = false;
let fill = false;

    // Start Location
let startPX = 0; 
let startPY = 0;
let startOX = 0;
let startOY = 0;

    // BorderWidth
let sizing = 2.5;






// FUNCTIOINS

// GUIDE
function handleGuide(event) {
    if(rect === true && recting === true) {
        ctx.canvas.style.cursor = "none";
        guide.classList.add("guide_show");
    } else {
        guide.classList.remove("guide_show");
    }
}

function hideGuide() {
    guide.classList.remove("guide_show");
}


// RECTING
function startRecting(event) {
    if(rect === true) {
        recting = true;
        startPX = event.pageX;
        startPY = event.pageY;
        startOX = event.offsetX;
        startOY = event.offsetY;
        ctx.beginPath();
    }
}

function stopRecting(event) {
    if(rect === true) {
        recting = false;
        ctx.stroke();
        ctx.closePath();
    }
}


function onMouseMoveR(event) {
    if(rect === true) {
        const x = event.pageX;
        const y = event.pageY;
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;
        if(!recting) {
        
        } else{
            const width = x-startPX;
            const height = y-startPY;
            // Guide Width , Height, Location
            guide.style.width = Math.abs(width - sizing) + "px";
            guide.style.height = Math.abs(height - sizing) + "px";
            guide.style.top = (startPY - sizing/2) + "px";
            guide.style.left = (startPX - sizing/2) + "px";
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            ctx.rect(startOX, startOY, width, height);
        }
    }
}

function handleRectClick(event) {
    if(rect === false) {
        rect = true;
        fill = false;
        paint = false;
        ctx.canvas.style.cursor = "none";
    }
}


// PAINTING
function startPainting(event) {
    if(paint === true) {
        painting = true;
    }
}

function stopPainting(event) {
    if(paint === true) {
        painting = false;
    }
}

function onMouseMove(event) {
    if (paint === true) {
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
}

function handlePaintClick(event) {
    if(paint === false) {
        rect = false;
        fill = false;
        paint = true;
        ctx.canvas.style.cursor = "none";
    }
}



// FILLING
function handleFillClick() {
    if (fill === false) {
        paint = false;
        rect = false; 
        fill = true;
        ctx.canvas.style.cursor = "pointer";
        mouseCursor.classList.remove("cursor");
    } 
}

function handleCanvasClick() {
    if (fill === true) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}



// COLOR
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    check.style.backgroundColor = color;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
    guide.style.borderColor = color;
}

function handleCColorChange(event) {
    const color = event.target.value;
    check.style.backgroundColor = color;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
    guide.style.borderColor = color;
}



// LINE WEIGHT
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
    sizing = size;
    cursorRange.style.width = size * CURSOR_RANGE_CTRL + "rem";
    cursorRange.style.height = size * CURSOR_RANGE_CTRL + "rem";
    guide.style.borderWidth = size +"px";
}


// SAVE
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


// CURSOR
function handleCursor(event) {
    if(paint === true || rect === true) {
        ctx.canvas.style.cursor = "none";
        mouseCursor.classList.add("cursor");
    } else {
        ctx.canvas.style.cursor = "pointer";
        mouseCursor.classList.remove("cursor");
    }
    mouseCursor.style.top = event.pageY + "px";
    mouseCursor.style.left = event.pageX + "px";
}

function hideCursor() {
    mouseCursor.classList.remove("cursor");
}



// CAVAS SIZE
function  handleCanvasWidth(event) {
    event.preventDefault();
    canvas.width = event.target[0].value;
    // Color Init Problem
    ctx.strokeStyle = check.style.backgroundColor
    ctx.fillStyle = ctx.strokeStyle;
}

function handleCanvasHeight(event) {
    event.preventDefault();
    canvas.height = event.target[0].value;
    ctx.strokeStyle = check.style.backgroundColor
    ctx.fillStyle = ctx.strokeStyle;
}
    

// EVENTS    
    
if (canvas) {
    // RECT
    canvas.addEventListener("mousemove", onMouseMoveR);
    canvas.addEventListener("mousedown", startRecting);
    canvas.addEventListener("mouseup", stopRecting);
    canvas.addEventListener("mouseleave", stopRecting);
    // PAINT
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    // FILL
    canvas.addEventListener("click", handleCanvasClick);
    // CURSOR
    canvas.addEventListener("mouseleave", hideCursor);
    canvas.addEventListener("mousemove", handleCursor);
    // SAVE
    canvas.addEventListener("contextmenu", handleCM);
    // GUIDE
    canvas.addEventListener("mouseleave", hideGuide);
    canvas.addEventListener("mousemove", handleGuide);
}






// Color & Range(line weight)

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (customColor) {
    customColor.addEventListener("input", handleCColorChange);
}

if (range) {
range.addEventListener("input", handleRangeChange);
};

// Canvas Size

if (widthForm) {
    widthForm.addEventListener("submit", handleCanvasWidth);
}

if (heightForm) {
    heightForm.addEventListener("submit", handleCanvasHeight);
}


// buttons

if (rectBtn) {
    rectBtn.addEventListener("click", handleRectClick);
}

if (fillBtn) {
    fillBtn.addEventListener("click", handleFillClick);
}

if (paintBtn) {
    paintBtn.addEventListener("click", handlePaintClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}




