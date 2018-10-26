var RectangleConjugate = function(rectangle1,rectangle2, isSelected){
    this.rectangle1 = rectangle1;
    this.rectangle2 = rectangle2;
    this.isSelected = isSelected;
    this.isCtrlC = false;
}

function rectangleConjugate2Object(canvasEditableAreaWidth,canvasEditableAreaHeight){
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

    var rectangle1 = new Rectangle(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,rectWidth,rectHeight,false);

    var displacementCenterImageToRectangleCentroidX = (rectangle1.coordinateX_InCanvasArea+(rectangle1.width/2))- canvasEditableAreaWidth/2;
    var displacementCenterImageToRectangleCentroidY = (rectangle1.coordinateY_InCanvasArea+(rectangle1.height/2))- canvasEditableAreaHeight/2;

    //conjugate is located in the opposite direction
    displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
    displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;
    var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
    var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);
    var rectangle2 = new Rectangle(conjugateCentroidX - (rectangle1.width/2), conjugateCentroidY - (rectangle1.height/2), rectWidth,rectHeight,false);
    var rectangleConjugate = new RectangleConjugate(rectangle1,rectangle2,false);
    object = new ObjectShape(shapeTypes[1],rectangleConjugate);
    return object;
}

function drawFilledRectangleConjugate(rectangleConjugate){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColor;
    contextFourierTransformArea.globalAlpha= fillAlpha;
    contextFourierTransformArea.rect(rectangleConjugate.rectangle1.coordinateX_InCanvasArea, rectangleConjugate.rectangle1.coordinateY_InCanvasArea, rectangleConjugate.rectangle1.width,rectangleConjugate.rectangle1.height );
    contextFourierTransformArea.fill();
    contextFourierTransformArea.lineWidth = borderWidth;
    contextFourierTransformArea.strokeStyle = strokeColor;
    contextFourierTransformArea.globalAlpha = borderAlpha;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColor;
    contextFourierTransformArea.globalAlpha= fillAlpha;
    contextFourierTransformArea.rect(rectangleConjugate.rectangle2.coordinateX_InCanvasArea, rectangleConjugate.rectangle2.coordinateY_InCanvasArea, rectangleConjugate.rectangle2.width,rectangleConjugate.rectangle2.height );
    contextFourierTransformArea.fill();
    contextFourierTransformArea.lineWidth = borderWidth;
    contextFourierTransformArea.strokeStyle = strokeColor;
    contextFourierTransformArea.globalAlpha = borderAlpha;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function drawFilledRectangleConjugateSelected(rectangleConjugate){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.rect(rectangleConjugate.rectangle1.coordinateX_InCanvasArea, rectangleConjugate.rectangle1.coordinateY_InCanvasArea, rectangleConjugate.rectangle1.width, rectangleConjugate.rectangle1.height);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.rect(rectangleConjugate.rectangle2.coordinateX_InCanvasArea, rectangleConjugate.rectangle2.coordinateY_InCanvasArea, rectangleConjugate.rectangle2.width, rectangleConjugate.rectangle2.height);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function isRectangleConjugateSelected(rectangleConjugate,mouseX, mouseY){

    if( (mouseX > rectangleConjugate.rectangle1.coordinateX_InCanvasArea) && (mouseX < rectangleConjugate.rectangle1.coordinateX_InCanvasArea + rectangleConjugate.rectangle1.width) ){
        if((mouseY > rectangleConjugate.rectangle1.coordinateY_InCanvasArea) && (mouseY < rectangleConjugate.rectangle1.coordinateY_InCanvasArea + rectangleConjugate.rectangle1.height)){
            rectangleConjugate.rectangle1.isSelected = true;
            rectangleConjugate.isSelected = true;
            return;
        }
    }

    if( (mouseX > rectangleConjugate.rectangle2.coordinateX_InCanvasArea) && (mouseX < rectangleConjugate.rectangle2.coordinateX_InCanvasArea + rectangleConjugate.rectangle2.width) ){
        if((mouseY > rectangleConjugate.rectangle2.coordinateY_InCanvasArea) && (mouseY < rectangleConjugate.rectangle2.coordinateY_InCanvasArea + rectangleConjugate.rectangle2.height)){
            rectangleConjugate.rectangle2.isSelected = true;
            rectangleConjugate.isSelected = true;
            return;
        }
    }

    rectangleConjugate.rectangle1.isSelected = false;
    rectangleConjugate.rectangle2.isSelected = false;
    rectangleConjugate.isSelected = false;

}

function rectangleConjugateDisplacement(rectangleConjugate,deltaX,deltaY){

    if (rectangleConjugate.rectangle1.isSelected) {
        rectangleConjugate.rectangle1.coordinateX_InCanvasArea = rectangleConjugate.rectangle1.coordinateX_InCanvasArea + deltaX;
        rectangleConjugate.rectangle1.coordinateY_InCanvasArea = rectangleConjugate.rectangle1.coordinateY_InCanvasArea + deltaY;

        rectangleConjugate.rectangle2.coordinateX_InCanvasArea = rectangleConjugate.rectangle2.coordinateX_InCanvasArea - deltaX;
        rectangleConjugate.rectangle2.coordinateY_InCanvasArea = rectangleConjugate.rectangle2.coordinateY_InCanvasArea - deltaY;

    } else if (rectangleConjugate.rectangle2.isSelected) {

        rectangleConjugate.rectangle2.coordinateX_InCanvasArea = rectangleConjugate.rectangle2.coordinateX_InCanvasArea + deltaX;
        rectangleConjugate.rectangle2.coordinateY_InCanvasArea = rectangleConjugate.rectangle2.coordinateY_InCanvasArea + deltaY;

        rectangleConjugate.rectangle1.coordinateX_InCanvasArea = rectangleConjugate.rectangle1.coordinateX_InCanvasArea - deltaX;
        rectangleConjugate.rectangle1.coordinateY_InCanvasArea = rectangleConjugate.rectangle1.coordinateY_InCanvasArea - deltaY;

    }
}

function ctrlV_rectanglesConjugate(rectangleConjugate,canvasEditableAreaWidth,canvasEditableAreaHeight) {

    if (rectangleConjugate.isCtrlC) {

        var rectangle1 = new Rectangle(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, rectangleConjugate.rectangle1.width, rectangleConjugate.rectangle1.height, false);

        var displacementCenterImageToRectangleCentroidX = (rectangle1.coordinateX_InCanvasArea+(rectangle1.width/2))- canvasEditableAreaWidth/2;
        var displacementCenterImageToRectangleCentroidY = (rectangle1.coordinateY_InCanvasArea+(rectangle1.height/2))- canvasEditableAreaHeight/2;

        //conjugate is located in the opposite direction
        displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
        displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;

        var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
        var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);
        var rectangle2 = new Rectangle(conjugateCentroidX - (rectangle1.width/2), conjugateCentroidY - (rectangle1.height/2), rectangleConjugate.rectangle2.width,rectangleConjugate.rectangle2.height,false);
        var rectConjugate = new RectangleConjugate(rectangle1,rectangle2);

        var object = new ObjectShape(shapeTypes[1],rectConjugate);
        objetcsShape.push(object);

        rectangleConjugate.isCtrlC = false;
    }
}

function drawFilledRectangleConjugateWhileMouseHold(mouseX_while,mouseY_while,mouseX,mouseY,canvasEditableAreaWidth,canvasEditableAreaHeight){

    var rectWidth = mouseX_while - mouseX;
    var rectHeight = mouseY_while - mouseY;
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorWhileDown;
    contextFourierTransformArea.globalAlpha= fillAlphaWhileDown;
    contextFourierTransformArea.rect(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,rectWidth,rectHeight);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorWhileDown;
    contextFourierTransformArea.lineWidth = borderWidthWhileDown;
    contextFourierTransformArea.globalAlpha = borderAlphaWhileDown;
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
    contextFourierTransformArea.fillStyle =  fillColorWhileDown
    contextFourierTransformArea.globalAlpha= fillAlphaWhileDown;
    contextFourierTransformArea.rect(conjugateCentroidX-(rectWidth/2),conjugateCentroidY-(rectHeight/2),rectWidth,rectHeight);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorWhileDown;
    contextFourierTransformArea.lineWidth = borderWidthWhileDown;
    contextFourierTransformArea.globalAlpha = borderAlphaWhileDown;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function rectangleConjugateInSpectrum(rectangleConjugate){

    for(var row=rectangleConjugate.rectangle1.coordinateY_InCanvasArea; row<rectangleConjugate.rectangle1.coordinateY_InCanvasArea+rectangleConjugate.rectangle1.height; row++){

        for(var col=rectangleConjugate.rectangle1.coordinateX_InCanvasArea; col<rectangleConjugate.rectangle1.coordinateX_InCanvasArea+rectangleConjugate.rectangle1.width; col++){
            //index = ((row*fftSpectrumModified.width)+col);
            //newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
            //newIndex = newIndex + (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4] = 0;
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4] = 0;

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4 +1] = 0;
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4 +1] = 0;

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4 +2] = 0;
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4 +2] = 0;

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4 +3] = 255;
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4 +3] = 255;

            /*fftSpectrumModified.real[(newIndex)*4] = 0;
            fftSpectrumModified.imag[(newIndex)*4] = 0;

            fftSpectrumModified.real[(newIndex)*4+1] = 0;
            fftSpectrumModified.imag[(newIndex)*4+1] = 0;

            fftSpectrumModified.real[(newIndex)*4+2] = 0;
            fftSpectrumModified.imag[(newIndex)*4+2] = 0;*/
        }
    }

    for(var row=rectangleConjugate.rectangle2.coordinateY_InCanvasArea; row<rectangleConjugate.rectangle2.coordinateY_InCanvasArea+rectangleConjugate.rectangle2.height; row++){

        for(var col=rectangleConjugate.rectangle2.coordinateX_InCanvasArea; col<rectangleConjugate.rectangle2.coordinateX_InCanvasArea+rectangleConjugate.rectangle2.width; col++){
            //index = ((row*fftSpectrumModified.width)+col);
            //newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
            //newIndex = newIndex + (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4] = 0;
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4] = 0;

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4 +1] = 0;
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4 +1] = 0;

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4 +2] = 0;
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4 +2] = 0;

            fftSpectrumModified.real[((row*fftSpectrumModified.width)+col)*4 +3] = 255;
            fftSpectrumModified.imag[((row*fftSpectrumModified.width)+col)*4 +3] = 255;

            /*fftSpectrumModified.real[(newIndex)*4] = 0;
            fftSpectrumModified.imag[(newIndex)*4] = 0;

            fftSpectrumModified.real[(newIndex)*4+1] = 0;
            fftSpectrumModified.imag[(newIndex)*4+1] = 0;

            fftSpectrumModified.real[(newIndex)*4+2] = 0;
            fftSpectrumModified.imag[(newIndex)*4+2] = 0;*/
        }
    }

}