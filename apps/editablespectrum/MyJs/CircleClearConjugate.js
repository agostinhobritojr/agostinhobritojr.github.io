var CircleClearConjugate = function (circleClear1,circleClear2, isSelected) {
    this.circleClear1 = circleClear1;
    this.circleClear2 = circleClear2;
    this.isSelected = isSelected;
    this.isCtrlC = false;
}

function circleClearConjugate2Object(canvasEditableAreaWidth,canvasEditableAreaHeight){

    var deltaX = mouseCursorPositionInArea_X_mouseDown_While - mouseCursorPositionInArea_X_mouseDown;
    var deltaY = mouseCursorPositionInArea_Y_mouseDown_While - mouseCursorPositionInArea_Y_mouseDown;
    var radius = Math.sqrt((deltaX*deltaX) + (deltaY*deltaY));
    var circle1 = new CircleClear(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,  radius, 0, 2 * Math.PI,false);


    var displacementCenterImageToRectangleCentroidX = circle1.centerCoordinateX_InCanvasArea - (canvasEditableAreaWidth/2);
    var displacementCenterImageToRectangleCentroidY = circle1.centerCoordinateY_InCanvasArea- (canvasEditableAreaHeight/2);

    //conjugate is located in the opposite direction
    displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
    displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;
    var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
    var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);

    var circle2 = new CircleClear(conjugateCentroidX,conjugateCentroidY,  radius, 0, 2 * Math.PI,false);
    var circConjugate = new CircleClearConjugate(circle1,circle2);
    object = new ObjectShape(shapeTypes[7],circConjugate);
    return object;
}

