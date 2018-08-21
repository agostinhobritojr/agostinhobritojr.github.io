
///////////////////////////


///////////////////////////
OriginalImage =  contextFourierTransformArea.getImageData(0,0,imageWidthZeroPadding, imageHeightZeroPadding);
var imageWhileMousePresses = OriginalImage;
var imageGeneratedFromLastMousePressUp = OriginalImage;
//////////////////////////

var objetcsShape = [];


/////////////////////////////classes constructor//////////////////////////////


function storeObjectShape(){

    var obj;

    if(isButtonDrawingRectangleSelected && isButtonDrawingConjugateSelected && isButtonDrawingClearAreaSelected){
        obj = rectangleClearConjugate2Object(imageWidthZeroPadding, imageHeightZeroPadding);
        objetcsShape.push(obj);
        clearTransitoryPiles();
        PileOperations.push("created");
    }

    else if(isButtonDrawingRectangleSelected && isButtonDrawingConjugateSelected){
        obj = rectangleConjugate2Object(imageWidthZeroPadding, imageHeightZeroPadding);
        objetcsShape.push(obj);
        clearTransitoryPiles();
        PileOperations.push("created");
    }

    else if(isButtonDrawingClearAreaSelected && isButtonDrawingRectangleSelected){
        obj =rectangleClear2Object();
        objetcsShape.push(obj);
        clearTransitoryPiles();
        PileOperations.push("created");
    }

    else if(isButtonDrawingRectangleSelected){
        obj = rectangle2Object();
        objetcsShape.push(obj);
        clearTransitoryPiles();
        PileOperations.push("created");
    }

    else if(isButtonDrawingCircleSelected && isButtonDrawingConjugateSelected && isButtonDrawingClearAreaSelected){
        obj = circleClearConjugate2Object(imageWidthZeroPadding, imageHeightZeroPadding);
        objetcsShape.push(obj);
        clearTransitoryPiles();
        PileOperations.push("created");
    }


    else if(isButtonDrawingCircleSelected && isButtonDrawingConjugateSelected){
        obj = circleConjugate2Object(imageWidthZeroPadding, imageHeightZeroPadding);
        objetcsShape.push(obj);
        clearTransitoryPiles();
        PileOperations.push("created");
    }

    else if(isButtonDrawingCircleSelected && isButtonDrawingClearAreaSelected){
        obj = circleClear2Object();
        objetcsShape.push(obj);
        clearTransitoryPiles();
        PileOperations.push("created");
    }

    else if(isButtonDrawingCircleSelected){
        obj = circle2Object();
        objetcsShape.push(obj);
        clearTransitoryPiles();
        PileOperations.push("created");
    }


}

function deleteAllObjectsShape(){
    objetcsShape.splice(0,objetcsShape.length);
    drawObjectShapesInOriginalImage();
}

function clearTransitoryPiles(){
    if(pileTransitoryOperations.length > 0) {
        pileTransitoryOperations.splice(0, pileTransitoryOperations.length);
    }
    if(PileTransitoryObjects.length > 0){
        PileTransitoryObjects.splice(0,PileTransitoryObjects.length);
    }
}

function clearAllCanvas(){
    contextCanvasImageUploadedArea.clearRect(0,0,imageWidthZeroPadding, imageHeightZeroPadding);
    contextFourierTransformArea.clearRect(0,0,imageWidthZeroPadding, imageHeightZeroPadding);
    contextFourierResult.clearRect(0,0,imageWidthZeroPadding, imageHeightZeroPadding);
}

