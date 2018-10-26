//reference:
//based on the code from: http://nklein.com/2009/09/fourier-transforms-in-javascript/

var fftData = function () {
    this.width = 0;
    this.height = 0;
    this.real = [];
    this.imag = [];
}

var fftSpectrumOriginal = new fftData();
var fftSpectrumModified = new fftData();
var numberOfSamples = 1;

function fftCopyData(dataSource, dataDestination){
    dataDestination.width = dataSource.width;
    dataDestination.height = dataSource.height;
    dataDestination.real = dataSource.real.slice();
    dataDestination.imag = dataSource.imag.slice();
}


function calculteMagnitude(realComponent, complexComponent){
    return Math.sqrt((realComponent*realComponent) + (complexComponent*complexComponent));
}

function getNextPowerOfTwo( numberOfSamplesHorozontalOrVetical ) {
    var power2Divisible = 1;
    while ( power2Divisible < numberOfSamplesHorozontalOrVetical ) {
        power2Divisible *= 2;
    }
    return power2Divisible;
}

function rearrangeSamples( samplesVector, offset, ww, stride ) {
    var target = 0;
    for ( var pos = 0; pos < ww; ++pos ) {
        if ( target > pos ) {
            for ( var kk = 0; kk < 4; ++kk ) {
                var tmp = samplesVector[ target*stride + kk + offset ];
                samplesVector[ target*stride + kk + offset ]
                    = samplesVector[ pos*stride + kk + offset ];
                samplesVector[ pos*stride + kk + offset ] = tmp;
            }
        }
        var mask = ww;
        while ( ( target & ( mask >>= 1 ) ) ) {
            target &= ~mask;
        }
        target |= mask;
    }
}

function shiftSamples( samples, base, ww, stride ) {
    var mid = base + ww * stride / 2;

    for ( var ii=0; ii < ww/2; ++ii ) {
        for ( var kk=0; kk < 3; ++kk ) {
            var tmp = samples[ base + ii*stride + kk ];
            samples[ base + ii*stride + kk ]
                = samples[ mid + ii*stride + kk ];
            samples[ mid + ii*stride + kk ] = tmp;
        }
    }
}

function shiftRealAndImagineryComponents(realSamples,ImaginerySamples, base, ww, stride){
    shiftSamples( realSamples, base, ww, stride );
    shiftSamples( ImaginerySamples, base, ww, stride );
}

function performFFT( realSamples, imaginerySamples, ww, hh, dx, dy, IsFourierInverse ) {
    for ( var jj = 0; jj < hh; ++jj ) {
        if ( IsFourierInverse ) {
            shiftRealAndImagineryComponents(realSamples,imaginerySamples,jj * dy, ww, dx);
        }

        rearrangeSamples( realSamples, jj * dy, ww, dx );
        rearrangeSamples( imaginerySamples, jj * dy, ww, dx );

        //var pi = 3.14159265358979323846264338327950288;
        var pi = Math.PI;
        var angularScale = ( IsFourierInverse ) ? pi : -pi;
        for ( var step = 1; step < ww; step += step ) {
            var delta = angularScale / step;
            var sine = Math.sin( delta / 2.0 );
            var fac_r = 1.0;
            var fac_i = 0.0;
            var mul_r = -2.0 * sine * sine;
            var mul_i = Math.sin( delta );
            for ( var group = 0; group < step; ++group ) {
                for ( var pair = group; pair < ww; pair += step * 2 ) {
                    var match = pair + step;
                    for ( var kk = 0; kk < 3; ++kk ) {
                        var p_index = jj * dy + pair * dx + kk;
                        var m_index = jj * dy + match * dx + kk;
                        var rr = realSamples[ m_index ];
                        var ii = imaginerySamples[ m_index ];

                        var prod_r = rr * fac_r - ii * fac_i;
                        var prod_i = rr * fac_i + ii * fac_r;

                        realSamples[ m_index ] = realSamples[ p_index ] - prod_r;
                        imaginerySamples[ m_index ] = imaginerySamples[ p_index ] - prod_i;
                        realSamples[ p_index ] += prod_r;
                        imaginerySamples[ p_index ] += prod_i;
                    }
                }

                var inc_r = mul_r * fac_r - mul_i * fac_i;
                var inc_i = mul_r * fac_i + mul_i * fac_r;
                fac_r += inc_r;
                fac_i += inc_i;
            }
        }

        if ( !IsFourierInverse ) {
            shiftRealAndImagineryComponents(realSamples,imaginerySamples,jj * dy, ww, dx);
        }
    }


    return {
        width: ww,
        height: hh,
        real: realSamples,
        imag: imaginerySamples,
    };
}


