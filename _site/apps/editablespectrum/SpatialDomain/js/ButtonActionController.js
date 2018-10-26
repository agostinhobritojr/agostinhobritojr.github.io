/**
 * Created by mypc on 13/12/2015.
 */
var buttonDrawingRectangle  = document.getElementById('drawRectangleIcon');
var isButtonDrawingRectangleSelected = false;

//////////////////////////////////////////////////////
var defaultButtonBorderStyle = "2px solid #555555";
var selectedButtonBorderStyle = "3px solid blue";
///////////////////////////////////////////////////

function drawRectangleSelectedButton(){
    if(isButtonDrawingRectangleSelected){
        buttonDrawingRectangle.style.border = defaultButtonBorderStyle;
        isButtonDrawingRectangleSelected = false;
    }
    else{
        isButtonDrawingRectangleSelected = true;
        buttonDrawingRectangle.style.border = selectedButtonBorderStyle;
    }
}

function anyButtonDrawSelected(){
    if(isButtonDrawingRectangleSelected){
        return true;
    }else{
        return false;
    }

}