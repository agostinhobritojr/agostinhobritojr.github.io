var filterData = function () {
    this.width = 0;
    this.height = 0;
    this.real = [];
    this.imag = [];
    this.centerX = 0;
    this.centerY = 0;
    this.radius = 256/4;
    this.filterImageData = [];
}

var FilterBox = function(){
    this.coordinateX = 0;
    this.coordinateY = 0;
    this.width = 0;
    this.height = 0;
}

var lowPassFilter =  new filterData();
var highPassFilter =  new filterData();
var filterBox = new FilterBox();
var isLowPassFilter = true;

function setFilterRadius(){

    lowPassFilter.radius = document.getElementById("filterRadius").value;
    lowPassFilterStatus = document.getElementById("filterType").value;
    if(isImageLoaded){

        if(isLowPassFilter){
            computeLowPassFilter();
            filtringImageSpectrum();
        }else{
            computeHighPassFilter();
            filtringImageSpectrum();
        }
    }
}

function setFilterType(){

    if(isImageLoaded) {
        if (isLowPassFilter) {
            isLowPassFilter = false;
            computeHighPassFilter();
            filtringImageSpectrum();
        }
        else {
            isLowPassFilter = true;
            computeLowPassFilter();
            filtringImageSpectrum();
        }
    }
}

function computeLowPassFilter(){
    lowPassFilter.width = canvasAreaWidth;
    lowPassFilter.height = canvasAreaHeight;
    lowPassFilter.centerX = canvasAreaWidth/2;
    lowPassFilter.centerY = canvasAreaHeight/2;

    filterBox.centerX = lowPassFilter.centerX - lowPassFilter.radius;
    filterBox.centerY = lowPassFilter.centerY - lowPassFilter.radius;
    filterBox.width = 2*lowPassFilter.radius;
    filterBox.height = 2*lowPassFilter.radius;

    var imageData = contextCanvasSpectrumFilter.getImageData(0, 0, canvasAreaWidth,canvasAreaHeight);
    var data = imageData.data;


    for(var row=0; row<canvasAreaHeight; row++){
        for(var col=0; col<canvasAreaWidth; col++){
            if( ((row-lowPassFilter.centerY)*(row-lowPassFilter.centerY)) +  ((col-lowPassFilter.centerX)*(col-lowPassFilter.centerX)) > lowPassFilter.radius*lowPassFilter.radius  ){
                data[ ((row*lowPassFilter.width)+col)*4 ] = 0
                data[ ((row*lowPassFilter.width)+col)*4 + 1] = 0
                data[ ((row*lowPassFilter.width)+col)*4 + 2] = 0
                data[ ((row*lowPassFilter.width)+col)*4 + 3] = 255;
            }else{
                data[ ((row*lowPassFilter.width)+col)*4 ] = 255
                data[ ((row*lowPassFilter.width)+col)*4 + 1] = 255
                data[ ((row*lowPassFilter.width)+col)*4 + 2] = 255
                data[ ((row*lowPassFilter.width)+col)*4 + 3] = 255;
            }
        }
    }

    contextCanvasSpectrumFilter.putImageData(imageData,0,0);

}

