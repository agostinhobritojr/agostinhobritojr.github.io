var RectangleClearConjugate = function(rectangleClear1,rectangleClear2, isSelected){
    this.rectangleClear1 = rectangleClear1;
    this.rectangleClear2 = rectangleClear2;
    this.isSelected = isSelected;
    this.isCtrlC = false;
}

function rectangleClearConjugate2Object(canvasEditableAreaWidth,canvasEditableAreaHeight){
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

    var rectangleClear1 = new RectangleClear(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,rectWidth,rectHeight,false);

    var displacementCenterImageToRectangleCentroidX = (rectangleClear1.coordinateX_InCanvasArea+(rectangleClear1.width/2))- canvasEditableAreaWidth/2;
    var displacementCenterImageToRectangleCentroidY = (rectangleClear1.coordinateY_InCanvasArea+(rectangleClear1.height/2))- canvasEditableAreaHeight/2;

    //conjugate is located in the opposite direction
    displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
    displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;
    var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
    var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);
    var rectangleClear2 = new RectangleClear(conjugateCentroidX - (rectangleClear1.width/2), conjugateCentroidY - (rectangleClear1.height/2), rectWidth,rectHeight,false);
    var rectangleConjugate = new RectangleClearConjugate(rectangleClear1,rectangleClear2,false);
    object = new ObjectShape(shapeTypes[5],rectangleConjugate);
    return object;



}