function FFT( canvasId, compressionType ) {
    var canvas = document.getElementById( canvasId );
    if ( !canvas ) {
        return false;
    }

    var ww = canvas.width;
    var hh = canvas.height;
    numberOfSamples = ww*hh;

    var context = canvas.getContext( '2d' );
    if ( !context ) {
        return false;
    }

    var rawResult = context.getImageData( 0, 0, ww, hh );
    var result = rawResult.data;

    var realSamples = new Array();
    var imaginerySamples = new Array();

    realSamples.length = ww * hh * 4;
    imaginerySamples.length = ww * hh * 4;

    for ( var pp=0; pp < result.length; ++pp ) {
        realSamples[ pp ] = result[ pp ] ;
        imaginerySamples[ pp ] = 0.0;
    }

    var fftData = performFFT( realSamples, imaginerySamples, ww, hh, 4, ww*4, false );
    performFFT( realSamples, imaginerySamples, hh, ww, ww*4, 4, false );

    fftSpectrumOriginal.width = fftData.width;
    fftSpectrumOriginal.height = fftData.height;
    fftSpectrumOriginal.real = fftData.real.slice();
    fftSpectrumOriginal.imag = fftData.imag.slice();

    var index,realComponent,imagineryComponent,newIndex;

    if(compressionType == 1) {
        var maximumValue = 1;
        /*for (var pp = 0; pp < result.length; pp += 4) {
            for (var kk = 0; kk < 3; ++kk) {
                index = pp + kk;
                realComponent = realSamples[index];
                imagineryComponent = imaginerySamples[index];
                result[index] = Math.log(calculteMagnitude(realComponent, imagineryComponent) + 1);
                if(result[index] > maximumValue){
                    maximumValue =  result[index];
                }
            }
            result[pp + 3] = 255;
        }

        for (var pp = 0; pp < result.length; pp += 4) {
            for (var kk = 0; kk < 3; ++kk) {
                index = pp + kk;
                result[index] = (result[index]/maximumValue)*255;
            }
            result[pp + 3] = 255;
        }*/


        for(var row=0; row < imageHeightZeroPadding; row++){
            for(var col=0; col < imageWidthZeroPadding; col++){
                index = ((row*imageWidthZeroPadding)+col);
                //newIndex = index;
                //newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
                //newIndex = newIndex + (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);

                realComponent  = realSamples[(index)*4];
                imagineryComponent = imaginerySamples[(index)*4];
                result[(index)*4] = Math.log(calculteMagnitude(realComponent, imagineryComponent) + 1);
                if(result[(index)*4] > maximumValue){
                    maximumValue =  result[(index)*4];
                }

                realComponent  = realSamples[(index)*4+ 1];
                imagineryComponent = imaginerySamples[(index)*4+ 1];
                result[(index)*4+ 1] = Math.log(calculteMagnitude(realComponent, imagineryComponent) + 1);
                if(result[(index)*4+ 1] > maximumValue){
                    maximumValue =  result[(index)*4+ 1];
                }

                realComponent  = realSamples[(index)*4+ 2];
                imagineryComponent = imaginerySamples[(index)*4+ 2];
                result[(index)*4+ 2] = Math.log(calculteMagnitude(realComponent, imagineryComponent) + 1);
                if(result[(index)*4+ 2] > maximumValue){
                    maximumValue =  result[(index)*4+ 2];
                }

                result[(index)*4+ 3] = 255 ;
            }
        }

        for(var row=0; row < imageHeightZeroPadding; row++){
            for(var col=0; col < imageWidthZeroPadding; col++){
                index = ((row*imageWidthZeroPadding)+col);
                result[(index)*4] = (result[(index)*4]/maximumValue)*255;
                result[(index)*4+1] = (result[(index)*4+1]/maximumValue)*255;
                result[(index)*4+2] = (result[(index)*4+2]/maximumValue)*255;
            }
        }


    }

    if(compressionType == 2) {//divided by number of samples
        /*for (var pp = 0; pp < result.length; pp += 4) {
            for (var kk = 0; kk < 3; ++kk) {
                index = pp + kk;
                realComponent = realSamples[index];
                imagineryComponent = imaginerySamples[index];
                result[index] = calculteMagnitude(realComponent, imagineryComponent) * 255/numberOfSamples ;
            }
            result[pp + 3] = 255;
        }*/
        for(var row=0; row < imageHeightZeroPadding; row++){
            for(var col=0; col < imageWidthZeroPadding; col++){
                index = ((row*imageWidthZeroPadding)+col);
                //newIndex = ((index+(fftSpectrumOriginal.width/2))%fftSpectrumOriginal.width);
                //newIndex = newIndex + (((fftSpectrumOriginal.width*fftSpectrumOriginal.height/2) + fftSpectrumOriginal.width*Math.floor(index/fftSpectrumOriginal.height))%numberOfSamples);

                realComponent  = realSamples[(index)*4];
                imagineryComponent = imaginerySamples[(index)*4];
                result[(index)*4] = calculteMagnitude(realComponent, imagineryComponent) * 255/numberOfSamples ;

                realComponent  = realSamples[(index)*4+ 1];
                imagineryComponent = imaginerySamples[(index)*4+ 1];
                result[(index)*4+ 1] = calculteMagnitude(realComponent, imagineryComponent) * 255/numberOfSamples ;

                realComponent  = realSamples[(index)*4+ 2];
                imagineryComponent = imaginerySamples[(index)*4+ 2];
                result[(index)*4+ 2] = calculteMagnitude(realComponent, imagineryComponent) * 255/numberOfSamples ;

                result[(index)*4+ 3] = 255 ;
            }
        }

    }

    context.putImageData( rawResult, 0, 0 );

    return fftData;
}

