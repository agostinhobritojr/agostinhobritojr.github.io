var objetcs = [];

function storeObject(){

    if(isButtonDrawingRectangleSelected){
        var obj = rectangle2Object();
        objetcs.push(obj);
    }

}

function removeAllObjects(){
    if(objetcs.length > 0) {
        objetcs.splice(0, objetcs.length);
    }
}
