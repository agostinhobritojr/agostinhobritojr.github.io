var frameRed;
var frameGreen;
var frameBlue;

var Kernel = function(rows,cols, type, imageWidth, imageHeight){
    this.numberRows = rows;
    this.numberColumns = cols;
    this.type = type;
    this.MinimumRowAllowed = Math.floor(this.numberRows/2);
    this.MinimumColumnAllowed = Math.floor(this.numberColumns/2);
    this.MaximumRowAllowed = imageHeight - (this.MinimumRowAllowed) -1;
    this.MaxiumColumnsAllowed = imageWidth - this.MinimumColumnAllowed -1;
    this.currentRow = this.MinimumRowAllowed;
    this.currentColumn = this.MinimumColumnAllowed;
    this.topLeftCornerRow = this.currentRow - this.MinimumRowAllowed;
    this.topLeftCornerCol = this.currentColumn - this.MinimumColumnAllowed;
    this.lastConvolutionRow = 0;
    this.lastConvolutionColumn = 0;
}

function updateFrames(kernel){
    frameRed = [];
    frameGreen = [];
    frameBlue = [];

    for(var row=0; row <  kernel.numberRows; row++){
        for(var col=0; col < kernel.numberColumns; col++) {
            frameRed.push(0);
            frameGreen.push(0);
            frameBlue.push(0);
        }
    }
}

function setKernelSize(kernel,rows,cols,imageWidth, imageHeight){
    kernel.numberRows = rows;
    kernel.numberColumns = cols;
    kernel.MinimumRowAllowed = Math.floor(kernel.numberRows/2);
    kernel.MinimumColumnAllowed = Math.floor(kernel.numberColumns/2);
    if(kernel.currentRow < kernel.MinimumRowAllowed){
        kernel.currentRow = kernel.MinimumRowAllowed;

    }
    if(kernel.currentColumn < kernel.MinimumColumnAllowed){
        kernel.currentColumn = kernel.MinimumColumnAllowed;
    }

    kernel.MaximumRowAllowed = imageHeight - kernel.MinimumRowAllowed - 1;
    kernel.MaxiumColumnsAllowed = imageWidth - kernel.MinimumColumnAllowed - 1;
    if(kernel.currentRow > kernel.MaximumRowAllowed){
        kernel.currentRow = kernel.MaximumRowAllowed;
    }
    if(kernel.currentColumn > kernel.MaxiumColumnsAllowed){
        kernel.currentColumn = kernel.MaxiumColumnsAllowed;

    }

    kernel.topLeftCornerRow = kernel.currentRow - kernel.MinimumColumnAllowed;
    kernel.topLeftCornerCol = kernel.currentColumn - kernel.MinimumColumnAllowed;
    updateFrames(kernel);
}

function setKernelPosition(kernel,horizontalCoordinate,verticalCoordinate){

    if(horizontalCoordinate < kernel.MinimumColumnAllowed){
        horizontalCoordinate = kernel.MinimumColumnAllowed;
    }
    else if(verticalCoordinate < kernel.MinimumRowAllowed){
        verticalCoordinate = kernel.MinimumRowAllowed;
    }
    else if(horizontalCoordinate > kernel.MaxiumColumnsAllowed){
        horizontalCoordinate = kernel.MaxiumColumnsAllowed;
    }
    else if(verticalCoordinate > kernel.MaximumRowAllowed){
        verticalCoordinate = kernel.MaximumRowAllowed;
    }
    kernel.currentRow = verticalCoordinate;
    kernel.currentColumn = horizontalCoordinate;

    kernel.topLeftCornerRow = kernel.currentRow - kernel.MinimumColumnAllowed;
    kernel.topLeftCornerCol = kernel.currentColumn - kernel.MinimumColumnAllowed;

}