function drawObjectShapesInOriginalImage(){
    contextFourierTransformArea.putImageData(OriginalImage, 0,0);

        for (var index = 0; index < objetcsShape.length; index++) {

            if (objetcsShape[index].type == shapeTypes[0]) {
                if (objetcsShape[index].shape.isSelected) {
                    drawFilledRectangleSelected(objetcsShape[index].shape);
                }
                else {
                    drawFilledRectangle(objetcsShape[index].shape);
                }
            }

            else if (objetcsShape[index].type == shapeTypes[1]) {
                if (objetcsShape[index].shape.isSelected) {
                    drawFilledRectangleConjugateSelected(objetcsShape[index].shape);
                }
                else {
                    drawFilledRectangleConjugate(objetcsShape[index].shape);
                }
            }

            else if (objetcsShape[index].type == shapeTypes[2]) {
                if (objetcsShape[index].shape.isSelected) {
                    drawFilledCircleSelected(objetcsShape[index].shape);
                }
                else {
                    drawFilledCircle(objetcsShape[index].shape);
                }
            }

            else if (objetcsShape[index].type == shapeTypes[3]) {
                if (objetcsShape[index].shape.isSelected) {
                    drawFilledCircleConjugateSelected(objetcsShape[index].shape);
                }
                else {
                    drawFilledCircleConjugate(objetcsShape[index].shape);
                }
            }

            else if (objetcsShape[index].type == shapeTypes[4]) {
                if (objetcsShape[index].shape.isSelected) {
                    drawFilledClearRectangleSelected(objetcsShape[index].shape);
                }
                else {
                    drawFilledClearRectangle(objetcsShape[index].shape);
                }
            }

            else if (objetcsShape[index].type == shapeTypes[5]) {
                if (objetcsShape[index].shape.isSelected) {
                    drawFilledRectangleClearConjugateSelected(objetcsShape[index].shape);
                }
                else {
                    drawFilledRectangleClearConjugate(objetcsShape[index].shape);
                }
            }

            else if (objetcsShape[index].type == shapeTypes[6]) {
                if (objetcsShape[index].shape.isSelected) {
                    drawFilledCircleClearSelected(objetcsShape[index].shape);
                }
                else {
                    drawFilledCircleClear(objetcsShape[index].shape);
                }
            }

            else if (objetcsShape[index].type == shapeTypes[7]) {
                if (objetcsShape[index].shape.isSelected) {
                    drawFilledCircleClearConjugateSelected(objetcsShape[index].shape);
                }
                else {
                    drawFilledCircleClearConjugate(objetcsShape[index].shape);
                }
            }

        }

    imageGeneratedFromLastMousePressUp = contextFourierTransformArea.getImageData(0, 0, imageWidthZeroPadding, imageHeightZeroPadding);
    drawInverseFFTImage();
     //testeSpectrum();
}


////////////drawing functions//////////
function drawInverseFFTImage(){
    if(isImageLoaded){
        addObjetcsInSpectrum();
        IFFT(fftSpectrumModified,'imageFourierResult', compressionType );
        if(needCrop){
            cropOutputImage();
        }
    }
}

///////isSelected object-shape functions/////////
function anyObjectShapeSelected(mouseX,mouseY){

    for(var index=objetcsShape.length-1; index>=0; index--){

        if(objetcsShape[index].type == shapeTypes[0]){
            isRetangleSelected(objetcsShape[index].shape,mouseX, mouseY);
        }
        else if(objetcsShape[index].type == shapeTypes[1]){
            isRectangleConjugateSelected(objetcsShape[index].shape,mouseX, mouseY);

        }
        else if(objetcsShape[index].type == shapeTypes[2]){
            isCircleSelected(objetcsShape[index].shape,mouseX, mouseY);

        }
        else if(objetcsShape[index].type == shapeTypes[3]){
            isCircleConjugateSelected(objetcsShape[index].shape,mouseX, mouseY);

        }
        else if(objetcsShape[index].type == shapeTypes[4]){
            isClearRectangleSelected(objetcsShape[index].shape,mouseX, mouseY);

        }
        else if(objetcsShape[index].type == shapeTypes[5]){
            isRectangleClearConjugateSelected(objetcsShape[index].shape,mouseX, mouseY);

        }
        else if(objetcsShape[index].type == shapeTypes[6]){
            isCircleClearSelected(objetcsShape[index].shape,mouseX, mouseY);

        }
        else if(objetcsShape[index].type == shapeTypes[7]){
            isCircleClearConjugateSelected(objetcsShape[index].shape,mouseX, mouseY);
        }

        if(objetcsShape[index].shape.isSelected){
            break;
        }

    }

    drawObjectShapesInOriginalImage();
}

function receiveDataFromNewImageUpdated(imageData) {
    OriginalImage = imageData;
    imageWhileMousePresses = OriginalImage;
    imageGeneratedFromLastMousePressUp = OriginalImage;
}

function deslectAllObjectShapes(){
    for(var index=0; index<objetcsShape.length; index++){
        objetcsShape[index].shape.isSelected = false;
    }
}

