var CircleConjugate = function (circle1,circle2, isSelected) {
    this.circle1 = circle1;
    this.circle2 = circle2;
    this.isSelected = isSelected;
    this.isCtrlC = false;
}

function circleConjugate2Object(canvasEditableAreaWidth,canvasEditableAreaHeight){

    var deltaX = mouseCursorPositionInArea_X_mouseDown_While - mouseCursorPositionInArea_X_mouseDown;
    var deltaY = mouseCursorPositionInArea_Y_mouseDown_While - mouseCursorPositionInArea_Y_mouseDown;
    var radius = Math.sqrt((deltaX*deltaX) + (deltaY*deltaY));
    var circle1 = new Circle(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,  radius, 0, 2 * Math.PI,false);


    var displacementCenterImageToRectangleCentroidX = circle1.centerCoordinateX_InCanvasArea - (canvasEditableAreaWidth/2);
    var displacementCenterImageToRectangleCentroidY = circle1.centerCoordinateY_InCanvasArea- (canvasEditableAreaHeight/2);

    //conjugate is located in the opposite direction
    displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
    displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;
    var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
    var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);

    var circle2 = new Circle(conjugateCentroidX,conjugateCentroidY,  radius, 0, 2 * Math.PI,false);
    var circConjugate = new CircleConjugate(circle1,circle2);
    object = new ObjectShape(shapeTypes[3],circConjugate);
    return object;
}