function updateKernelPosition(kernel,horizontalDisplacement,verticalDisplacement){

    if( (kernel.currentColumn >= kernel.MaxiumColumnsAllowed) && (kernel.currentRow >= kernel.MaximumRowAllowed) ){
        animationStatus = "stopped";
        return false;
    }

    kernel.currentRow = kernel.currentRow +  verticalDisplacement;
    if(kernel.currentRow > kernel.MaximumRowAllowed){
        kernel.currentRow = kernel.MinimumRowAllowed;
        kernel.currentColumn = kernel.currentColumn+1;
    }

    kernel.currentColumn = kernel.currentColumn + horizontalDisplacement;
    if(kernel.currentColumn > kernel.MaxiumColumnsAllowed){
        kernel.currentColumn = kernel.MinimumColumnAllowed;
        kernel.currentRow = kernel.currentRow + 1;
    }

    kernel.topLeftCornerRow = kernel.currentRow - kernel.MinimumRowAllowed;
    kernel.topLeftCornerCol = kernel.currentColumn - kernel.MinimumColumnAllowed;
    return true;
}

function convolve(kernel,OriginalImageData,modifiedImageData,horizontalDisplacement,verticalDisplacement){

    for(var disp=0; disp < horizontalDisplacement; disp++){

        if(animationStatus == "stopped"){
            return;
        }

        if(kernel.type == "mean"){
            meanFilter(kernel,OriginalImageData,modifiedImageData);
        }
        if(kernel.type == "median"){
            medianFilter(kernel,OriginalImageData,modifiedImageData);
        }

        updateKernelPosition(kernel,1,0);


    }
}

function meanFilter(kernel,OriginalImageData,modifiedImageData){
    var sumRedChanel = 0;
    var sumGreenChanel = 0;
    var sumBlueChanel = 0;
    var index;
    var numberPixelsInNeighbourhood = kernel.numberRows*kernel.numberColumns;

    for(var row=kernel.topLeftCornerRow; row < kernel.topLeftCornerRow + kernel.numberRows; row++){
        for(var col=kernel.topLeftCornerCol; col < kernel.topLeftCornerCol+kernel.numberColumns; col++) {
            index = ((row*imageWidth)+col);

            sumRedChanel += OriginalImageData[(index*4)];
            sumGreenChanel += OriginalImageData[(index*4)+1];
            sumBlueChanel += OriginalImageData[(index*4)+2];
        }
    }

    index = (kernel.currentRow*imageWidth) + kernel.currentColumn;
    modifiedImageData[(index*4)] = sumRedChanel/numberPixelsInNeighbourhood;
    modifiedImageData[(index*4)+1] = sumGreenChanel/numberPixelsInNeighbourhood;
    modifiedImageData[(index*4)+2] = sumBlueChanel/numberPixelsInNeighbourhood;
    kernel.lastConvolutionRow = kernel.currentRow;
    kernel.lastConvolutionColumn = kernel.currentColumn;
}

function medianFilter(kernel,OriginalImageData,modifiedImageData){
    var index;
    var index2 = 0;

    for(var row=kernel.topLeftCornerRow; row < kernel.topLeftCornerRow + kernel.numberRows; row++){
        for(var col=kernel.topLeftCornerCol; col < kernel.topLeftCornerCol+kernel.numberColumns; col++) {
            index = ((row*imageWidth)+col);

            frameRed[index2] = OriginalImageData[(index*4)];
            frameGreen[index2] = OriginalImageData[(index*4)+1];
            frameBlue[index2] = OriginalImageData[(index*4)+2];
            index2 = index2 + 1;
        }
    }

    index = (kernel.currentRow*imageWidth) + kernel.currentColumn;
    modifiedImageData[(index*4)] = median(frameRed);
    modifiedImageData[(index*4)+1] = median(frameGreen);
    modifiedImageData[(index*4)+2] = median(frameBlue);

}


function median(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

function moveKernelToArea(kernel,object){
    if(object.type == shapeTypes[0]){
        object.shape.rectangle.coordinateX_InCanvasArea
        kernel.se

    }


}

