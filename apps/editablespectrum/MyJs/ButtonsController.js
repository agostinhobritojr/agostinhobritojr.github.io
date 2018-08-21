//////////////////////////////////////////////////////
var isButtonDrawingRectangleSelected = false;
var isButtonDrawingCircleSelected = false;
var isButtonDrawingRingSelected = false;
var isButtonDrawingClearAreaSelected = false;
var isButtonDrawingConjugateSelected = false;


var ButtonDrawingRectangle  = document.getElementById('drawRectangleIcon');
var ButtonDrawingCircle = document.getElementById('drawCircleIcon');
var ButtonDrawingComplexConjugate = document.getElementById('drawConjugate');
var ButtonDrawingClearArea = document.getElementById('drawClearArea');


//////////////////////////////////////////////////////
var defaultButtonBorderStyle = "2px solid #555555";
var selectedButtonBorderStyle = "5px solid blue";
////////////////////////////////////////////////////


//////////////////////////////
ButtonDrawingRectangle.style.border = defaultButtonBorderStyle;
ButtonDrawingCircle.style.border = defaultButtonBorderStyle;
ButtonDrawingComplexConjugate.style.border = defaultButtonBorderStyle;
ButtonDrawingClearArea.style.border = defaultButtonBorderStyle;
////////////////////////////


//////////////////////////////////////////button drawing
function drawRectangleSelectedButton(){
    if(isButtonDrawingRectangleSelected){
        ButtonDrawingRectangle.style.border = defaultButtonBorderStyle;
        isButtonDrawingRectangleSelected = false;
    }else{
        ButtonDrawingRectangle.style.border = selectedButtonBorderStyle;
        isButtonDrawingRectangleSelected = true;
        deslectAllObjectShapes();
    }

    isButtonDrawingCircleSelected = false;
    isButtonDrawingRingSelected = false;


    ButtonDrawingCircle.style.border = defaultButtonBorderStyle;
}

function drawCircleSelectedButton(){
    if(isButtonDrawingCircleSelected){
        ButtonDrawingCircle.style.border = defaultButtonBorderStyle;
        isButtonDrawingCircleSelected = false;
    }else{
        ButtonDrawingCircle.style.border = selectedButtonBorderStyle;
        isButtonDrawingCircleSelected = true;
        deslectAllObjectShapes();
    }
    isButtonDrawingRectangleSelected = false;
    isButtonDrawingRingSelected = false;

    ButtonDrawingRectangle.style.border = defaultButtonBorderStyle;
}

function drawComplexConjugateButtonSelected(){
    if(isButtonDrawingConjugateSelected){
        ButtonDrawingComplexConjugate.style.border = defaultButtonBorderStyle;
        isButtonDrawingConjugateSelected = false;
    }
    else{
        ButtonDrawingComplexConjugate.style.border = selectedButtonBorderStyle;
        isButtonDrawingConjugateSelected = true;
        deslectAllObjectShapes();
    }


}

function drawClearAreaButtonSelected(){
    if(isButtonDrawingClearAreaSelected){
        ButtonDrawingClearArea.style.border = defaultButtonBorderStyle;
        isButtonDrawingClearAreaSelected = false;
    }
    else{
        ButtonDrawingClearArea.style.border = selectedButtonBorderStyle;
        isButtonDrawingClearAreaSelected = true;
        deslectAllObjectShapes();
    }

}

function anyButtonDrawSelected() {
    if ((isButtonDrawingRectangleSelected || isButtonDrawingCircleSelected  || isButtonDrawingRingSelected)
        || (isButtonDrawingConjugateSelected)) {
        return true;
    }else{
        return false;
    }
}

function deslectAllButtonsDrawSelected() {
    isButtonDrawingRectangleSelected = false;
    isButtonDrawingCircleSelected = false;
    isButtonDrawingConjugateSelected = false;
    isButtonDrawingClearAreaSelected = false;

    ButtonDrawingRectangle.style.border = defaultButtonBorderStyle;
    ButtonDrawingCircle.style.border = defaultButtonBorderStyle;
    ButtonDrawingComplexConjugate.style.border = defaultButtonBorderStyle;
    ButtonDrawingClearArea.style.border = defaultButtonBorderStyle;
}
