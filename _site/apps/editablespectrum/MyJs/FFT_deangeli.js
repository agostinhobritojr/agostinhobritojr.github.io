////////////////////////////////Image class
var MyImage = function () {
    this.matrix = [[]];
}


var MyImage = function (height,width) {
    this.matrix = [];
    for(var i=0; i<height; i++){
        this.matrix[i] = [];
        for(var j=0; j<width; j++){
            this.matrix[i][j] = 0;
        }
    }
}
//////////////////////////////////////////

/////////////////////////////////////////////complex class
var MyComplex = function () {
    this.realComponent = 0;
    this.imagineyComponent = 0;
}
//
var MyComplex = function (realComponent,imagineyComponent) {
    this.realComponent = realComponent;
    this.imagineyComponent = imagineyComponent;
}

MyComplex.prototype.multiply = function(complexNnumber)
{
    this.realComponent = (this.realComponent*complexNnumber.realComponent) - (this.imagineyComponent*complexNnumber.imagineyComponent) ;
    this.imagineyComponent = (this.realComponent*complexNnumber.imagineyComponent) - (this.imagineyComponent*complexNnumber.realComponent);
};

MyComplex.prototype.add = function(complexNnumber)
{
    this.realComponent = this.realComponent + complexNnumber.realComponent ;
    this.imagineyComponent = this.imagineyComponent + complexNnumber.imagineyComponent;
}

/////////////////////////////////////////////


var verticalShiftTerm = 0;
var horizontalShiftTerm = 0;
var imageDataSpectrum = [];


var frames =[new MyImage(), new MyImage(), new MyImage(), new MyImage()];



function splitFrames(canvasContext,width, height){

    var imageData = canvasContext.getImageData(0,0,width,height);
    var data = imageData.data;

    for(var i = 0; i < height  ; i++){
        frames[0].matrix[i] = [];
        frames[1].matrix[i] = [];
        frames[2].matrix[i] = [];
        frames[3].matrix[i] = [];
        for(var j=0; j < width ; j++){

            frames[0].matrix[i][j] =  new MyComplex(data[((i*width)+j)*4],0);//red pixel intensity
            frames[1].matrix[i][j] =  new MyComplex(data[((i*width)+j)*4 + 1],0);//green pixel intensity
            frames[2].matrix[i][j] =  new MyComplex(data[((i*width)+j)*4 + 2],0);//blue pixel intensity
            frames[3].matrix[i][j] =  new MyComplex(data[((i*width)+j)*4 + 3],0);//alpha
        }
    }
}

function mergeFrames(canvasContext, width, height){
    var imageData = canvasContext.getImageData(0,0,width,height);
    var data = imageData.data;

    for(var i = 0; i < height  ; i++){
        for(var j=0; j< width ; j++){
            data[((i*width)+j)*4] =  frames[0].matrix[i][j].realComponent;
            data[((i*width)+j)*4+1] =  frames[1].matrix[i][j].realComponent;
            data[((i*width)+j)*4+2] = frames[2].matrix[i][j].realComponent;
            data[((i*width)+j)*4+3] =  frames[3].matrix[i][j].realComponent;
        }
    }
    canvasContext.putImageData(imageData,0,0);

}


