var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var isImageLoaded = false;

var canvasImageUploadedArea = document.getElementById('imageUploaded');
var contextCanvasImageUploadedArea = canvasImageUploadedArea.getContext('2d');

var canvasImageFilteredArea = document.getElementById('imageFiltred');
var contextCanvasImageFiltredArea = canvasImageFilteredArea.getContext('2d');

var imageWidth = 512;
var imageHeight = 512;

var originalImageData = [];
var modifiedImageData = [];
var modifiedImageDataCopy = [];

var imageGeneratedFromLastMousePressUp = contextCanvasImageFiltredArea.getImageData(0,0,imageWidth,imageHeight);

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        img = new Image();
        img.onload = function(){
            drawImageInCanvasAreas(img);
            storeOriginalData();
            drawKernel(myKernel);
            isImageLoaded = true;
            updateLastFrameBeforeMouseEvent();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function updateLastFrameBeforeMouseEvent(){
    imageGeneratedFromLastMousePressUp = contextCanvasImageFiltredArea.getImageData(0,0,imageWidth,imageHeight);
}

function drawImageInCanvasAreas(image){

    imageWidth = image.width;
    imageHeight = image.height;
    var index;

    contextCanvasImageUploadedArea.canvas.width = imageWidth;
    contextCanvasImageUploadedArea.canvas.height = imageHeight;

    contextCanvasImageFiltredArea.canvas.width = imageWidth;
    contextCanvasImageFiltredArea.canvas.height = imageHeight;

    contextCanvasImageUploadedArea.drawImage(image,0,0, imageWidth, imageHeight);
    contextCanvasImageFiltredArea.drawImage(image,0,0, imageWidth, imageHeight);

    myKernel = new Kernel(3,3,document.getElementById('filterType').value, imageWidth,imageHeight);
    updateFrames(myKernel);

    document.getElementById('kernelWidth').value = 3;
    document.getElementById('kernelHeight').value = 3;
    document.getElementById('kernelHorizontalCoordinate').value = 1;
    document.getElementById('kernelVerticalCoordinate').value = 1;
}

function storeOriginalData(){
    var index;

    var imageData = contextCanvasImageFiltredArea.getImageData(0,0,imageWidth,imageHeight);
    var data = imageData.data;

    originalImageData = data.slice();
    modifiedImageData = data.slice();


}