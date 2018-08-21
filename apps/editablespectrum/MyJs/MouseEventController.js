////////////info text
var currentCursorPosition = "";
var currentColorPixel = "";
var currentDragDropPosition = "";

var textComponent = document.getElementById("TextInfo");
//////////////////

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

/////////////////////////////////////////////////

//acha a posicao do curso do mouse em relacao a um objeto na pagina
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


$("#imageFourier").on('click', function (e) {
    /*if (longpress) {

     }*/
    if(!(anyButtonDrawSelected())){
        var pos = findPos(this);
        mouseCursorPositionInArea_X = e.pageX - pos.x;
        mouseCursorPositionInArea_Y = e.pageY - pos.y;
        anyObjectShapeSelected(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y);
    }


});

$("#imageFourier").on('mousedown', function (e) {
    var pos = findPos(this);
    mouseCursorPositionInArea_X_mouseDown = e.pageX - pos.x;
    mouseCursorPositionInArea_Y_mouseDown = e.pageY - pos.y;
    //startTime = new Date().getTime();

    mousePressed =  true;
    lastMouseCursorPositionX = mouseCursorPositionInArea_X;
    lastMouseCursorPositionY = mouseCursorPositionInArea_Y;
});

$("#imageFourier").mouseup(function (e) {
    //endTime = new Date().getTime();
    //longpress = (endTime - startTime >= 200);//clica e espera pelo ao menos 0.2 segundo para ser considera um "click and hold"
    if( anyButtonDrawSelected() && (mousePressed)){
        storeObjectShape();
        drawObjectShapesInOriginalImage();
        //clearCtrlYObjects();
    }
    e.stopPropagation();
    mousePressed = false;


});

$('#imageFourier').mousemove(function(e) {
    var pos = findPos(this);
    mouseCursorPositionInArea_X = e.pageX - pos.x;
    mouseCursorPositionInArea_Y = e.pageY - pos.y;
    currentCursorPosition = "(" +  mouseCursorPositionInArea_X + ", " + mouseCursorPositionInArea_Y +")";
    var c = this.getContext('2d');
    var p = contextFourierTransformArea.getImageData(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y, 1, 1).data;
    //currentColorPixel =  "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    currentColorPixel = "R = "+ p[0] +"<br>"+"G = " + p[1] + "<br>" + "B = " + p[2];
    if(mousePressed){
        whileMouseDown(mouseCursorPositionInArea_X, mouseCursorPositionInArea_Y);
        if(!(anyButtonDrawSelected())){
            whileMouseDownObjectSelected();
        }
    }

    updateCursosInformation();

});
