


var myKernel;
var animationSpeed = 1; // pixels/iteration
initKernel();

function initKernel(){
    var height = document.getElementById('kernelHeight').value;
    height = Math.floor(height);

    var width = document.getElementById('kernelWidth').value;
    width = Math.floor(width);

    var type = document.getElementById('filterType').value;

    var imageWidth = 512;
    var imaheHeight = 512;

    myKernel = new Kernel(height,width, type, imageWidth,imaheHeight );
    drawAnimationComponents(myKernel);
}

function setWidthKernel() {
    var width = document.getElementById('kernelWidth').value;
    width = Math.floor(width);
    if (width > 1) {
        if (width % 2 == 0) {
            width = width +  1;
        }
        document.getElementById('kernelWidth').value = width;
        setKernelSize(myKernel, myKernel.numberRows,width,imageWidth,imageHeight);
    } else {
        document.getElementById('kernelWidth').value = 3;
        setKernelSize(myKernel, myKernel.numberRows,3,imageWidth,imageHeight);
    }
    document.getElementById('kernelHorizontalCoordinate').value = myKernel.currentColumn;
    document.getElementById('kernelVerticalCoordinate').value = myKernel.currentRow;
    drawAnimationComponents(myKernel);
}
function setHeightKernel(){
    var height = document.getElementById('kernelHeight').value;
    height = Math.floor(height);
    if(height > 1 ){
        if(height%2 == 0){
            height =  height + 1;
        }
        document.getElementById('kernelHeight').value = height;
        setKernelSize(myKernel, height,myKernel.numberColumns,imageWidth,imageHeight);
    }else{
        document.getElementById('kernelHeight').value = 3;
        setKernelSize(myKernel, 3,myKernel.numberColumns,imageWidth,imageHeight);
    }
    document.getElementById('kernelHorizontalCoordinate').value = myKernel.currentColumn;
    document.getElementById('kernelVerticalCoordinate').value = myKernel.currentRow;
    drawAnimationComponents(myKernel);
}

function setHorizontalPosition(){
    var horizontalCoord = document.getElementById('kernelHorizontalCoordinate').value;
    horizontalCoord = Math.floor(horizontalCoord);
    setKernelPosition(myKernel,horizontalCoord,myKernel.currentRow);
    document.getElementById('kernelHorizontalCoordinate').value = myKernel.currentColumn;
    drawAnimationComponents(myKernel);
}

function setVerticalPosition(){
    var verticalCoord = document.getElementById('kernelVerticalCoordinate').value;
    verticalCoord = Math.floor(verticalCoord);
    setKernelPosition(myKernel,myKernel.currentColumn,verticalCoord);
    document.getElementById('kernelVerticalCoordinate').value = myKernel.currentRow;
    drawAnimationComponents(myKernel);
}

function setAnimationSpeed(){
    var speed = document.getElementById('animationSpeed').value;
    speed = Math.floor(speed);
    if(speed >= 0){
        animationSpeed = speed;
        document.getElementById('animationSpeed').value = speed;
    }
    else{
        animationSpeed = 1;
        document.getElementById('animationSpeed').value = 1;
    }
}

function updatePositionField(){
    document.getElementById('kernelHorizontalCoordinate').value = myKernel.currentColumn;
    document.getElementById('kernelVerticalCoordinate').value = myKernel.currentRow;
}

function setConvolutionType(){
    myKernel.type = document.getElementById('filterType').value
}