function drawFilledCircleClearConjugate(circleClearConjugate){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorClearArea;
    contextFourierTransformArea.globalAlpha= fillAlphaClearArea;
    contextFourierTransformArea.arc(circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea, circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea,circleClearConjugate.circleClear1.radius,circleClearConjugate.circleClear1.startAngle,circleClearConjugate.circleClear1.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.globalAlpha = borderAlphaClearArea;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorClearArea;
    contextFourierTransformArea.globalAlpha = alphaIntern;
    contextFourierTransformArea.arc(circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea, circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea,internRadius,circleClearConjugate.circleClear1.startAngle,circleClearConjugate.circleClear1.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorClearArea;
    contextFourierTransformArea.globalAlpha= fillAlphaClearArea;
    contextFourierTransformArea.arc(circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea, circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea,circleClearConjugate.circleClear2.radius,circleClearConjugate.circleClear2.startAngle,circleClearConjugate.circleClear2.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.globalAlpha = borderAlphaClearArea;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorClearArea;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea, circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea,internRadius,circleClearConjugate.circleClear2.startAngle,circleClearConjugate.circleClear2.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();

}

function drawFilledCircleClearConjugateSelected(circleClearConjugate){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.arc(circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea, circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea,circleClearConjugate.circleClear1.radius,circleClearConjugate.circleClear1.startAngle,circleClearConjugate.circleClear1.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea, circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea,internRadius,circleClearConjugate.circleClear1.startAngle,circleClearConjugate.circleClear1.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();


    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.arc(circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea, circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea,circleClearConjugate.circleClear2.radius,circleClearConjugate.circleClear2.startAngle,circleClearConjugate.circleClear2.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea, circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea,internRadius,circleClearConjugate.circleClear2.startAngle,circleClearConjugate.circleClear2.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();

}

function isCircleClearConjugateSelected(circleClearConjugate,mouseX, mouseY){
    var displacement_X = circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea - mouseX;
    var displacement_Y = circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea - mouseY;
    var displacement = Math.sqrt((displacement_X*displacement_X)  + (displacement_Y*displacement_Y) );
    if(  displacement < circleClearConjugate.circleClear1.radius  ){
        circleClearConjugate.circleClear1.isSelected = true;
        circleClearConjugate.isSelected = true;
        return;
    }

    displacement_X = circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea - mouseX;
    displacement_Y = circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea - mouseY;
    displacement = Math.sqrt((displacement_X*displacement_X)  + (displacement_Y*displacement_Y) );
    if(  displacement < circleClearConjugate.circleClear2.radius  ){
        circleClearConjugate.circleClear2.isSelected = true;
        circleClearConjugate.isSelected = true;
        return;
    }

    circleClearConjugate.circleClear1.isSelected = false;
    circleClearConjugate.circleClear2.isSelected = false;
    circleClearConjugate.isSelected = false;
}

function circleClearConjugateDisplacement(circleClearConjugate,deltaX,deltaY){

    if (circleClearConjugate.circleClear1.isSelected) {
        circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea = circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea + deltaX;
        circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea = circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea + deltaY;

        circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea = circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea - deltaX;
        circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea = circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea - deltaY;
    }

    else if (circleClearConjugate.circleClear2.isSelected) {
        circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea = circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea + deltaX;
        circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea = circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea + deltaY;

        circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea = circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea - deltaX;
        circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea = circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea - deltaY;
    }
}

function ctrlV_circlesClearConjugate(circleClearConjugate,canvasEditableAreaWidth,canvasEditableAreaHeight) {
    if (circleClearConjugate.isCtrlC) {
        var circ1 = new CircleClear(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, circleClearConjugate.circleClear1.radius,circleClearConjugate.circleClear1.startAngle, circleClearConjugate.circleClear1.endAngle, false);

        var displacementCenterImageToRectangleCentroidX = mouseCursorPositionInArea_X - (canvasEditableAreaWidth/2);
        var displacementCenterImageToRectangleCentroidY = mouseCursorPositionInArea_Y - (canvasEditableAreaHeight/2);

        //conjugate is located in the opposite direction
        displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
        displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;

        var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
        var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);

        var circ2 = new CircleClear(conjugateCentroidX, conjugateCentroidY, circleClearConjugate.circleClear2.radius,circleClearConjugate.circleClear2.startAngle, circleClearConjugate.circleClear2.endAngle, false);
        var circConjugate = new CircleClearConjugate(circ1,circ2);

        var object = new ObjectShape(shapeTypes[7],circConjugate);
        objetcsShape.push(object);
        circleClearConjugate.isCtrlC = false;
    }
}

function drawFilledCircleClearConjugateWhileMouseHold(mouseX_while,mouseY_while,mouseX,mouseY,canvasEditableAreaWidth,canvasEditableAreaHeight) {

    var deltaX = mouseX_while - mouseX;
    var deltaY = mouseY_while - mouseY;
    var radius = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorClearArea;
    contextFourierTransformArea.globalAlpha = fillAlphaWhileDown;
    contextFourierTransformArea.arc(mouseCursorPositionInArea_X_mouseDown, mouseCursorPositionInArea_Y_mouseDown, radius, 0, 2 * Math.PI);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.globalAlpha = borderAlphaWhileDown;
    contextFourierTransformArea.stroke();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorClearArea;
    contextFourierTransformArea.globalAlpha = alphaIntern;
    contextFourierTransformArea.arc(mouseCursorPositionInArea_X_mouseDown, mouseCursorPositionInArea_Y_mouseDown, internRadius, 0, 2 * Math.PI);
    contextFourierTransformArea.fill();


    var displacementCenterImageToRectangleCentroidX = mouseCursorPositionInArea_X_mouseDown - canvasEditableAreaWidth / 2;
    var displacementCenterImageToRectangleCentroidY = mouseCursorPositionInArea_Y_mouseDown - canvasEditableAreaHeight / 2;
    //conjugate is located in the opposite direction
    displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
    displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;
    var conjugateCentroidX = displacementCenterImageToRectangleCentroidX + (canvasEditableAreaWidth / 2);
    var conjugateCentroidY = displacementCenterImageToRectangleCentroidY + (canvasEditableAreaHeight / 2);

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorClearArea;
    contextFourierTransformArea.globalAlpha = fillAlphaWhileDown;
    contextFourierTransformArea.arc(conjugateCentroidX, conjugateCentroidY, radius, 0, 2 * Math.PI);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorClearArea;
    contextFourierTransformArea.lineWidth = borderWidthClearArea;
    contextFourierTransformArea.globalAlpha = borderAlphaWhileDown;
    contextFourierTransformArea.stroke();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle = fillColorClearArea;
    contextFourierTransformArea.globalAlpha = alphaIntern;
    contextFourierTransformArea.arc(conjugateCentroidX, conjugateCentroidY, internRadius, 0, 2 * Math.PI);
    contextFourierTransformArea.fill();

}
function circleClearConjugateInSpectrum(circleClearConjugate) {
        var recX = Math.round(circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea - circleClearConjugate.circleClear1.radius);
        var recY = Math.round(circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea - circleClearConjugate.circleClear1.radius);
        var recWidth = Math.round(recX + (circleClearConjugate.circleClear1.radius * 2));
        var recHeight = Math.round(recY + (circleClearConjugate.circleClear1.radius * 2));

        var index, newIndex;

        for (var row = recY; row < recY + recHeight; row++) {

            for (var col = recX; col < recX + recWidth; col++) {

                if ((circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea - col) * (circleClearConjugate.circleClear1.centerCoordinateX_InCanvasArea - col)
                    + (circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea - row) * (circleClearConjugate.circleClear1.centerCoordinateY_InCanvasArea - row)
                    < (circleClearConjugate.circleClear1.radius * circleClearConjugate.circleClear1.radius)) {//is it inside the circle?

                    //index = ((row*fftSpectrumModified.width)+col);
                    //newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
                    //newIndex = newIndex + (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);

                    fftSpectrumModified.real[((row * fftSpectrumModified.width) + col) * 4] = fftSpectrumOriginal.real[((row * fftSpectrumModified.width) + col) * 4];
                    fftSpectrumModified.imag[((row * fftSpectrumModified.width) + col) * 4] = fftSpectrumOriginal.imag[((row * fftSpectrumModified.width) + col) * 4];

                    fftSpectrumModified.real[((row * fftSpectrumModified.width) + col) * 4 + 1] = fftSpectrumOriginal.real[((row * fftSpectrumModified.width) + col) * 4 + 1];
                    fftSpectrumModified.imag[((row * fftSpectrumModified.width) + col) * 4 + 1] = fftSpectrumOriginal.imag[((row * fftSpectrumModified.width) + col) * 4 + 1];

                    fftSpectrumModified.real[((row * fftSpectrumModified.width) + col) * 4 + 2] = fftSpectrumOriginal.real[((row * fftSpectrumModified.width) + col) * 4 + 2];
                    fftSpectrumModified.imag[((row * fftSpectrumModified.width) + col) * 4 + 2] = fftSpectrumOriginal.imag[((row * fftSpectrumModified.width) + col) * 4 + 2];

                    fftSpectrumModified.real[((row * fftSpectrumModified.width) + col) * 4 + 3] = 255;
                    fftSpectrumModified.imag[((row * fftSpectrumModified.width) + col) * 4 + 3] = 255;

                    /*fftSpectrumModified.real[(newIndex)*4] = fftSpectrumOriginal.real[(newIndex)*4];
                     fftSpectrumModified.imag[(newIndex)*4] = fftSpectrumOriginal.imag[(newIndex)*4];

                     fftSpectrumModified.real[(newIndex)*4+1] = fftSpectrumOriginal.real[(newIndex)*4+1];
                     fftSpectrumModified.imag[(newIndex)*4+1] = fftSpectrumOriginal.imag[(newIndex)*4+1];

                     fftSpectrumModified.real[(newIndex)*4+2] = fftSpectrumOriginal.real[(newIndex)*4+2];
                     fftSpectrumModified.imag[(newIndex)*4+2] = fftSpectrumOriginal.imag[(newIndex)*4+2];*/
                }

            }

        }

        recX = Math.round(circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea - circleClearConjugate.circleClear2.radius);
        recY = Math.round(circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea - circleClearConjugate.circleClear2.radius);
        recWidth = Math.round(recX + (circleClearConjugate.circleClear2.radius * 2));
        recHeight = Math.round(recY + (circleClearConjugate.circleClear2.radius * 2));


        for (var row = recY; row < recY + recHeight; row++) {

            for (var col = recX; col < recX + recWidth; col++) {

                if ((circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea - col) * (circleClearConjugate.circleClear2.centerCoordinateX_InCanvasArea - col)
                    + (circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea - row) * (circleClearConjugate.circleClear2.centerCoordinateY_InCanvasArea - row)
                    < (circleClearConjugate.circleClear2.radius * circleClearConjugate.circleClear2.radius)) {//is it inside the circle?

                    //index = ((row*fftSpectrumModified.width)+col);
                    //newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
                    //newIndex = newIndex + (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);


                    fftSpectrumModified.real[((row * fftSpectrumModified.width) + col) * 4] = fftSpectrumOriginal.real[((row * fftSpectrumModified.width) + col) * 4];
                    fftSpectrumModified.imag[((row * fftSpectrumModified.width) + col) * 4] = fftSpectrumOriginal.imag[((row * fftSpectrumModified.width) + col) * 4];

                    fftSpectrumModified.real[((row * fftSpectrumModified.width) + col) * 4 + 1] = fftSpectrumOriginal.real[((row * fftSpectrumModified.width) + col) * 4 + 1];
                    fftSpectrumModified.imag[((row * fftSpectrumModified.width) + col) * 4 + 1] = fftSpectrumOriginal.imag[((row * fftSpectrumModified.width) + col) * 4 + 1];

                    fftSpectrumModified.real[((row * fftSpectrumModified.width) + col) * 4 + 2] = fftSpectrumOriginal.real[((row * fftSpectrumModified.width) + col) * 4 + 2];
                    fftSpectrumModified.imag[((row * fftSpectrumModified.width) + col) * 4 + 2] = fftSpectrumOriginal.imag[((row * fftSpectrumModified.width) + col) * 4 + 2];

                    fftSpectrumModified.real[((row * fftSpectrumModified.width) + col) * 4 + 3] = 255;
                    fftSpectrumModified.imag[((row * fftSpectrumModified.width) + col) * 4 + 3] = 255;

                    /*fftSpectrumModified.real[(newIndex)*4] = fftSpectrumOriginal.real[(newIndex)*4];
                     fftSpectrumModified.imag[(newIndex)*4] = fftSpectrumOriginal.imag[(newIndex)*4];

                     fftSpectrumModified.real[(newIndex)*4+1] = fftSpectrumOriginal.real[(newIndex)*4+1];
                     fftSpectrumModified.imag[(newIndex)*4+1] = fftSpectrumOriginal.imag[(newIndex)*4+1];

                     fftSpectrumModified.real[(newIndex)*4+2] = fftSpectrumOriginal.real[(newIndex)*4+2];
                     fftSpectrumModified.imag[(newIndex)*4+2] = fftSpectrumOriginal.imag[(newIndex)*4+2];*/


                }

            }
        }
}

