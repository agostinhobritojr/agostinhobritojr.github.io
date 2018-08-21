var RectangleClear = function (coordinateX_InCanvasArea,coordinateY_InCanvasArea,width,height, isSelected) {
    this.coordinateX_InCanvasArea = coordinateX_InCanvasArea
    this.coordinateY_InCanvasArea = coordinateY_InCanvasArea
    this.width = width;
    this.height = height;
    this.isSelected = isSelected;
    this.isCtrlC = false;
}

function rectangleClear2Object(){
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
    var rectangleClear = new RectangleClear(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,rectWidth,rectHeight,false);
    object = new ObjectShape(shapeTypes[4],rectangleClear);
    return object;
}

function drawFilledClearRectangle(clearRectangle){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorClearArea;
    contextFourierTransformArea.globalAlpha= fillAlphaClearArea;
    contextFourierTransformArea.rect(clearRectangle.coordinateX_InCanvasArea, clearRectangle.coordinateY_InCanvasArea, clearRectangle.width,clearRectangle.height );
    contextFourierTransformArea.fill();
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.globalAlpha= borderAlphaClearArea;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function drawFilledClearRectangleSelected(clearRectangle){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.rect(clearRectangle.coordinateX_InCanvasArea, clearRectangle.coordinateY_InCanvasArea, clearRectangle.width,clearRectangle.height );
    contextFourierTransformArea.fill();
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function isClearRectangleSelected(clearRectangle,mouseX, mouseY){
    if( (mouseX > clearRectangle.coordinateX_InCanvasArea) && (mouseX < clearRectangle.coordinateX_InCanvasArea + clearRectangle.width) ){
        if((mouseY > clearRectangle.coordinateY_InCanvasArea) && (mouseY < clearRectangle.coordinateY_InCanvasArea + clearRectangle.height)){
            clearRectangle.isSelected = true;
            return;
        }
    }
    clearRectangle.isSelected = false;
}

function clearRectangleDisplacement(clearRectangle,deltaX,deltaY){
    clearRectangle.coordinateX_InCanvasArea = clearRectangle.coordinateX_InCanvasArea + deltaX;
    clearRectangle.coordinateY_InCanvasArea = clearRectangle.coordinateY_InCanvasArea + deltaY;
}

function ctrlV_clearRectangle(clearRectangle){
    if (clearRectangle.isCtrlC) {
        var recClear = new RectangleClear(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, clearRectangle.width, clearRectangle.height, false);
        var object = new ObjectShape(shapeTypes[4],recClear);
        objetcsShape.push(object);
        clearRectangle.isCtrlC = false;
    }
}

function drawFilledClearRectangleWhileMouseHold(mouseX_while,mouseY_while,mouseX,mouseY){

    var rectWidth = mouseX_while - mouseX;
    var rectHeight = mouseY_while - mouseY;
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorClearArea
    contextFourierTransformArea.globalAlpha= fillAlphaWhileDown;
    contextFourierTransformArea.rect(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,rectWidth,rectHeight);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.globalAlpha = borderAlphaWhileDown;
    contextFourierTransformArea.stroke();

}

function rectangleClearInSpectrum(retangleClear){

    for(var row=retangleClear.coordinateY_InCanvasArea; row<retangleClear.coordinateY_InCanvasArea+retangleClear.height; row++){

        for(var col=retangleClear.coordinateX_InCanvasArea; col<retangleClear.coordinateX_InCanvasArea+retangleClear.width; col++){
            //index = ((row*fftSpectrumModified.width)+col);
            //newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
            //newIndex = newIndex + (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);


            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4] = fftSpectrumOriginal.real[((row*fftSpectrumModified.width)+col)*4];
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4] = fftSpectrumOriginal.imag[((row*fftSpectrumModified.width)+col)*4];

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4 +1] = fftSpectrumOriginal.real[((row*fftSpectrumModified.width)+col)*4+1];
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4 +1] = fftSpectrumOriginal.imag[((row*fftSpectrumModified.width)+col)*4+1];

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4 +2] = fftSpectrumOriginal.real[((row*fftSpectrumModified.width)+col)*4+2];
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4 +2] = fftSpectrumOriginal.imag[((row*fftSpectrumModified.width)+col)*4+2];

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4 +3] = 255;
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4 +3] = 255;


            /*fftSpectrumModified.real[(newIndex)*4] = fftSpectrumOriginal.real[(newIndex)*4];
            fftSpectrumModified.imag[(newIndex)*4] = fftSpectrumOriginal.imag[(newIndex)*4];

            fftSpectrumModified.real[(newIndex)*4+1] = fftSpectrumOriginal.real[(newIndex)*4+1];
            fftSpectrumModified.imag[(newIndex)*4+1] = fftSpectrumOriginal.imag[(newIndex)*4+1];

            fftSpectrumModified.real[(newIndex)*4+2] = fftSpectrumOriginal.real[(newIndex)*4+2];
            fftSpectrumModified.imag[(newIndex)*4+2] = fftSpectrumOriginal.imag[(newIndex)*4+2];*/
        }
    }
}