/////////////////////////////////while mouse down
function whileMouseDown(CursorPositionX, CursorPositionY){
    contextFourierTransformArea.putImageData(imageGeneratedFromLastMousePressUp, 0,0);
    mouseCursorPositionInArea_X_mouseDown_While = CursorPositionX;
    mouseCursorPositionInArea_Y_mouseDown_While = CursorPositionY;
    drawShapeBorderWhileMouseDown();
}

function whileMouseDownObjectSelected(){
    var displacementX = mouseCursorPositionInArea_X - lastMouseCursorPositionX;
    var displacementY = mouseCursorPositionInArea_Y - lastMouseCursorPositionY;

    for(var index=0; index < objetcsShape.length; index++){

        if(objetcsShape[index].shape.isSelected) {
            if (objetcsShape[index].type == shapeTypes[0]){
                    rectangleDisplacement(objetcsShape[index].shape, displacementX, displacementY);
            }
            else if (objetcsShape[index].type == shapeTypes[1]) {
                rectangleConjugateDisplacement(objetcsShape[index].shape, displacementX, displacementY);
            }
            else if (objetcsShape[index].type == shapeTypes[2]) {
                circleDisplacement(objetcsShape[index].shape, displacementX, displacementY)
            }
            else if (objetcsShape[index].type == shapeTypes[3]) {
                circleConjugateDisplacement(objetcsShape[index].shape, displacementX, displacementY)
            }
            else if (objetcsShape[index].type == shapeTypes[4]) {
                clearRectangleDisplacement(objetcsShape[index].shape, displacementX, displacementY)
            }
            else if (objetcsShape[index].type == shapeTypes[5]) {
                rectangleClearConjugateDisplacement(objetcsShape[index].shape, displacementX, displacementY)
            }
            else if (objetcsShape[index].type == shapeTypes[6]) {
                circleClearDisplacement(objetcsShape[index].shape, displacementX, displacementY)
            }
            else if (objetcsShape[index].type == shapeTypes[7]) {
                circleClearConjugateDisplacement(objetcsShape[index].shape, displacementX, displacementY)
            }
        }
    }

    drawObjectShapesInOriginalImage();

    lastMouseCursorPositionX = mouseCursorPositionInArea_X;
    lastMouseCursorPositionY = mouseCursorPositionInArea_Y;
}

function drawShapeBorderWhileMouseDown(){

    if(isButtonDrawingRectangleSelected && isButtonDrawingConjugateSelected && isButtonDrawingClearAreaSelected){
        drawFilledRectangleClearConjugateWhileMouseHold(mouseCursorPositionInArea_X_mouseDown_While,mouseCursorPositionInArea_Y_mouseDown_While,mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,imageWidthZeroPadding, imageHeightZeroPadding);
    }
    else if(isButtonDrawingCircleSelected && isButtonDrawingConjugateSelected && isButtonDrawingClearAreaSelected){
        drawFilledCircleClearConjugateWhileMouseHold(mouseCursorPositionInArea_X_mouseDown_While,mouseCursorPositionInArea_Y_mouseDown_While,mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,imageWidthZeroPadding, imageHeightZeroPadding);
    }

    else if(isButtonDrawingRectangleSelected && isButtonDrawingConjugateSelected){
        drawFilledRectangleConjugateWhileMouseHold(mouseCursorPositionInArea_X_mouseDown_While,mouseCursorPositionInArea_Y_mouseDown_While,mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,imageWidthZeroPadding, imageHeightZeroPadding);
    }
    else if(isButtonDrawingClearAreaSelected && isButtonDrawingRectangleSelected){
        drawFilledClearRectangleWhileMouseHold(mouseCursorPositionInArea_X_mouseDown_While,mouseCursorPositionInArea_Y_mouseDown_While,mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown);
    }
    else if(isButtonDrawingRectangleSelected){
        drawFilledRectangleWhileMouseHold(mouseCursorPositionInArea_X_mouseDown_While,mouseCursorPositionInArea_Y_mouseDown_While,mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown);
    }

    else if(isButtonDrawingCircleSelected && isButtonDrawingConjugateSelected){
        drawFilledCircleConjugateWhileMouseHold(mouseCursorPositionInArea_X_mouseDown_While,mouseCursorPositionInArea_Y_mouseDown_While,mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,imageWidthZeroPadding, imageHeightZeroPadding);
    }
    else if(isButtonDrawingCircleSelected && isButtonDrawingClearAreaSelected){
        drawFilledCircleClearWhileMouseHold(mouseCursorPositionInArea_X_mouseDown_While,mouseCursorPositionInArea_Y_mouseDown_While,mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown);
    }
    else if(isButtonDrawingCircleSelected){
        drawFilledCircleWhileMouseHold(mouseCursorPositionInArea_X_mouseDown_While,mouseCursorPositionInArea_Y_mouseDown_While,mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown);
    }
}