function drawFilledRectangleClearConjugate(rectangleClearConjugate){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorClearArea;
    contextFourierTransformArea.globalAlpha= fillAlphaClearArea;
    contextFourierTransformArea.rect(rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea, rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea, rectangleClearConjugate.rectangleClear1.width,rectangleClearConjugate.rectangleClear1.height );
    contextFourierTransformArea.fill();
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.globalAlpha = borderAlphaClearArea;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorClearArea;
    contextFourierTransformArea.globalAlpha= fillAlphaClearArea;
    contextFourierTransformArea.rect(rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea, rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea, rectangleClearConjugate.rectangleClear2.width,rectangleClearConjugate.rectangleClear2.height );
    contextFourierTransformArea.fill();
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.globalAlpha = borderAlphaClearArea;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function drawFilledRectangleClearConjugateSelected(rectangleClearConjugate){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.rect(rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea, rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea, rectangleClearConjugate.rectangleClear1.width,rectangleClearConjugate.rectangleClear1.height );
    contextFourierTransformArea.fill();
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.rect(rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea, rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea, rectangleClearConjugate.rectangleClear2.width,rectangleClearConjugate.rectangleClear2.height );
    contextFourierTransformArea.fill();
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function isRectangleClearConjugateSelected(rectangleClearConjugate,mouseX, mouseY){

    if( (mouseX > rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea) && (mouseX < rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea + rectangleClearConjugate.rectangleClear1.width) ){
        if((mouseY > rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea) && (mouseY < rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea + rectangleClearConjugate.rectangleClear1.height)){
            rectangleClearConjugate.rectangleClear1.isSelected = true;
            rectangleClearConjugate.isSelected = true;
            return;
        }
    }

    if( (mouseX >rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea) && (mouseX < rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea + rectangleClearConjugate.rectangleClear2.width) ){
        if((mouseY > rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea) && (mouseY < rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea + rectangleClearConjugate.rectangleClear2.height)){
            rectangleClearConjugate.rectangleClear2.isSelected = true;
            rectangleClearConjugate.isSelected = true;
            return;
        }
    }

    rectangleClearConjugate.rectangleClear1.isSelected = false;
    rectangleClearConjugate.rectangleClear2.isSelected = false;
    rectangleClearConjugate.isSelected = false;
}

function rectangleClearConjugateDisplacement(rectangleClearConjugate,deltaX,deltaY){

    if (rectangleClearConjugate.rectangleClear1.isSelected) {
        rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea = rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea + deltaX;
        rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea = rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea + deltaY;

        rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea = rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea - deltaX;
        rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea = rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea - deltaY;

    } else if (rectangleClearConjugate.rectangleClear2.isSelected) {

        rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea = rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea + deltaX;
        rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea = rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea + deltaY;

        rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea = rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea - deltaX;
        rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea = rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea - deltaY;

    }
}

function ctrlV_rectanglesClearConjugate(rectangleClearConjugate,canvasEditableAreaWidth,canvasEditableAreaHeight ) {

    if (rectangleClearConjugate.isCtrlC) {

        var rectangle1 = new RectangleClear(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, rectangleClearConjugate.rectangleClear1.width, rectangleClearConjugate.rectangleClear1.height, false);

        var displacementCenterImageToRectangleCentroidX = (rectangle1.coordinateX_InCanvasArea+(rectangle1.width/2))- canvasEditableAreaWidth/2;
        var displacementCenterImageToRectangleCentroidY = (rectangle1.coordinateY_InCanvasArea+(rectangle1.height/2))- canvasEditableAreaHeight/2;

        //conjugate is located in the opposite direction
        displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
        displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;

        var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
        var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);
        var rectangle2 = new RectangleClear(conjugateCentroidX - (rectangle1.width/2), conjugateCentroidY - (rectangle1.height/2), rectangleClearConjugate.rectangleClear2.width,rectangleClearConjugate.rectangleClear2.height,false);
        var rectConjugate = new RectangleClearConjugate(rectangle1,rectangle2);

        var object = new ObjectShape(shapeTypes[5],rectConjugate);
        objetcsShape.push(object);

        rectangleClearConjugate.isCtrlC = false;
    }
}

function drawFilledRectangleClearConjugateWhileMouseHold(mouseX_while,mouseY_while,mouseX,mouseY,canvasEditableAreaWidth,canvasEditableAreaHeight){

    var rectWidth = mouseX_while - mouseX;
    var rectHeight = mouseY_while - mouseY;
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorClearArea
    contextFourierTransformArea.globalAlpha= fillAlphaWhileDown;
    contextFourierTransformArea.rect(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,rectWidth,rectHeight);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.globalAlpha= borderAlphaWhileDown;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    var displacementCenterImageToRectangleCentroidX = (mouseCursorPositionInArea_X_mouseDown+(rectWidth/2))- canvasEditableAreaWidth/2;
    var displacementCenterImageToRectangleCentroidY = (mouseCursorPositionInArea_Y_mouseDown+(rectHeight/2))- canvasEditableAreaHeight/2;

    //conjugate is located in the opposite direction
    displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
    displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;

    var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
    var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorClearArea
    contextFourierTransformArea.globalAlpha= fillAlphaWhileDown;
    contextFourierTransformArea.rect(conjugateCentroidX-(rectWidth/2),conjugateCentroidY-(rectHeight/2),rectWidth,rectHeight);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.globalAlpha= borderAlphaWhileDown;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function rectangleClearConjugateInSpectrum(rectangleClearConjugate){

    for(var row=rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea; row<rectangleClearConjugate.rectangleClear1.coordinateY_InCanvasArea+rectangleClearConjugate.rectangleClear1.height; row++){

        for(var col=rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea; col<rectangleClearConjugate.rectangleClear1.coordinateX_InCanvasArea+rectangleClearConjugate.rectangleClear1.width; col++){
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

    for(var row=rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea; row<rectangleClearConjugate.rectangleClear2.coordinateY_InCanvasArea+rectangleClearConjugate.rectangleClear2.height; row++){

        for(var col=rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea; col<rectangleClearConjugate.rectangleClear2.coordinateX_InCanvasArea+rectangleClearConjugate.rectangleClear2.width; col++){
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
            fftSpectrumModified.imag[(newIndex)*4+2] = fftSpectrumOriginal.imag[(newIndex)*4+2]*/;
        }
    }

}
