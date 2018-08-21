/**
 * Created by mypc on 13/11/2015.
 */
var ObjectShape = function(){
    this.type = "";
    this.shape = null;
    this.sizeObjectSeleted = -1;
}

var ObjectShape = function (type,object){
    this.type = type;
    this.shape = object;
    this.sizeObjectSeleted = -1;
}

var shapeTypes = ["rect","rectConjugate","circ", "circConjugate", "clearRect", "clearRectConjugate", "circClear", "circClearConjugate"];