function computeHighPassFilter(){
    lowPassFilter.width = canvasAreaWidth;
    lowPassFilter.height = canvasAreaHeight;
    lowPassFilter.centerX = canvasAreaWidth/2;
    lowPassFilter.centerY = canvasAreaHeight/2;


    filterBox.centerX = lowPassFilter.centerX - lowPassFilter.radius;
    filterBox.centerY = lowPassFilter.centerY - lowPassFilter.radius;
    filterBox.width = 2*lowPassFilter.radius;
    filterBox.height = 2*lowPassFilter.radius;

    var imageData = contextCanvasSpectrumFilter.getImageData(0, 0, canvasAreaWidth,canvasAreaHeight);
    var data = imageData.data;

    for(var row=0; row<canvasAreaHeight; row++){
        for(var col=0; col<canvasAreaWidth; col++){
            if( ((row-lowPassFilter.centerY)*(row-lowPassFilter.centerY)) +  ((col-lowPassFilter.centerX)*(col-lowPassFilter.centerX)) > lowPassFilter.radius*lowPassFilter.radius  ){
                data[ ((row*lowPassFilter.width)+col)*4 ] = 255
                data[ ((row*lowPassFilter.width)+col)*4 + 1] = 255
                data[ ((row*lowPassFilter.width)+col)*4 + 2] = 255
                data[ ((row*lowPassFilter.width)+col)*4 + 3] = 255;
            }else{
                data[ ((row*lowPassFilter.width)+col)*4 ] = 0
                data[ ((row*lowPassFilter.width)+col)*4 + 1] = 0
                data[ ((row*lowPassFilter.width)+col)*4 + 2] = 0
                data[ ((row*lowPassFilter.width)+col)*4 + 3] = 255;
            }
        }
    }

    contextCanvasSpectrumFilter.putImageData(imageData,0,0);
}


function filtringImageSpectrum(){

    var imageDataFilter = contextCanvasSpectrumFilter.getImageData(0, 0, canvasAreaWidth,canvasAreaHeight);
    var dataFilter = imageDataFilter.data;

    var imageDataInputSpectrum = contextCanvasSpectrumInput.getImageData(0, 0, canvasAreaWidth,canvasAreaHeight);
    var dataInputSpectrum = imageDataInputSpectrum.data;

    var imageDataOutputSpectrum = contextCanvasSpectrumOutput.getImageData(0, 0, canvasAreaWidth,canvasAreaHeight);
    var dataOutputSpectrum = imageDataOutputSpectrum.data;


    for(var row=0; row<canvasAreaHeight; row++){
        for(var col=0; col<canvasAreaWidth; col++){

            if(dataFilter[ ((row*lowPassFilter.width)+col)*4 ] > 1){
                dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 ] = dataInputSpectrum[ ((row*lowPassFilter.width)+col)*4 ];
                dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 +1] = dataInputSpectrum[ ((row*lowPassFilter.width)+col)*4 +1];
                dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 + 2] = dataInputSpectrum[ ((row*lowPassFilter.width)+col)*4 +2];
                dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 + 3] = 255;
            }else{
                dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 ] = 0;
                dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 +1] = 0;
                dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 + 2] = 0;
                dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 + 3] = 255;
            }
        }
    }

    contextCanvasSpectrumOutput.putImageData(imageDataOutputSpectrum,0,0);

}

function organizeDataToIFFT(){

    var imageDataOutputSpectrum = contextCanvasSpectrumOutput.getImageData(0, 0, canvasAreaWidth,canvasAreaHeight);
    var dataOutputSpectrum = imageDataOutputSpectrum.data;

    for(var row=0; row<canvasAreaHeight; row++){
        for(var col=0; col<canvasAreaWidth; col++){
            fftSpectrumModified.real[((row*lowPassFilter.width)+col)*4] = dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 ];
            fftSpectrumModified.real[((row*lowPassFilter.width)+col)*4+1] = dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 +1];
            fftSpectrumModified.real[((row*lowPassFilter.width)+col)*4+2] = dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 + 2];
            fftSpectrumModified.real[((row*lowPassFilter.width)+col)*4+3] = 255;

            fftSpectrumModified.imag[((row*lowPassFilter.width)+col)*4] = dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 ];
            fftSpectrumModified.imag[((row*lowPassFilter.width)+col)*4+1] = dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 +1];
            fftSpectrumModified.imag[((row*lowPassFilter.width)+col)*4+2] = dataOutputSpectrum[ ((row*lowPassFilter.width)+col)*4 + 2];
            fftSpectrumModified.imag[((row*lowPassFilter.width)+col)*4+3] = 255;
        }
    }



}