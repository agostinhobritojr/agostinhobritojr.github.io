/**
 * Created by mypc on 12/11/2015.
 */
var Circle = function (centerCoordinateX_InCanvasArea,centerCoordinateY_InCanvasArea,radius, startAngle, endAngle, isSelected) {
    this.centerCoordinateX_InCanvasArea = centerCoordinateX_InCanvasArea;
    this.centerCoordinateY_InCanvasArea = centerCoordinateY_InCanvasArea;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.isSelected = isSelected;
    this.isCtrlC = false;
}

function circle2Object(){

    var deltaX = mouseCursorPositionInArea_X_mouseDown_While - mouseCursorPositionInArea_X_mouseDown;
    var deltaY = mouseCursorPositionInArea_Y_mouseDown_While - mouseCursorPositionInArea_Y_mouseDown;
    var radius = Math.sqrt((deltaX*deltaX) + (deltaY*deltaY));
    var circle = new Circle(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,  radius, 0, 2 * Math.PI,false);
    obj = new ObjectShape(shapeTypes[2],circle);
    return obj;

}

function drawFilledCircle(circle){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColor;
    contextFourierTransformArea.globalAlpha= fillAlpha;
    contextFourierTransformArea.arc(circle.centerCoordinateX_InCanvasArea, circle.centerCoordinateY_InCanvasArea,circle.radius,circle.startAngle,circle.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColor;
    contextFourierTransformArea.globalAlpha = borderAlpha;
    contextFourierTransformArea.lineWidth = borderWidth;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColor;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(circle.centerCoordinateX_InCanvasArea, circle.centerCoordinateY_InCanvasArea,internRadius,circle.startAngle,circle.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();
}

function drawFilledCircleSelected(circle){
    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= filllAlphaSelected;
    contextFourierTransformArea.arc(circle.centerCoordinateX_InCanvasArea, circle.centerCoordinateY_InCanvasArea,circle.radius,circle.startAngle,circle.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.strokeStyle = strokeColorSelected;
    contextFourierTransformArea.lineWidth = borderWidthSelected;
    contextFourierTransformArea.globalAlpha = borderAlphaSelected;
    contextFourierTransformArea.stroke();
    contextFourierTransformArea.closePath();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorSelected;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(circle.centerCoordinateX_InCanvasArea, circle.centerCoordinateY_InCanvasArea,internRadius,circle.startAngle,circle.endAngle);
    contextFourierTransformArea.fill();
    contextFourierTransformArea.closePath();
}

function isCircleSelected(circle,mouseX, mouseY){
    var displacement_X = circle.centerCoordinateX_InCanvasArea - mouseX;
    var displacement_Y = circle.centerCoordinateY_InCanvasArea - mouseY;
    var displacement = Math.sqrt((displacement_X*displacement_X)  + (displacement_Y*displacement_Y) );
    if(  displacement < circle.radius  ){
        circle.isSelected = true;
        return;
    }
    circle.isSelected = false;
}

function circleDisplacement(circle,deltaX,deltaY){
    circle.centerCoordinateX_InCanvasArea = circle.centerCoordinateX_InCanvasArea + deltaX;
    circle.centerCoordinateY_InCanvasArea = circle.centerCoordinateY_InCanvasArea + deltaY;
}

function ctrlV_circles(circle) {
    if (circle.isCtrlC) {
        var circ = new Circle(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, circle.radius, circle.startAngle, circle.endAngle, false);
        var object = new ObjectShape(shapeTypes[2],circ);
        objetcsShape.push(object);
        circle.isCtrlC = false;
    }
}

function drawFilledCircleWhileMouseHold(mouseX_while,mouseY_while,mouseX,mouseY) {
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
    contextFourierTransformArea.globalAlpha = borderAlphaWhileDown;
    contextFourierTransformArea.stroke();

    contextFourierTransformArea.beginPath();
    contextFourierTransformArea.fillStyle =  fillColorWhileDown;
    contextFourierTransformArea.globalAlpha= alphaIntern;
    contextFourierTransformArea.arc(mouseCursorPositionInArea_X_mouseDown,mouseCursorPositionInArea_Y_mouseDown,  internRadius, 0, 2 * Math.PI);
    contextFourierTransformArea.fill();
}

function circleInSpectrum(circle){
    var recX = Math.round(circle.centerCoordinateX_InCanvasArea-circle.radius);
    var recY = Math.round(circle.centerCoordinateY_InCanvasArea-circle.radius);
    var recWidth = Math.round(recX + (circle.radius*2) );
    var recHeight = Math.round(recY + (circle.radius*2) );

    var index, newIndex;

    for(var row=recY; row<recY+recHeight; row++){

        for(var col=recX; col<recX+recWidth; col++){

            if( (circle.centerCoordinateX_InCanvasArea-col)*(circle.centerCoordinateX_InCanvasArea-col) + (circle.centerCoordinateY_InCanvasArea-row)*(circle.centerCoordinateY_InCanvasArea-row)  < (circle.radius*circle.radius) ){//is it inside the circle
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
                fftSpectrumModified.imag[(newIndex)*4+2] = 0*/;
            }

        }

    }

}

function areaCalculation(circle){
    return (circle.radius*circle.radius*Math.PI);
}