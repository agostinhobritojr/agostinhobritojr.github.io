/**
 * Created by mypc on 13/12/2015.
 */
////////////info text
var currentCursorPosition = "";
var currentColorPixel = "";
var currentDragDropPosition = "";

var textComponent = document.getElementById("TextInfo");
//////////////////


////////////////////////////////
var startTime;
var endTime;
var isClick;
var requiredTimeToClick = 200;// miliseconds
///////////////////////////////

//////////mouse pointetr coordinates
var mouseCursorPositionInArea_X;
var mouseCursorPositionInArea_Y;

var mouseCursorPositionInArea_X_mouseDown;
var mouseCursorPositionInArea_Y_mouseDown;

var mouseCursorPositionInArea_X_mouseDown_While;
var mouseCursorPositionInArea_Y_mouseDown_While;
////////////////////////////////////////////

///////mouse onclick
var mousePressed = false;

////////////////drag and drop objects/////////////////
var lastMouseCursorPositionX = 0;
var lastMouseCursorPositionY = 0;

//find the mouse cursor coordinates
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

//convert R-G-B to Hexadecimal
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function updateCursosInformation(){
    textComponent.innerHTML = currentCursorPosition + "<br>" + currentColorPixel + "<br>" + currentDragDropPosition;
}

$("#imageFiltred").on('click', function (e) {


    if(!anyButtonDrawSelected() && isImageLoaded){

        if(animationStatus == "running"){
            animationStatus = "stopped";
        }else if(animationStatus == "stopped") {
            animationStatus = "running";
            animation(myKernel);
        }
    }

});

$("#imageFiltred").on('mousedown', function (e) {
    var pos = findPos(this);
    mouseCursorPositionInArea_X_mouseDown = e.pageX - pos.x;
    mouseCursorPositionInArea_Y_mouseDown = e.pageY - pos.y;
    startTime = new Date().getTime();

    mousePressed =  true;
    lastMouseCursorPositionX = mouseCursorPositionInArea_X;
    lastMouseCursorPositionY = mouseCursorPositionInArea_Y;
});


$("#imageFiltred").mouseup(function (e) {
    endTime = new Date().getTime();
    isClick = (endTime - startTime > requiredTimeToClick);//clica e espera pelo ao menos 0.2 segundo para ser considera um "click and hold"
    if( anyButtonDrawSelected() && (mousePressed)){
        if(isClick) {
            storeObject();
            drawObjectSavedInImage();

        }else{
            removeAllObjects();
            drawObjectSavedInImage();
        }
        //clearCtrlYObjects();
    }
    e.stopPropagation();
    mousePressed = false;

});


$('#imageFiltred').mousemove(function(e) {
    var pos = findPos(this);
    mouseCursorPositionInArea_X = e.pageX - pos.x;
    mouseCursorPositionInArea_Y = e.pageY - pos.y;
    currentCursorPosition = "x=" +  mouseCursorPositionInArea_X + ", y=" + mouseCursorPositionInArea_Y;
    var p = contextCanvasImageFiltredArea.getImageData(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, 1, 1).data;
    currentColorPixel =  "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    if(mousePressed){
        if(anyButtonDrawSelected()){
            if(objetcs.length > 0){
                removeAllObjects();
                drawObjectSavedInImage();
            }
            drawObjectWhileMouseDown(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y);
        }
        //whileMouseDown(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y);
        //if(!(anyButtonDrawSelected())){
        //    whileMouseDownObjectSelected();
        //}
    }

    updateCursosInformation();

});