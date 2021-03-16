function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.rect(startX, startY, Math.abs(x-startX), Math.abs(y-startY));
        ctx.stroke();
    }
}