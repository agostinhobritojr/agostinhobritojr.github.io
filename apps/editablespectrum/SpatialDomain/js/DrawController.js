var animationStatus = "stopped";


function drawKernel(kernel){
    contextCanvasImageFiltredArea.beginPath();
    contextCanvasImageFiltredArea.fillStyle = "blue";
    contextCanvasImageFiltredArea.globalAlpha = 0.1;
    contextCanvasImageFiltredArea.rect(kernel.topLeftCornerCol,kernel.topLeftCornerRow , kernel.numberColumns, kernel.numberRows );
    contextCanvasImageFiltredArea.fill();
    contextCanvasImageFiltredArea.closePath();

    contextCanvasImageFiltredArea.beginPath();
    contextCanvasImageFiltredArea.fillStyle = "red";
    contextCanvasImageFiltredArea.globalAlpha = 1;
    contextCanvasImageFiltredArea.rect(kernel.currentColumn,kernel.currentRow , 1, 1 );
    contextCanvasImageFiltredArea.fill();
    contextCanvasImageFiltredArea.closePath();

}

function drawImageFiltered(){

    var imageData = contextCanvasImageFiltredArea.getImageData(0,0,imageWidth,imageHeight);
    var data = imageData.data;

        for (var row = 0; row < imageHeight; row++) {
            for (var col = 0; col < imageWidth; col++) {
                index = ((row * imageWidth) + col);
                data[(index * 4)] = modifiedImageData[(index * 4)];
                data[(index * 4) + 1] = modifiedImageData[(index * 4) + 1];
                data[(index * 4) + 2] = modifiedImageData[(index * 4) + 2];
                data[(index * 4) + 3] = modifiedImageData[(index * 4) + 3];
            }
        }


    contextCanvasImageFiltredArea.putImageData(imageData,0,0);
}


function animation(kernel) {

    if(animationStatus == "running") {
        convolve(myKernel, originalImageData,modifiedImageData,animationSpeed,0);
        drawAnimationComponents(kernel);
        updatePositionField();
        window.requestAnimationFrame(function () {
            animation(kernel);
        });
    }

};

function drawAnimationComponents(kernel){
    drawImageFiltered();
    drawKernel(kernel);
}

function drawObjectWhileMouseDown(mouseCursorX, mouseCursorY){
    contextCanvasImageFiltredArea.putImageData(imageGeneratedFromLastMousePressUp,0,0);
    mouseCursorPositionInArea_X_mouseDown_While = mouseCursorX;
    mouseCursorPositionInArea_Y_mouseDown_While = mouseCursorY;
    drawShapeBorderWhileMouseDown();
}

function drawShapeBorderWhileMouseDown(){
    if(isButtonDrawingRectangleSelected){
        drawStrokeRectangleWhileMouseHold(mouseCursorPositionInArea_X_mouseDown_While,mouseCursorPositionInArea_Y_mouseDown_While,mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown);
    }
}

function drawObjectSavedInImage(){

    var OriginalIMageData = contextCanvasImageUploadedArea.getImageData(0,0, imageWidth, imageHeight);
    contextCanvasImageFiltredArea.putImageData(OriginalIMageData,0,0);

    for (var index = 0; index < objetcs.length; index++) {

        if (objetcs[index].type == shapeTypes[0]) {
            drawStrokedRectangle(objetcs[index].shape);
        }

    }
    imageGeneratedFromLastMousePressUp = contextCanvasImageFiltredArea.getImageData(0,0,imageWidth,imageHeight);
}