function IFFT( fftData, canvasId, compressionType ) {
    var canvas = document.getElementById(canvasId );
    if ( !canvas ) {
        return false;
    }


    var ww = fftData.width;
    var hh = fftData.height;

    canvas.width = ww;
    canvas.height = hh;

    var context = canvas.getContext( '2d' );
    if ( !context ) {
        return false;
    }

    var real = fftData.real.slice();
    var imag = fftData.imag.slice();

    performFFT( real, imag, hh, ww, ww*4, 4, true );
    performFFT( real, imag, ww, hh, 4, ww*4, true );

    var rawResult = context.getImageData( 0, 0, ww, hh );
    var result = rawResult.data;

    if(compressionType == 1){
        /*for ( var pp=0; pp < result.length; pp += 4 ) {
            for ( var kk=0; kk < 3; ++kk ) {
                var index = pp + kk;
                var vv = real[ index ]/numberOfSamples ;
                if ( vv < 0 ) {
                    vv = 0;
                }
                else if ( 255 < vv ) {
                    vv = 255;
                }
                result[ index ] = vv;
            }
            result[ pp + 3 ] = 255;
        }*/

        var realComponent;
        for(var row=0; row < imageHeightZeroPadding; row++){
            for(var col=0; col < imageWidthZeroPadding; col++){
                index = ((row*imageWidthZeroPadding)+col);

                realComponent = real[ (index)*4 ]/numberOfSamples;;
                if(realComponent > 255){
                    realComponent = 255;
                }
                if(realComponent < 0){
                    realComponent = 0;
                }
                result[(index)*4] = realComponent;

                realComponent = real[ (index)*4 + 1]/numberOfSamples;;
                if(realComponent > 255){
                    realComponent = 255;
                }
                if(realComponent < 0){
                    realComponent = 0;
                }
                result[(index)*4 + 1] = realComponent;

                realComponent = real[ (index)*4 + 2]/numberOfSamples;;
                if(realComponent > 255){
                    realComponent = 255;
                }
                if(realComponent < 0){
                    realComponent = 0;
                }
                result[(index)*4 + 2] = realComponent;
                result[(index)*4 + 3] = 255;
            }
        }


    }

    if(compressionType == 2){
        for ( var pp=0; pp < result.length; pp += 4 ) {
            for ( var kk=0; kk < 3; ++kk ) {
                var index = pp + kk;
                //var vv = 255 * real[ index ] / scale;
                var vv = real[ index ] /numberOfSamples;
                if ( vv < 0 ) {
                    vv = 0;
                }
                else if ( 255 < vv ) {
                    vv = 255;
                }
                result[ index ] = vv;
            }
            result[ pp + 3 ] = 255;
            //result[ pp + 3 ] =
        }
    }


    context.putImageData( rawResult, 0, 0 );

}




