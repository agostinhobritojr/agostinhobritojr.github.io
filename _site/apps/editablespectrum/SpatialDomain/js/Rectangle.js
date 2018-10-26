var Rectangle = function (coordinateX_InCanvasArea,coordinateY_InCanvasArea,width,height, isSelected) {
    this.coordinateX_InCanvasArea = coordinateX_InCanvasArea
    this.coordinateY_InCanvasArea = coordinateY_InCanvasArea
    this.width = width;
    this.height = height;
    this.isSelected = isSelected;
    this.isCtrlC = false;
}

function rectangle2Object(){

    var object;
    var rectWidth = mouseCursorPositionInArea_X_mouseDown_While - mouseCursorPositionInArea_X_mouseDown;
    var rectHeight = mouseCursorPositionInArea_Y_mouseDown_While - mouseCursorPositionInArea_Y_mouseDown;
    if(rectWidth < 0){
        mouseCursorPositionInArea_X_mouseDown = mouseCursorPositionInArea_X_mouseDown + rectWidth;
        rectWidth = -rectWidth;
    }
    if(rectHeight < 0){
        mouseCursorPositionInArea_Y_mouseDown = mouseCursorPositionInArea_Y_mouseDown + rectHeight;
        rectHeight = -rectHeight;
    }
    var rectangle = new Rectangle(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,rectWidth,rectHeight,false);
    object = new ObjectShape(shapeTypes[0],rectangle);
    return object;

}

function drawStrokedRectangle(rectangle){
    contextCanvasImageFiltredArea.beginPath();
    contextCanvasImageFiltredArea.rect(rectangle.coordinateX_InCanvasArea, rectangle.coordinateY_InCanvasArea, rectangle.width,rectangle.height);
    contextCanvasImageFiltredArea.strokeStyle = "red";
    contextCanvasImageFiltredArea.lineWidth = 0.3;
    contextCanvasImageFiltredArea.globalAlpha = 0.5;
    contextCanvasImageFiltredArea.stroke();
}



function drawStrokeRectangleWhileMouseHold(mouseX_while,mouseY_while,mouseX,mouseY) {
    var rectWidth = mouseX_while - mouseX;
    var rectHeight = mouseY_while - mouseY;
    contextCanvasImageFiltredArea.beginPath();
    contextCanvasImageFiltredArea.rect(mouseCursorPositionInArea_X_mouseDown, mouseCursorPositionInArea_Y_mouseDown, rectWidth, rectHeight);
    contextCanvasImageFiltredArea.strokeStyle = "red";
    contextCanvasImageFiltredArea.lineWidth = 0.3;
    contextCanvasImageFiltredArea.globalAlpha = 0.5;
    contextCanvasImageFiltredArea   .stroke();
}