function drawFilledCircleConjugate(circleConjugate){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColor;
    contextFourierTransformArea.globalAlpha= fillAlpha;
    contextFourierTransformArea.arc(circleConjugate.circle1.centerCoordinateX_InCanvasArea, circleConjugate.circle1.centerCoordinateY_InCanvasArea,circleConjugate.circle1.radius,circleConjugate.circle1.startAngle,circleConjugate.circle1.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColor;
    contextFourierTransformArea.lineWidth = borderWidth;
    contextFourierTransformArea.globalAlpha = borderAlpha;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColor;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(circleConjugate.circle1.centerCoordinateX_InCanvasArea, circleConjugate.circle1.centerCoordinateY_InCanvasArea,internRadius,circleConjugate.circle1.startAngle,circleConjugate.circle1.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColor;
    contextFourierTransformArea.globalAlpha= fillAlpha;
    contextFourierTransformArea.arc(circleConjugate.circle2.centerCoordinateX_InCanvasArea, circleConjugate.circle2.centerCoordinateY_InCanvasArea,circleConjugate.circle2.radius,circleConjugate.circle2.startAngle,circleConjugate.circle2.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColor;
    contextFourierTransformArea.lineWidth = borderWidth;
    contextFourierTransformArea.globalAlpha = borderAlpha;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColor;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(circleConjugate.circle2.centerCoordinateX_InCanvasArea, circleConjugate.circle2.centerCoordinateY_InCanvasArea,internRadius,circleConjugate.circle2.startAngle,circleConjugate.circle2.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();
}

function drawFilledCircleConjugateSelected(circleConjugate){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.arc(circleConjugate.circle1.centerCoordinateX_InCanvasArea, circleConjugate.circle1.centerCoordinateY_InCanvasArea,circleConjugate.circle1.radius,circleConjugate.circle1.startAngle,circleConjugate.circle1.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(circleConjugate.circle1.centerCoordinateX_InCanvasArea, circleConjugate.circle1.centerCoordinateY_InCanvasArea,internRadius,circleConjugate.circle1.startAngle,circleConjugate.circle1.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.arc(circleConjugate.circle2.centerCoordinateX_InCanvasArea, circleConjugate.circle2.centerCoordinateY_InCanvasArea,circleConjugate.circle2.radius,circleConjugate.circle2.startAngle,circleConjugate.circle2.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(circleConjugate.circle2.centerCoordinateX_InCanvasArea, circleConjugate.circle2.centerCoordinateY_InCanvasArea,internRadius,circleConjugate.circle2.startAngle,circleConjugate.circle2.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();
}

function isCircleConjugateSelected(circleConjugate,mouseX, mouseY){
    var displacement_X = circleConjugate.circle1.centerCoordinateX_InCanvasArea - mouseX;
    var displacement_Y = circleConjugate.circle1.centerCoordinateY_InCanvasArea - mouseY;
    var displacement = Math.sqrt((displacement_X*displacement_X)  + (displacement_Y*displacement_Y) );
    if(  displacement < circleConjugate.circle1.radius  ){
        circleConjugate.circle1.isSelected = true;
        circleConjugate.isSelected = true;
        return;
    }

    displacement_X = circleConjugate.circle2.centerCoordinateX_InCanvasArea - mouseX;
    displacement_Y = circleConjugate.circle2.centerCoordinateY_InCanvasArea - mouseY;
    displacement = Math.sqrt((displacement_X*displacement_X)  + (displacement_Y*displacement_Y) );
    if(  displacement < circleConjugate.circle2.radius  ){
        circleConjugate.circle2.isSelected = true;
        circleConjugate.isSelected = true;
        return;
    }

    circleConjugate.circle1.isSelected = false;
    circleConjugate.circle2.isSelected = false;
    circleConjugate.isSelected = false;
}

function circleConjugateDisplacement(circleConjugate,deltaX,deltaY){

    if (circleConjugate.circle1.isSelected) {
        circleConjugate.circle1.centerCoordinateX_InCanvasArea = circleConjugate.circle1.centerCoordinateX_InCanvasArea + deltaX;
        circleConjugate.circle1.centerCoordinateY_InCanvasArea = circleConjugate.circle1.centerCoordinateY_InCanvasArea + deltaY;

        circleConjugate.circle2.centerCoordinateX_InCanvasArea = circleConjugate.circle2.centerCoordinateX_InCanvasArea - deltaX;
        circleConjugate.circle2.centerCoordinateY_InCanvasArea = circleConjugate.circle2.centerCoordinateY_InCanvasArea - deltaY;
    }

    else if (circleConjugate.circle2.isSelected) {
        circleConjugate.circle2.centerCoordinateX_InCanvasArea = circleConjugate.circle2.centerCoordinateX_InCanvasArea + deltaX;
        circleConjugate.circle2.centerCoordinateY_InCanvasArea = circleConjugate.circle2.centerCoordinateY_InCanvasArea + deltaY;

        circleConjugate.circle1.centerCoordinateX_InCanvasArea = circleConjugate.circle1.centerCoordinateX_InCanvasArea - deltaX;
        circleConjugate.circle1.centerCoordinateY_InCanvasArea = circleConjugate.circle1.centerCoordinateY_InCanvasArea - deltaY;
    }
}

function ctrlV_circlesConjugate(circleConjugate,canvasEditableAreaWidth,canvasEditableAreaHeight) {
    if (circleConjugate.isCtrlC) {
        var circ1 = new Circle(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, circleConjugate.circle1.radius,circleConjugate.circle1.startAngle, circleConjugate.circle1.endAngle, false);

        var displacementCenterImageToRectangleCentroidX = mouseCursorPositionInArea_X - (canvasEditableAreaWidth/2);
        var displacementCenterImageToRectangleCentroidY = mouseCursorPositionInArea_Y - (canvasEditableAreaHeight/2);

        //conjugate is located in the opposite direction
        displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
        displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;

        var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
        var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);

        var circ2 = new Circle(conjugateCentroidX, conjugateCentroidY, circleConjugate.circle2.radius,circleConjugate.circle2.startAngle, circleConjugate.circle2.endAngle, false);
        var circConjugate = new CircleConjugate(circ1,circ2);

        var object = new ObjectShape(shapeTypes[3],circConjugate);
        objetcsShape.push(object);
        circleConjugate.isCtrlC = false;
    }
}

function drawFilledCircleConjugateWhileMouseHold(mouseX_while,mouseY_while,mouseX,mouseY,canvasEditableAreaWidth,canvasEditableAreaHeight){

    var deltaX = mouseX_while - mouseX;
    var deltaY = mouseY_while - mouseY;
    var radius = Math.sqrt((deltaX*deltaX) + (deltaY*deltaY));
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorWhileDown;
    contextFourierTransformArea.globalAlpha= fillAlphaWhileDown;
    contextFourierTransformArea.arc(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,  radius, 0, 2 * Math.PI);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorWhileDown;
    contextFourierTransformArea.lineWidth = borderWidthWhileDown;
    contextFourierTransformArea.globalAlpha =  borderAlphaWhileDown;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorWhileDown;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,  internRadius, 0, 2 * Math.PI);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();

    var displacementCenterImageToRectangleCentroidX = mouseCursorPositionInArea_X_mouseDown- canvasEditableAreaWidth/2;
    var displacementCenterImageToRectangleCentroidY = mouseCursorPositionInArea_Y_mouseDown- canvasEditableAreaHeight/2;
    //conjugate is located in the opposite direction
    displacementCenterImageToRectangleCentroidX = -displacementCenterImageToRectangleCentroidX;
    displacementCenterImageToRectangleCentroidY = -displacementCenterImageToRectangleCentroidY;
    var conjugateCentroidX = displacementCenterImageToRectangleCentroidX+(canvasEditableAreaWidth/2);
    var conjugateCentroidY = displacementCenterImageToRectangleCentroidY+(canvasEditableAreaHeight/2);

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorWhileDown;
    contextFourierTransformArea.globalAlpha= fillAlphaWhileDown;
    contextFourierTransformArea.arc(conjugateCentroidX,conjugateCentroidY,  radius, 0, 2 * Math.PI);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorWhileDown;
    contextFourierTransformArea.lineWidth = borderWidthWhileDown;
    contextFourierTransformArea.globalAlpha =  borderAlphaWhileDown;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorWhileDown;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(conjugateCentroidX,conjugateCentroidY,  internRadius, 0, 2 * Math.PI);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();

}


function circleConjugateInSpectrum(circleConjugate){
    var recX = Math.round(circleConjugate.circle1.centerCoordinateX_InCanvasArea-circleConjugate.circle1.radius);
    var recY = Math.round(circleConjugate.circle1.centerCoordinateY_InCanvasArea-circleConjugate.circle1.radius);
    var recWidth = Math.round(recX + (circleConjugate.circle1.radius*2) );
    var recHeight = Math.round(recY + (circleConjugate.circle1.radius*2) );

    var index, newIndex;

    for(var row=recY; row<recY+recHeight; row++){

        for(var col=recX; col<recX+recWidth; col++){

            if( (circleConjugate.circle1.centerCoordinateX_InCanvasArea-col)*(circleConjugate.circle1.centerCoordinateX_InCanvasArea-col)
                + (circleConjugate.circle1.centerCoordinateY_InCanvasArea-row)*(circleConjugate.circle1.centerCoordinateY_InCanvasArea-row)
                < (circleConjugate.circle1.radius*circleConjugate.circle1.radius) ){//is it inside the circle?

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

    recX = Math.round(circleConjugate.circle2.centerCoordinateX_InCanvasArea-circleConjugate.circle2.radius);
    recY = Math.round(circleConjugate.circle2.centerCoordinateY_InCanvasArea-circleConjugate.circle2.radius);
    recWidth = Math.round(recX + (circleConjugate.circle2.radius*2) );
    recHeight = Math.round(recY + (circleConjugate.circle2.radius*2) );


    for(var row=recY; row<recY+recHeight; row++){

        for(var col=recX; col<recX+recWidth; col++){

            if( (circleConjugate.circle2.centerCoordinateX_InCanvasArea-col)*(circleConjugate.circle2.centerCoordinateX_InCanvasArea-col)
                + (circleConjugate.circle2.centerCoordinateY_InCanvasArea-row)*(circleConjugate.circle2.centerCoordinateY_InCanvasArea-row)
                < (circleConjugate.circle2.radius*circleConjugate.circle2.radius) ){//is it inside the circle?

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


}