///////////////////////////////////output image fft functions
function addObjetcsInSpectrum(){
    fftCopyData(fftSpectrumOriginal,fftSpectrumModified);
    for(var index=0; index < objetcsShape.length; index++){

        if (objetcsShape[index].type == shapeTypes[0]){
            rectangleInSpectrum(objetcsShape[index].shape);
        }
        if (objetcsShape[index].type == shapeTypes[1]){
            rectangleConjugateInSpectrum(objetcsShape[index].shape);
        }
        if (objetcsShape[index].type == shapeTypes[2]){
            circleInSpectrum(objetcsShape[index].shape);
        }
        if (objetcsShape[index].type == shapeTypes[3]){
            circleConjugateInSpectrum(objetcsShape[index].shape);
        }
        if (objetcsShape[index].type == shapeTypes[4]){
            rectangleClearInSpectrum(objetcsShape[index].shape);
        }
        if (objetcsShape[index].type == shapeTypes[5]){
            rectangleClearConjugateInSpectrum(objetcsShape[index].shape);
        }
        if (objetcsShape[index].type == shapeTypes[6]){
            circleClearInSpectrum(objetcsShape[index].shape);
        }
        if (objetcsShape[index].type == shapeTypes[7]){
            circleClearConjugateInSpectrum(objetcsShape[index].shape);
        }

    }
}

function testeSpectrum(){


    //var rawResult = contextFourierTransformArea.getImageData( 0, 0, imageWidthZeroPadding, imageHeightZeroPadding );
    //var result = rawResult.data;

    var rawResult2 = contextFourierModifications.getImageData(0, 0, imageWidthZeroPadding, imageHeightZeroPadding);
    var result2 = rawResult2.data;

    var rr;
    var ii;
    for(var row=0; row < imageHeightZeroPadding; row++){
        for(var col=0; col < imageWidthZeroPadding; col++) {

            if(compressionType = 1){
                rr = fftSpectrumModified.real[ ((row*imageWidthZeroPadding)+col)*4 ];
                ii = fftSpectrumModified.imag[ ((row*imageWidthZeroPadding)+col)*4 ];
                result2[((row*imageWidthZeroPadding)+col)*4] = calculteMagnitude(rr, ii)*255/numberOfSamples;

                rr = fftSpectrumModified.real[ ((row*imageWidthZeroPadding)+col)*4 +1];
                ii = fftSpectrumModified.imag[ ((row*imageWidthZeroPadding)+col)*4 +1];
                result2[((row*imageWidthZeroPadding)+col)*4+1] = calculteMagnitude(rr, ii)*255/numberOfSamples;

                rr = fftSpectrumModified.real[ ((row*imageWidthZeroPadding)+col)*4 +2];
                ii = fftSpectrumModified.imag[ ((row*imageWidthZeroPadding)+col)*4 +2];
                result2[((row*imageWidthZeroPadding)+col)*4+2] = calculteMagnitude(rr, ii)*255/numberOfSamples;

                result2[((row*imageWidthZeroPadding)+col)*4+3] = 255;
            }

            if(compressionType = 2){
                rr = fftSpectrumModified.real[ ((row*imageWidthZeroPadding)+col)*4 ];
                ii = fftSpectrumModified.imag[ ((row*imageWidthZeroPadding)+col)*4 ];
                result2[((row*imageWidthZeroPadding)+col)*4] = calculteMagnitude(rr, ii)*255/numberOfSamples;

                rr = fftSpectrumModified.real[ ((row*imageWidthZeroPadding)+col)*4 +1];
                ii = fftSpectrumModified.imag[ ((row*imageWidthZeroPadding)+col)*4 +1];
                result2[((row*imageWidthZeroPadding)+col)*4+1] = calculteMagnitude(rr, ii)*255/numberOfSamples;

                rr = fftSpectrumModified.real[ ((row*imageWidthZeroPadding)+col)*4 +2];
                ii = fftSpectrumModified.imag[ ((row*imageWidthZeroPadding)+col)*4 +2];
                result2[((row*imageWidthZeroPadding)+col)*4+2] = calculteMagnitude(rr, ii)*255/numberOfSamples;

                result2[((row*imageWidthZeroPadding)+col)*4+3] = 255;
            }

        }
        //contextFourierModifications.putImageData( rawResult2, 0, 0 );
    }

    contextFourierModifications.putImageData( rawResult2, 0, 0 );
}

