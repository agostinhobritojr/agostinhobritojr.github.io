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

function drawFilledRectangle(rectangle){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColor;
    contextFourierTransformArea.globalAlpha= fillAlphaClearArea ;
    contextFourierTransformArea.rect(rectangle.coordinateX_InCanvasArea, rectangle.coordinateY_InCanvasArea, rectangle.width,rectangle.height );
    contextFourierTransformArea.fill();
    contextFourierTransformArea.lineWidth = borderWidth;
    contextFourierTransformArea.strokeStyle = strokeColor;
    contextFourierTransformArea.globalAlpha = borderAlphaClearArea;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function drawFilledRectangleSelected(rectangle){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.rect(rectangle.coordinateX_InCanvasArea, rectangle.coordinateY_InCanvasArea, rectangle.width, rectangle.height);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();
}

function drawFilledRectangleWhileMouseHold(mouseX_while,mouseY_while,mouseX,mouseY) {
    var rectWidth = mouseX_while - mouseX;
    var rectHeight = mouseY_while - mouseY;
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorWhileDown
    contextFourierTransformArea.globalAlpha = fillAlphaWhileDown;
    contextFourierTransformArea.rect(mouseCursorPositionInArea_X_mouseDown, mouseCursorPositionInArea_Y_mouseDown, rectWidth, rectHeight);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorWhileDown;
    contextFourierTransformArea.lineWidth = borderWidthWhileDown;
    contextFourierTransformArea.globalAlpha = borderAlphaWhileDown;
    contextFourierTransformArea.stroke();
}

function rectangleInSpectrum(retangle){

    var index, newIndex;

     for(var row=retangle.coordinateY_InCanvasArea; row<retangle.coordinateY_InCanvasArea+retangle.height; row++){

         for(var col=retangle.coordinateX_InCanvasArea; col<retangle.coordinateX_InCanvasArea+retangle.width; col++){
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



function isRetangleSelected(rectangle,mouseX, mouseY){

    if( (mouseX > rectangle.coordinateX_InCanvasArea) && (mouseX < rectangle.coordinateX_InCanvasArea + rectangle.width) ){
        if((mouseY > rectangle.coordinateY_InCanvasArea) && (mouseY < rectangle.coordinateY_InCanvasArea + rectangle.height)){
            rectangle.isSelected = true;
            return;
        }
    }
    rectangle.isSelected = false;
}

function rectangleDisplacement(rectangle,deltaX,deltaY){
    rectangle.coordinateX_InCanvasArea = rectangle.coordinateX_InCanvasArea + deltaX;
    rectangle.coordinateY_InCanvasArea = rectangle.coordinateY_InCanvasArea + deltaY;
}

function ctrlV_rectangle(rectangle) {
    if (rectangle.isCtrlC) {
        var rec = new Rectangle(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, rectangle.width, rectangle.height, false);
        var object = new ObjectShape(shapeTypes[0],rec);
        objetcsShape.push(object);
        rectangle.isCtrlC = false;
    }
}

function areaCalculation(rectangle){
    return (rectangle.width*rectangle.height);
}
