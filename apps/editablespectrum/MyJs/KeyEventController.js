var PileOperations = [];
var pileTransitoryOperations = [];
var PileTransitoryObjects = [];
var lastOperation;

/////////////////////////////////ctrl+c functions
function ctrlC_objects(){

    for(var index=0; index<objetcsShape.length; index++){
        if(objetcsShape[index].shape.isSelected) {
            objetcsShape[index].shape.isCtrlC = true;
        }

    }
}


/////////////////////////////////////ctrl+v functions
function ctrlV_objects(){

    for(var index=0; index<objetcsShape.length; index++){
        if(objetcsShape[index].shape.isCtrlC) {

            if (objetcsShape[index].type == shapeTypes[0] ) {
                ctrlV_rectangle(objetcsShape[index].shape);
                PileOperations.push("created");
            }
            if (objetcsShape[index].type == shapeTypes[1]) {
                ctrlV_rectanglesConjugate(objetcsShape[index].shape,imageWidthZeroPadding, imageHeightZeroPadding);
                PileOperations.push("created");
            }
            if (objetcsShape[index].type == shapeTypes[2]) {
                ctrlV_circles(objetcsShape[index].shape);
                PileOperations.push("created");
            }
            if (objetcsShape[index].type == shapeTypes[3]) {
                ctrlV_circlesConjugate(objetcsShape[index].shape,imageWidthZeroPadding, imageHeightZeroPadding);
                PileOperations.push("created");
            }
            if (objetcsShape[index].type == shapeTypes[4]) {
                ctrlV_clearRectangle(objetcsShape[index].shape);
                PileOperations.push("created");
            }
            if (objetcsShape[index].type == shapeTypes[5]) {
                ctrlV_rectanglesClearConjugate(objetcsShape[index].shape,imageWidthZeroPadding, imageHeightZeroPadding);
                PileOperations.push("created");
            }
            if (objetcsShape[index].type == shapeTypes[6]) {
                ctrlV_circlesClear(objetcsShape[index].shape);
                PileOperations.push("created");
            }
            if (objetcsShape[index].type == shapeTypes[7]) {
                ctrlV_circlesClearConjugate(objetcsShape[index].shape,imageWidthZeroPadding, imageHeightZeroPadding);
                PileOperations.push("created");
            }
        }
    }
    drawObjectShapesInOriginalImage();
}


function ctrlZ_action(){
    if(PileOperations.length > 0){
        lastOperation = PileOperations.pop();
        pileTransitoryOperations.push(lastOperation);
        if(lastOperation == "created"){
            PileTransitoryObjects.push(objetcsShape.pop());
        }
        if(lastOperation == "removed"){
            objetcsShape.push(PileTransitoryObjects.pop());
        }
        drawObjectShapesInOriginalImage();
    }


}

function ctrlY_action(){
    if(pileTransitoryOperations.length > 0) {
        lastOperation = pileTransitoryOperations.pop();
        PileOperations.push(lastOperation);
        if (lastOperation == "created") {
            objetcsShape.push(PileTransitoryObjects.pop());
        }
        if(lastOperation == "removed"){
            PileTransitoryObjects.push(objetcsShape.pop());
        }
        drawObjectShapesInOriginalImage();
    }

}

//remove object(s)
document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField(e) {
    var keyCode = e.keyCode;

    if(keyCode==46) {

        for(var index=0; index<objetcsShape.length ; index++){
            if(objetcsShape[index].shape.isSelected){
                PileOperations.push("removed");
                objetcsShape[index].shape.isSelected = false;
                PileTransitoryObjects.push(objetcsShape[index]);
                objetcsShape.splice(index,1);
                index=-1;
            }
        }
        drawObjectShapesInOriginalImage();
    }

}

//ctrl+c, ctrl+v, ctrl+z and ctrl+y of objects
$(document).ready(function()
{
    var ctrlDown = false;
    var ctrlKey = 17, vKey = 86, cKey = 67, yKey = 89,zKey = 90;

    $(document).keydown(function(e)
    {
        if (e.keyCode == ctrlKey) ctrlDown = true;
    }).keyup(function(e)
    {
        if (e.keyCode == ctrlKey) ctrlDown = false;
    });

    $(document).keydown(function(e)
    {
        if (ctrlDown && (e.keyCode == cKey)){
            if(!anyButtonDrawSelected()){
                ctrlC_objects();
                //alert('objetos copiados');
            }

        }
        if (ctrlDown && (e.keyCode == vKey)){
            if(!anyButtonDrawSelected()){
                ctrlV_objects();
                //alert('objetos colados');
            }
        }

        if (ctrlDown && (e.keyCode == zKey)){
            if(objetcsShape.length > 0){
                ctrlZ_action();
            }
        }

        if (ctrlDown && (e.keyCode == yKey)){
            ctrlY_action();

        }

    });
});