function preparationImage(img){



    originalImageWidth = img.width;
    originalImageHeight = img.height;
    var selector = document.getElementById("outputSize");

    if(originalImageWidth>canvasMaximumWidth || originalImageHeight>canvasMaximumHeight){
        var messageBox = document.getElementById("messagesBox");
        var message = document.getElementById("infoText");
        $('.messagesBox').selectpicker('val', '512x512');

        messageBox.style.visibility = "visible";
        message.innerHTML ="Sorry, but the image is too large to fit on the canvas area. We resize it to fit in the canvas area. You still be able to save the output  image in the original size.";


        setTimeout(function(){
            messageBox.style.visibility = "hidden";
            message.innerHTML = "";
        },10000);
        selector.value = 2;

    }

    if(selector.value == 1){

        imageWidthZeroPadding = getNextPowerOfTwo(originalImageWidth);
        imageHeightZeroPadding = getNextPowerOfTwo(originalImageHeight);

        contextFourierTransformArea.canvas.width = imageWidthZeroPadding;
        contextFourierTransformArea.canvas.height = imageHeightZeroPadding;

        contextFourierModifications.canvas.width = imageWidthZeroPadding;
        contextFourierModifications.canvas.height = imageHeightZeroPadding;

        contextCanvasImageUploadedArea.canvas.width = originalImageWidth;
        contextCanvasImageUploadedArea.canvas.height = originalImageHeight;


        var imageData = contextFourierTransformArea.getImageData(0,0,imageWidthZeroPadding,imageHeightZeroPadding);
        var canvasData = imageData.data;

        for(var row=0; row < imageHeightZeroPadding; row++){
            for(var col=0; col < imageWidthZeroPadding; col++){
                canvasData[((row*imageWidthZeroPadding)+col)*4] = 0;
                canvasData[((row*imageWidthZeroPadding)+col)*4+1] = 0;
                canvasData[((row*imageWidthZeroPadding)+col)*4+2] = 0;
                canvasData[((row*imageWidthZeroPadding)+col)*4+3] = 255;
            }
        }
        contextFourierTransformArea.putImageData(imageData,0,0);
        contextFourierTransformArea.drawImage(img,0,0, img.width, img.height);
        contextCanvasImageUploadedArea.drawImage(img,0,0, img.width, img.height);
        needCrop = true;

    }
    else if(selector.value    == 2){

        ImageWidthZeroPadding = 512;
        ImageHeightZeroPadding = 512;

        contextFourierTransformArea.canvas.width = ImageWidthZeroPadding;
        contextFourierTransformArea.canvas.height = ImageHeightZeroPadding;

        contextFourierModifications.canvas.width = imageWidthZeroPadding;
        contextFourierModifications.canvas.height = imageHeightZeroPadding;

        contextCanvasImageUploadedArea.canvas.width = ImageWidthZeroPadding;
        contextCanvasImageUploadedArea.canvas.height = ImageHeightZeroPadding;

        contextFourierTransformArea.drawImage(img,0,0, img.width, img.height,0,0,ImageWidthZeroPadding,ImageHeightZeroPadding);
        contextCanvasImageUploadedArea.drawImage(img,0,0, img.width, img.height,0,0,ImageWidthZeroPadding,ImageHeightZeroPadding);
        needCrop = false;
    }

}

function cropOutputImage(){
    var imageData = contextFourierResult.getImageData(0,0,originalImageWidth,originalImageHeight);
    contextFourierResult.canvas.width = originalImageWidth;
    contextFourierResult.canvas.height = originalImageHeight;
    contextFourierResult.putImageData(imageData,0,0);
}

function setCompressionType(){
    compressionType = document.getElementById("compressionType").value;
    if(isImageLoaded){
        preparationImage(img);
        FFT('imageFourier',compressionType);
        receiveDataFromNewImageUpdated(contextFourierTransformArea.getImageData(0,0,imageWidthZeroPadding, imageHeightZeroPadding));
        fftCopyData(fftSpectrumOriginal,fftSpectrumModified);
        //testeSpectrum();
        drawObjectShapesInOriginalImage()
    }
}