function MyFFT(width, height){

    var numberOfSamplesHorizontal =  width;
    var numberOfSamplesVertical =  height;
    var m = Math.log(numberOfSamplesHorizontal)/Math.log(2);
    var cosComponents = [];
    var sinComponents = [];
    var j,n1,n2,t1,t2, c, s,a;

    for(var i=0; i<numberOfSamplesHorizontal; i++){
        cosComponents = Math.cos(-2*Math.PI*i/numberOfSamplesHorizontal);
        sinComponents = Math.sin(-2*Math.PI*i/numberOfSamplesHorizontal);
    }

    for(var row=0; row < height; row++){
        j = 0;
        n2 = numberOfSamplesHorizontal/2;
        for (var i=1;i < numberOfSamplesHorizontal; i++){
            n1 = n2;

            while(j >= n1){
                j = j - n1;
                n1 = n1/2;
            }
            j = j + n1;
            if (i < j){
                t1 = frames[0].matrix[row][i];
                frames[0].matrix[row][i] = frames[0].matrix[row][j];
                frames[0].matrix[row][j] = t1R

                t1 = frames[1].matrix[row][i];
                frames[1].matrix[row][i] = frames[1].matrix[row][j];
                frames[1].matrix[row][j] = t1R

                t1 = frames[2].matrix[row][i];
                frames[2].matrix[row][i] = frames[2].matrix[row][j];
                frames[2].matrix[row][j] = t1;
            }
        }

        //FFT
        n1 = 0;
        n2 = 1;
        for (var i=0;i<m; i++){
            n1 = n2;
            n2 = n2 + n2;
            a = 0;

            for (j=0; j < n1; j++) {
                c = cos[a];
                s = sin[a];
                a +=  1 << (m-i-1);

                for (var k=j; k < n; k=k+n2) {
                    t1 = c*frames[0].matrix[row][k+n1].realComponent - s*frames[0].matrix[row][k+n1].imagineyComponent;
                    t2 = s*frames[0].matrix[row][k+n1].realComponent + c*frames[0].matrix[row][k+n1].imagineyComponent;
                    frames[0].matrix[row][k+n1].realComponent =  frames[0].matrix[row][k].realComponent - t1;
                    frames[0].matrix[row][k+n1].imagineyComponent = frames[0].matrix[row][k].imagineyComponent - t2;
                    frames[0].matrix[row][k].realComponent = frames[0].matrix[row][k].realComponent[k] + t1;
                    frames[0].matrix[row][k].imagineyComponent[k] = frames[0].matrix[row][k].imagineyComponent[k][k] + t2;


                    t1 = c*frames[1].matrix[row][k+n1].realComponent - s*frames[1].matrix[row][k+n1].imagineyComponent;
                    t2 = s*frames[1].matrix[row][k+n1].realComponent + c*frames[1].matrix[row][k+n1].imagineyComponent;
                    frames[1].matrix[row][k+n1].realComponent =  frames[1].matrix[row][k].realComponent - t1;
                    frames[1].matrix[row][k+n1].imagineyComponent = frames[1].matrix[row][k].imagineyComponent - t2;
                    frames[1].matrix[row][k].realComponent = frames[1].matrix[row][k].realComponent[k] + t1;
                    frames[1].matrix[row][k].imagineyComponent[k] = frames[1].matrix[row][k].imagineyComponent[k][k] + t2;

                    t1 = c*frames[2].matrix[row][k+n1].realComponent - s*frames[2].matrix[row][k+n1].imagineyComponent;
                    t2 = s*frames[2].matrix[row][k+n1].realComponent + c*frames[2].matrix[row][k+n1].imagineyComponent;
                    frames[2].matrix[row][k+n1].realComponent =  frames[2].matrix[row][k].realComponent - t1;
                    frames[2].matrix[row][k+n1].imagineyComponent = frames[2].matrix[row][k].imagineyComponent - t2;
                    frames[2].matrix[row][k].realComponent = frames[2].matrix[row][k].realComponent[k] + t1;
                    frames[2].matrix[row][k].imagineyComponent[k] = frames[2].matrix[row][k].imagineyComponent[k][k] + t2;
                }

            }
        }

    }

    /***/
    //vertical
    for(var i=0; i<numberOfSamplesHorizontal; i++){
        cosComponents = Math.cos(-2*Math.PI*i/numberOfSamplesHorizontal);
        sinComponents = Math.sin(-2*Math.PI*i/numberOfSamplesHorizontal);
    }


    for(var col=0; col < width; col++){
        j = 0;
        n2 = numberOfSamplesVertical/2;

        for (var i=1;i < numberOfSamplesVertical; i++){
            n1 = n2;

            while(j >= n1){
                j = j - n1;
                n1 = n1/2;
            }
            j = j + n1;
            if (i < j){
                t1 = frames[0].matrix[row][i];
                frames[0].matrix[row][i] = frames[0].matrix[row][j];
                frames[0].matrix[row][j] = t1R

                t1 = frames[1].matrix[row][i];
                frames[1].matrix[row][i] = frames[1].matrix[row][j];
                frames[1].matrix[row][j] = t1R

                t1 = frames[2].matrix[row][i];
                frames[2].matrix[row][i] = frames[2].matrix[row][j];
                frames[2].matrix[row][j] = t1;
            }
        }



    }




}


function perform2d_shift(){
    verticalShiftTerm = (verticalShiftTerm+(imageHeightFFT/2))%imageHeightFFT;
    horizontalShiftTerm = (horizontalShiftTerm+(imageWidthtFFT/2))%imageWidthtFFT;
}

function getElementFromFrame(frameNumber,row,col){
    return frames[frameNumber].matrix [(row+verticalShiftTerm)%imageHeightFFT] [(col+horizontalShiftTerm)%imageWidthtFFT];
}

function setElementFromFrame(frameNumber,row,col, value){
    frames[frameNumber].matrix[(row+verticalShiftTerm)%imageHeightFFT][(col+imageWidthtFFT)%imageWidthtFFT] = value;
}

function calculateSpectrumMagnitude(complexSample){
    return Math.sqrt( (complexSample.realComponent*complexSample.realComponent) + (complexSample.imagineyComponent*complexSample.imagineyComponent) );
}




